import { BotCommandName, MessageChain } from './types'
import { createRegExp, exactly } from 'magic-regexp'

export class Command {
  name: BotCommandName

  constructor(contentMessageChain: MessageChain) {
    validateCommand('abcd_1234_basdf')
  }
}

export const COMMAND_PATTERN = createRegExp(exactly('a'))

export function validateCommand(name: BotCommandName) {
  if (!name) return false

  return true
}
