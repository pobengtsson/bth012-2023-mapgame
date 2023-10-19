import { jest } from '@jest/globals'
import { GameOn } from './gameon'

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
    })
  })
})
