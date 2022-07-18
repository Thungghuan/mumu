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
  private messageSource: SourceMessage | undefined
  private contentMessageChain: MessageChain

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
    this.messageSource = sourceMessage
    this.contentMessageChain = contentMessageChain

    if (this.isCommand) {
      console.log((this.contentMessageChain[0] as PlainMessage).text)
      this.commandResolver(contentMessageChain)
    }
  }

  get isCommand() {
    return (
      this.contentMessageChain[0] &&
      this.contentMessageChain[0].type === 'Plain' &&
      /^\s*\/(.+)/.test(this.contentMessageChain[0].text)
    )
  }

  private commandResolver(contentMessageChain: MessageChain) {}
}

export function createContext(api: Api, message: Message) {
  return new Context(api, message)
}
