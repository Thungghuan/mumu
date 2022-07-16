import fs from 'fs'
import { BotSetting } from './types'
import { parse } from 'yaml'

export function loadSeting(filePath: string) {
  const file = fs.readFileSync(filePath, 'utf8')

  return parse(file) as BotSetting
}
