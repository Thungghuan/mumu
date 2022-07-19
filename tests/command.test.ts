import { validateCommand } from '../src/command'
import { describe, expect, it } from 'vitest'

describe('test command name without number', () => {
  it('test one word command', () => {
    expect(validateCommand('command')).toBe(true)
  })

  it('test multi words command', () => {
    expect(validateCommand('command_a')).toBe(true)
    expect(validateCommand('command_with_multi_words')).toBe(true)
  })
})

describe('test command name with number', () => {
  it('test one word with number', () => {
    expect(validateCommand('command1')).toBe(true)
  })

  it('test multi word with number', () => {
    expect(validateCommand('command1_234_ab567_cde')).toBe(true)
  })

  it('test invalid command start with number', () => {
    expect(validateCommand('1234Command')).toBe(false)
    expect(validateCommand('1234Another_Command')).toBe(false)
  })
})
