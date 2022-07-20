import { BotCommandName, MessageChain, PlainMessage } from './types'

export class Command {
  name: BotCommandName

  isValid: boolean

  constructor(commandMessageChain: MessageChain) {
    const commandMessage = commandMessageChain[0] as PlainMessage
    this.name = getCommandName(commandMessage.text)

    if (this.name) {
      this.isValid = false
    } else {
      this.isValid = validateCommandName(this.name)
    }
  }
}

export function getCommandName(rawCommand: string) {
  const COMMAND_PATTERN = /^\s*\/(?<name>(.+))/

  return COMMAND_PATTERN.exec(rawCommand)?.groups?.name
}

export function validateCommandName(name: BotCommandName) {
  if (!name) return false

  const COMMAND_NAME_PATTERN = /\b[a-zA-Z]+(\d+)?(_[0-9a-zA-Z]+)*\b/

  return COMMAND_NAME_PATTERN.test(name)
}
