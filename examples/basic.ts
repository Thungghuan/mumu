import config from '../config'
import { Bot } from '../src'

console.log('Hello World')
const bot = new Bot(config)

bot.start()