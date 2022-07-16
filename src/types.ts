export interface BotConfig {
  qq: number
  masterQQ: number
  settingFile: string
}

export interface BotSetting {
  verifyKey: string
  adapterSettings: {
    http: {
      host: string
      port?: number
    }
  }
}

export type BotEventCache = Map<BotEventKey<BotEventType>, BotEventHandler[]>

export type BotEventType = 'message' | 'command'

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

type BotMessageType =
  | 'message'
  | 'friendMessage'
  | 'groupMessage'
  | BotSingleMessageType

export type BotCommandName = string

export type BotEventKey<T extends BotEventType> = T extends 'message'
  ? `message:${BotMessageType | '*'}`
  : `command:${BotCommandName}`

export type BotEventName = BotMessageType

export type BotEventHandler = Function
