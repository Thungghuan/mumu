import { Bot } from '../bot'
import { LoadPluginFunc, PluginOptions } from '../types/plugin'

export function definePlugin(options: PluginOptions): LoadPluginFunc {
  return function (bot: Bot) {
    options.load(bot)
    return options.name
  }
}
