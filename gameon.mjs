import { State } from './state.mjs'
import { GameWon } from './gamewon'

function isSamePosition (a, b) {
  return a.x === b.x && a.y === b.y
}

export class GameOn extends State {
  execute () {
    this.game.renderer(this.game.map, this.game.printLine, this.game.symboliser)
    if (isSamePosition(this.game.map.playerPosition, this.game.gemPosition)) {
      this.game.setState(new GameWon(this.game, this.readline))
    }
  }
}
