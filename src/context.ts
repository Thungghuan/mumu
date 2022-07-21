import { Api } from './api'
import { Command } from './command'
import { createPlainMessage } from './message'
import {
  ChatroomType,
  Message,
  MessageChain,
  MessageType,
  QuoteMessage,
  SourceMessage
} from './types'

export class Context {
  api: Api
  qq: number

  messageId: number
  messageType: MessageType
  sourceMessage: SourceMessage | undefined
  contentMessageChain: MessageChain = []

  sender: number
  senderName: string

  chatroom: number = 0
  chatroomType: ChatroomType
  chatroomName: string

  isQuote: boolean
  quoteMessage: QuoteMessage

  isAt: boolean
  isAtMe: boolean

  isCommand: boolean
  command: Command | null = null

  constructor(api: Api, qq: number, message: Message) {
    this.api = api
    this.qq = qq

    if (message.type === 'FriendMessage' || message.type === 'GroupMessage') {
      this.messageType = message.type
      this.sender = message.sender.id

      if (message.type === 'FriendMessage') {
        this.senderName = message.sender.nickname
        this.chatroom = this.sender
        this.chatroomType = 'Friend'
        this.chatroomName = message.sender.nickname
      } else if (message.type === 'GroupMessage') {
        this.senderName = message.sender.memberName
        this.chatroom = message.sender.group.id
        this.chatroomType = 'Group'
        this.chatroomName = message.sender.group.name
      }

      const [sourceMessage, ...contentMessageChain] = message.messageChain
      this.sourceMessage = sourceMessage
      this.contentMessageChain = contentMessageChain

      if (this.contentMessageChain[0].type === 'Quote') {
        this.isQuote = true
        const [quoteMessage, ...contentMessageChain] = this.contentMessageChain

        this.quoteMessage = quoteMessage
        this.contentMessageChain = contentMessageChain
      }

      if (
        this.contentMessageChain[0].type === 'At' &&
        this.contentMessageChain[0].target === this.qq
      ) {
        this.isAtMe = true
      }

      if (
        this.contentMessageChain[0].type === 'At' ||
        this.contentMessageChain[0].type === 'AtAll'
      ) {
        this.isAt = true
        this.contentMessageChain.shift()
      }

      if (
        this.contentMessageChain[0].type === 'Plain' &&
        /^\s*\/(.+)/.test(this.contentMessageChain[0].text)
      ) {
        this.isCommand = true
        this.command = new Command(this.contentMessageChain)
      }
    }
  }

  async reply(message: string | MessageChain) {
    if (typeof message === 'string') {
      message = createPlainMessage(message)
    }

    await this.api.sendMessage(this.chatroom, this.chatroomType, message)
  }

  async quoteReply(message: string | MessageChain) {
    if (typeof message === 'string') {
      message = createPlainMessage(message)
    }

    await this.api.sendMessage(
      this.chatroom,
      this.chatroomType,
      message,
      this.sourceMessage.id
    )
  }
}

export function createContext(api: Api, qq: number, message: Message) {
  return new Context(api, qq, message)
}
