import { BotCommandName, MessageChain, PlainMessage } from './types'

export class Command {
  name: BotCommandName
  attrs: string[]

  isValid: boolean

  constructor(commandMessageChain: MessageChain) {
    const commandMessage = commandMessageChain[0] as PlainMessage

    const [name, attrs] = parseCommand(commandMessage.text)

    this.name = name
    this.attrs = attrs || []

    if (!this.name) {
      this.isValid = false
    } else {
      this.isValid = validateCommandName(this.name)
    }
  }
}

export function parseCommand(rawCommand: string): [string, string[]] {
  const COMMAND_PATTERN = /^\s*\/(?<name>(\S+))\b(?<attrs>(.*))/

  return [
    COMMAND_PATTERN.exec(rawCommand)?.groups?.name,
    COMMAND_PATTERN.exec(rawCommand)?.groups?.attrs?.trim().split(' ')
  ]
}

export function validateCommandName(name: BotCommandName) {
  if (!name) return false

  const COMMAND_NAME_PATTERN = /\b[a-zA-Z]+(\d+)?(_[0-9a-zA-Z]+)*\b/

  return COMMAND_NAME_PATTERN.test(name)
}
