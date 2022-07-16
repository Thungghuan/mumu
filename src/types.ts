export type BotEventCache = Map<BotEventKey, BotEventHandler>

type BotEventType = 'message' | 'command'
type BotEventName = string

type BotEventKey = `${BotEventType}:${BotEventName}`
type BotEventHandler = Function
