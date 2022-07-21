import { Bot } from '../bot'

export interface PluginOptions {
  name: string
  load: (bot: Bot, ...args: any) => void
}

export type LoadPluginFunc = (bot: Bot, ...args: any) => string
