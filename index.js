import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { consolerenderer } from './consolerenderer.mjs'
import { Game } from './game.mjs'
import { symboliser } from './symboliser.mjs'

const rl = readline.createInterface({ input, output })

const game = new Game({ width: 5, height: 5 }, rl, consolerenderer, symboliser, console.log)
game.start()
