import { Friend, GroupMember } from './user'

export type BotSingleMessageType =
  | 'Source'
  | 'Quote'
  | 'At'
  | 'AtAll'
  | 'Face'
  | 'Plain'
  | 'Image'
  | 'FlashImage'
  | 'Voice'
  | 'Xml'
  | 'Json'
  | 'App'
  | 'Poke'
  | 'Dice'
  | 'MusicShare'
  | 'ForwardMessage'
  | 'File'
  | 'MiraiCode'

export interface BasicSingleMessage {
  type: BotSingleMessageType
}

export interface SourceMessage extends BasicSingleMessage {
  type: 'Source'
  id: number
  time: number
}

export interface QuoteMessage extends BasicSingleMessage {
  type: 'Quote'
  id: number
  groupId: number
  senderId: number
  targetId: number
  origin: MessageChain
}

export interface AtMessage extends BasicSingleMessage {
  type: 'At'
  target: number
  display: string
}

export interface AtAllMessage extends BasicSingleMessage {
  type: 'AtAll'
}

export interface FaceMessage extends BasicSingleMessage {
  type: 'Face'
  faceId: number
  name: string
}

export interface PlainMessage extends BasicSingleMessage {
  type: 'Plain'
  text: string
}

interface SingleMessageMap {
  Source: SourceMessage
  Quote: QuoteMessage
  At: AtMessage
  AtAll: AtAllMessage
  Face: FaceMessage
  Plain: PlainMessage
}

export type SingleMessage = SingleMessageMap[keyof SingleMessageMap]

export type MessageChain = SingleMessage[]
export type ReceiveMessageChain = [SourceMessage, ...SingleMessage[]]

export type MessageType = 'FriendMessage' | 'GroupMessage'

export interface BasicMessage {
  type: MessageType
  messageChain: ReceiveMessageChain
  sender: Friend | GroupMember
}

export interface FriendMessage extends BasicMessage {
  type: 'FriendMessage'
  sender: Friend
}

export interface GroupMessage extends BasicMessage {
  type: 'GroupMessage'
  sender: GroupMember
}

export type Message = FriendMessage | GroupMessage
