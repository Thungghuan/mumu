import { createApi, Api } from './api'
import { createContext } from './context'
import { BotEvent } from './event'
import { createPlainMessage } from './message'
import {
  BotCommandName,
  BotConfig,
  BotEventHandler,
  BotEventKey,
  BotEventName,
  BotEventType,
  Message
} from './types'
import { loadSeting } from './utils'

export class Bot {
  qq: number
  masterQQ: number

  private api: Api
  private event: BotEvent

  private invalidCommandEventKey: BotEventKey<'command'> = 'command:%%invalid%%'
  private invalidCommandHandler: BotEventHandler = (ctx) => {
    const command = ctx.command.name
    ctx.reply(createPlainMessage(`Invalid command: '${command}'`))
  }

  private undefinedCommandEventKey: BotEventKey<'command'> =
    'command:%%undefined%%'
  private undefinedCommandHandler: BotEventHandler = (ctx) => {
    const command = ctx.command.name
    ctx.reply(createPlainMessage(`Undefined command: '${command}'`))
  }

  constructor(config: BotConfig) {
    console.log('Resolving bot configure file...')
    const { qq, masterQQ, settingFile } = config

    console.log('Loading bot setting file...')
    const setting = loadSeting(settingFile)

    const { verifyKey } = setting

    const { host, port } = setting.adapterSettings.http
    const baseURL = `http://${host}:${port || 80}`

    console.log('Creating a new bot...')
    this.qq = qq
    this.masterQQ = masterQQ

    this.api = createApi(qq, baseURL, verifyKey)
    this.event = new BotEvent()

    this.event.on(this.invalidCommandEventKey, this.invalidCommandHandler)

    this.event.on(this.undefinedCommandEventKey, this.undefinedCommandHandler)
  }

  on(eventType: BotEventName, handler: BotEventHandler) {
    const key: BotEventKey<'message'> = `message:${eventType}`
    this.event.on(key, handler)
  }

  off(eventType: BotEventName) {
    const key: BotEventKey<'message'> = `message:${eventType}`
    this.event.off(key)
  }

  command(commandName: BotCommandName, handler: BotEventHandler) {
    if (!commandName) return

    const key: BotEventKey<'command'> = `command:${commandName}`
    this.event.on(key, handler)
  }

  offCommand(commandName: BotCommandName) {
    if (!commandName) return

    const key: BotEventKey<'command'> = `command:${commandName}`
    this.event.off(key)
  }

  setInvalidCommandHandler(handler: BotEventHandler) {
    this.invalidCommandHandler = handler
  }

  setUndefinedCommandHandler(handler: BotEventHandler) {
    this.undefinedCommandHandler = handler
  }

  use() {}

  async start() {
    console.log(await this.api.verify())
    console.log(await this.api.bind())

    this.fetch()

    process.on('exit', () => {
      console.log(this.api.release())
      console.log('exit')
    })
  }

  private fetch(interval = 1000) {
    const fetchFn = async () => {
      const { data: messages, code, msg } = await this.api.fetchMessage()

      if (!messages) {
        console.log(`Error with code ${code}: ${msg}`)
      } else if (messages.length > 0) {
        for await (const message of messages) {
          this.resolve(message)
        }
      }

      setTimeout(async () => {
        await fetchFn()
      }, interval)
    }

    fetchFn()
  }

  private resolve(message: Message) {
    const ctx = createContext(this.api, this.qq, message)

    const eventKeys = new Set<BotEventKey<BotEventType>>()
    if (!ctx.isCommand) {
      eventKeys.add('message:*')
      eventKeys.add(`message:${ctx.messageType}`)

      ctx.contentMessageChain.forEach((msg) => {
        eventKeys.add(`message:${msg.type}`)
      })
    } else {
      eventKeys.add(`command:*`)

      if (!ctx.command.isValid) {
        eventKeys.add(this.invalidCommandEventKey)
      } else if (!this.event.has(`command:${ctx.command.name}`)) {
        eventKeys.add(this.undefinedCommandEventKey)
      } else {
        eventKeys.add(`command:${ctx.command.name}`)
      }
    }

    eventKeys.forEach((key) => this.event.emit(key, ctx))
  }
}
