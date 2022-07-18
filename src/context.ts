import { Api } from './api'
import { Message, MessageChain, MessageType, SourceMessage } from './types'

export class Context {
  api: Api

  messageSource: SourceMessage | undefined
  messageType: MessageType
  messageChain: MessageChain
  isCommand: boolean = false

  from: number
  group: number = 0
  target: number = 0

  constructor(api: Api, message: Message) {
    this.api = api

    this.messageType = message.type
  }
}

export function createContext(api: Api, message: Message) {
  return new Context(api, message)
}
