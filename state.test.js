import { State } from './state.mjs'

describe('state', () => {
  describe('when created with game and readling interface', () => {
    let expectedGame
    let expectedReadline
    let actual
    beforeEach(() => {
      expectedGame = {}
      expectedReadline = () => {}
      actual = new State(expectedGame, expectedReadline)
    })
    it('has given game', () => {
      expect(actual.game).toBe(expectedGame)
    })
    it('has the provided readline if', () => {
      expect(actual.readline).toBe(expectedReadline)
    })
  })
})
