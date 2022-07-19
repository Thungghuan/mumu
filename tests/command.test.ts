import { getCommandName, validateCommandName } from '../src/command'
import { describe, expect, it } from 'vitest'

describe('validate command name', () => {
  it('test one word command', () => {
    expect(validateCommandName('command')).toBe(true)
  })

  it('test multi words command', () => {
    expect(validateCommandName('command_a')).toBe(true)
    expect(validateCommandName('command_with_multi_words')).toBe(true)
  })

  it('test one word with number', () => {
    expect(validateCommandName('command1')).toBe(true)
  })

  it('test multi word with number', () => {
    expect(validateCommandName('command1_234_ab567_cde')).toBe(true)
  })

  it('test invalid command start with number', () => {
    expect(validateCommandName('1234Command')).toBe(false)
    expect(validateCommandName('1234Another_Command')).toBe(false)
  })
})

describe('get command name', () => {
  it('get one word command', () => {
    expect(getCommandName('/abc')).toEqual('abc')
  })

  it('get multi words command', () => {
    expect(getCommandName('/multi_words_command')).toEqual(
      'multi_words_command'
    )
  })

  it('get command name with number', () => {
    expect(getCommandName('/command2_123abc')).toEqual('command2_123abc')
  })
})
