import config from '../config'
import { Bot } from '../dist'

console.log('Hello World')
const bot = new Bot(config)

bot.start()
