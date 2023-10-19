import { Setup } from './setup.mjs'

export class Game {
  constructor (dim, readline, renderer, symboliser, logger, prng = Math.random) {
    this.state = new Setup(this, readline)
    this.printLine = console.log
    this.renderer = renderer
    this.symboliser = symboliser
    this.logger = logger
    this.prng = prng
  }

  start () {
    this.logCurrentState()
    this.state.execute()
  }

  setState (newState) {
    this.state = newState
    this.logCurrentState()
    this.state.execute()
  }

  logCurrentState () {
    if (this.logger) {
      this.logger(`State is: ${this.state.constructor.name}`)
      // console.log(`Game data is: ${this.map}`)
    }
  }
}
