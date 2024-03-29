import { Context } from '../context'
import { BotSingleMessageType } from './message'

export type BotEventCache = Map<BotEventKey<BotEventType>, Set<BotEventHandler>>

export type BotEventType = 'message' | 'command'

type BotMessageType =
  | '*'
  | 'FriendMessage'
  | 'GroupMessage'
  | BotSingleMessageType

export type BotCommandName = string

export type BotEventKey<T extends BotEventType> = T extends 'message'
  ? `message:${BotMessageType}`
  : `command:${BotCommandName}`

export type BotEventName = BotMessageType

export interface BotEventHandler {
  (ctx: Context): any
}
