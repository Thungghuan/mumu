import { Api } from './api'
import { Message, MessageChain, MessageType, SourceMessage } from './types'

export class Context {
  api: Api

  messageId: number
  messageType: MessageType
  private sourceMessage: SourceMessage | undefined
  private contentMessageChain: MessageChain = []

  sender: number
  senderName: string

  chatroom: number = 0
  chatroomName: string

  constructor(api: Api, message: Message) {
    this.api = api

    console.log(message)

    if (message.type === 'FriendMessage' || message.type === 'GroupMessage') {
      this.messageType = message.type
      this.sender = message.sender.id

      if (message.type === 'FriendMessage') {
        this.senderName = message.sender.nickname
        this.chatroom = this.sender
        this.chatroomName = message.sender.nickname
      } else if (message.type === 'GroupMessage') {
        this.senderName = message.sender.memberName
        this.chatroom = message.sender.group.id
        this.chatroomName = message.sender.group.name
      }

      const [sourceMessage, ...contentMessageChain] = message.messageChain
      this.sourceMessage = sourceMessage
      this.contentMessageChain = contentMessageChain

      if (this.isCommand) {
        this.commandResolver(contentMessageChain)
      }
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
