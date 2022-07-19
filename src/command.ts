import { BotCommandName, MessageChain } from './types'

export class Command {
  name: BotCommandName

  constructor(contentMessageChain: MessageChain) {
    validateCommand('abcd_1234_basdf')
  }
}

export function validateCommand(name: BotCommandName) {
  if (!name) return false

  const COMMAND_PATTERN = /\b[a-zA-Z]+(\d+)?(_[0-9a-zA-Z]+)*\b/

  return COMMAND_PATTERN.test(name)
}
