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

export type SingleMessage =
  | SourceMessage
  | QuoteMessage
  | AtMessage
  | AtAllMessage
  | FaceMessage
  | PlainMessage

export type MessageChain = SingleMessage[]
export type ReceivedMessageChain = [SourceMessage, ...SingleMessage[]]

export type ChatroomType = 'Friend' | 'Group'

export type MessageType = 'FriendMessage' | 'GroupMessage'

export interface BasicReceivedMessage {
  type: MessageType
  messageChain: ReceivedMessageChain
  sender: Friend | GroupMember
}

export interface ReceivedFriendMessage extends BasicReceivedMessage {
  type: 'FriendMessage'
  sender: Friend
}

export interface ReceivedGroupMessage extends BasicReceivedMessage {
  type: 'GroupMessage'
  sender: GroupMember
}

export type Message = ReceivedFriendMessage | ReceivedGroupMessage
