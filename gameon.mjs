import { State } from './state.mjs'

export class GameOn extends State {
  execute () {
    this.game.renderer(this.game.map, this.game.printLine, this.game.symboliser)
  }
}
