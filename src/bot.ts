import { createApi, Api } from './api'
import { Context, createContext } from './context'
import { loadSeting } from './utils'
import {
  BotCommandName,
  BotConfig,
  BotEventCache,
  BotEventHandler,
  BotEventKey,
  BotEventName,
  BotEventType,
  Message
} from './types'

export class Bot {
  qq: number
  masterQQ: number

  private eventCache: BotEventCache = new Map()
  private api: Api

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
  }

  on(eventType: BotEventName, handler: BotEventHandler) {
    const key: BotEventKey<'message'> = `message:${eventType}`

    if (this.eventCache.has(key)) {
      this.eventCache.get(key).push(handler)
    } else {
      this.eventCache.set(key, [handler])
    }
  }

  off(eventType: BotEventName) {
    const key: BotEventKey<'message'> = `message:${eventType}`

    if (this.eventCache.has(key)) {
      this.eventCache.delete(key)
    }
  }

  command(commandName: BotCommandName, handler: BotEventHandler) {
    if (!commandName) return

    const key: BotEventKey<'command'> = `command:${commandName}`

    if (this.eventCache.has(key)) {
      this.eventCache.get(key).push(handler)
    } else {
      this.eventCache.set(key, [handler])
    }
  }

  offCommand(commandName: BotCommandName) {
    if (!commandName) return

    const key: BotEventKey<'command'> = `command:${commandName}`

    if (this.eventCache.has(key)) {
      this.eventCache.delete(key)
    }
  }

  private emit<K extends BotEventType>(key: BotEventKey<K>, ctx: Context) {
    if (this.eventCache.has(key)) {
      this.eventCache
        .get(key)
        .slice()
        .map((fn) => fn(ctx))
    }
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
      const { data: messages } = await this.api.fetchMessage()

      if (messages.length > 0) {
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
    const ctx = createContext(this.api, message)
    console.log(ctx.isCommand)
  }
}
