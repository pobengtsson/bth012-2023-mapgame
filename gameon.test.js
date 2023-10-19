import { jest } from '@jest/globals'
import { GameOn } from './gameon'
import { GameWon } from './gamewon'

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
        map: { playerPos: { x: 0, y: 0 } },
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
          mockGame.map.playerPos = { x: 2, y: 2 }
          mockGame.gemPos = { x: 1, y: 2 }
          mockGame.setState.mock.calls = []
          gameon.execute()
        })
        it('not to change state', () => {
          expect(mockGame.setState).not.toHaveBeenCalled()
        })
      })
    })
  })
})
