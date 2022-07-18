import { Api } from './api'
import {
  Message,
  MessageChain,
  MessageType,
  PlainMessage,
  SourceMessage
} from './types'

export class Context {
  api: Api

  messageType: MessageType
  private sourceMessage: SourceMessage | undefined
  private contentMessageChain: MessageChain = []

  from: number
  group: number = 0
  chatroom: number = 0

  constructor(api: Api, message: Message) {
    this.api = api

    this.messageType = message.type
    this.from = message.sender.id
    if (message.type === 'FriendMessage') {
      this.chatroom = this.from
    } else if (message.type === 'GroupMessage') {
      this.group = message.sender.group.id
      this.chatroom = this.group
    }

    const [sourceMessage, ...contentMessageChain] = message.messageChain
    this.sourceMessage = sourceMessage
    this.contentMessageChain = contentMessageChain

    if (this.isCommand) {
      this.commandResolver(contentMessageChain)
    }
  }

  get isCommand() {
    const testCommandText = RegExp.prototype.test.bind(/^\s*\/(.+)/)

    if (
      this.contentMessageChain[0].type === 'Plain' &&
      testCommandText(this.contentMessageChain[0].text)
    ) {
      return true
    } else if (
      this.contentMessageChain[0].type === 'Quote' &&
      this.contentMessageChain[1].type === 'Plain' &&
      testCommandText(this.contentMessageChain[1].text)
    ) {
      return true
    }

    return false
  }

  private commandResolver(contentMessageChain: MessageChain) {}
}

export function createContext(api: Api, message: Message) {
  return new Context(api, message)
}
