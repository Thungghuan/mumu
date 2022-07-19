import { COMMAND_PATTERN, validateCommand } from '../src/command'
import { describe, expect, it } from 'vitest'

describe('command name pattern test', () => {
  it('command name pattern', () => {
    expect(COMMAND_PATTERN).toMatchInlineSnapshot('/a/')
  })

  it('match command 1', () => {
    expect(validateCommand('abc')).toBe(true)
  })
})
