export class State {
  constructor (theGame, aReadline) {
    if (!theGame) {
      throw Error('State created with out game instance.')
    }
    this.game = theGame
    this.readline = aReadline
  }

  execute () { }
}
