import { jest } from '@jest/globals'
import { Setup } from './setup.mjs'
import { GameMap } from './gamemap.mjs'
import { GameOn } from './gameon.mjs'

describe('Setup', () => {
  describe('when created', () => {
    let setup
    let mockGame
    let logMock
    let mockQuestion
    let mockReadline
    const expectedPlayerName = 'Player One'
    beforeEach(() => {
      logMock = jest.fn()
      mockQuestion = jest.fn().mockReturnValue(expectedPlayerName)
      mockGame = {
        setState: jest.fn(),
        printLine: logMock,
        prng: jest.fn().mockReturnValue(0.34)
      }
      mockReadline = { question: mockQuestion }
      setup = new Setup(mockGame, mockReadline)
    })
    it('has a reference to the game', () => {
      expect(setup.game).toBe(mockGame)
    })
    describe('when executed', () => {
      beforeEach(() => {
        setup.execute()
      })
      it('prints a welcome to the game message', () => {
        expect(logMock.mock.calls[0][0]).toEqual('Welcome to The Game Map Adventure')
      })
      it('prompts the user to input name to start the game', () => {
        const prompt = mockQuestion.mock.calls[0][0]
        expect(prompt).toEqual('Enter your name to start: ')
      })
      it('creates the game map', () => {
        expect(setup.game.map).toBeInstanceOf(GameMap)
      })
      it('creates a game map with dimension 15x15', () => {
        expect(setup.game.map.dimensions).toEqual({ width: 15, height: 15 })
      })
      it('sets the location of the gem', () => {
        expect(setup.game.gemPos).toEqual({ x: 5, y: 5 })
      })
      it('puts the player in position', () => {
        expect(setup.game.map.playerPos).toEqual({ x: 7, y: 7 })
      })
      describe('when user enters name', () => {
        it('sets a new game state', () => {
          expect(mockGame.setState).toHaveBeenCalled()
        })
        it('has a player with provided name', () => {
          expect(setup.game.player.name).toEqual(expectedPlayerName)
        })
        it('sets state to GameOn', () => {
          const newState = mockGame.setState.mock.calls[0][0]
          expect(newState).toBeInstanceOf(GameOn)
        })
        it('passes the game to the new state', () => {
          const newState = mockGame.setState.mock.calls[0][0]
          expect(newState.game).toBe(mockGame)
        })
        it('passes the readline to the new state', () => {
          const newState = mockGame.setState.mock.calls[0][0]
          expect(newState.readline).toBe(mockReadline)
        })
      })
    })
  })
})
