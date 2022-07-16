export type BotEventCache = Map<BotEventKey<BotEventType>, BotEventHandler[]>

type BotEventType = 'message' | 'command'

type BotMessageType = 'message' | 'friendMessage' | 'groupMessage'
type BotSingleMessageType =
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

type BotCommandName = string

type BotEventKey<T extends BotEventType> = T extends 'message'
  ? `message:${BotMessageType | BotSingleMessageType}`
  : `command:${BotCommandName}`

type BotEventHandler = Function
