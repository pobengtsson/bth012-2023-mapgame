import { jest } from '@jest/globals'
import { GameOn } from './gameon'
// import { GameWon } from './gamewon'
import { Player } from './player.mjs'

describe('GameOn', () => {
  describe('when created', () => {
    let gameon
    let mockGame
    let mockRenderer
    let mockQuestion
    let mockReadline
    beforeEach(() => {
      mockRenderer = jest.fn()
      mockQuestion = jest.fn()
      mockReadline = { question: mockQuestion }
      mockGame = {
        player: new Player('ignored'),
        map: {
          dimensions: { width: 100, height: 100 },
          playerPos: { x: 0, y: 0 }
        },
        gemPos: { x: 1, y: 1 },
        setState: jest.fn(),
        printLine: () => {},
        symboliser: () => {},
        renderer: mockRenderer
      }
      gameon = new GameOn(mockGame, mockReadline)
    })
    it('has the provided game', () => {
      expect(gameon.game).toBe(mockGame)
    })
    describe('when executing', () => {
      beforeEach(() => {
        gameon.gemFound = () => true
        gameon.execute()
      })
      it('prints the map', () => {
        expect(mockRenderer).toHaveBeenCalled()
      })
      describe('when player is on position  with gem', () => {
        beforeEach(() => {
          mockGame.map.playerPos = { x: 2, y: 2 }
          mockGame.gemPos = { x: 2, y: 2 }
          gameon.execute()
        })
        it('change state to GameWon', () => {
          expect(mockGame.setState).toHaveBeenCalled()
        })
      })
      describe('when player is not on gem position', () => {
        beforeEach(() => {
          gameon.gemFound = () => {
            gameon.gemFound = () => true
            return false
          }
          mockGame.map.playerPos = { x: 2, y: 2 }
          mockGame.gemPos = { x: 1, y: 2 }
          mockGame.setState.mock.calls = []
          gameon.execute()
        })
        it('not to change state', () => {
          expect(mockGame.setState).toHaveBeenCalledTimes(1)
        })
      })
      it('presents the options for user todo', () => {
        expect(mockReadline.question.mock.calls[0][0]).toEqual('(n) north, (s) south, (w) west, (e) east')
      })
    })
    describe('when key pressed', () => {
      const examples = [
        { start: { x: 0, y: 5 }, key: 'n', expected: { x: 0, y: 4 } },
        { start: { x: 3, y: 0 }, key: 'n', expected: { x: 3, y: 0 } },
        { start: { x: 0, y: 2 }, key: 'w', expected: { x: 0, y: 2 } },
        { start: { x: 5, y: 0 }, key: 'w', expected: { x: 4, y: 0 } },
        { start: { x: 3, y: 0 }, key: 'e', expected: { x: 4, y: 0 } },
        { start: { x: 99, y: 4 }, key: 'e', expected: { x: 99, y: 4 } },
        { start: { x: 99, y: 8 }, key: 's', expected: { x: 99, y: 9 } },
        { start: { x: 99, y: 99 }, key: 's', expected: { x: 99, y: 99 } }
      ]
      for (const ex of examples) {
        describe(`when key is ${ex.key}`, () => {
          beforeEach(() => {
            gameon.game.map.playerPos = Object.create(ex.start)
            gameon.keypressed(ex.key)
          })
          it(`gets y position ${ex.expected.y}`, () => {
            expect(gameon.game.map.playerPos.y).toEqual(ex.expected.y)
          })
          it(`gets x position ${ex.expected.x}`, () => {
            expect(gameon.game.map.playerPos.x).toEqual(ex.expected.x)
          })
        })
      }
    })
  })
})
