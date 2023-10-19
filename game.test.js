import { jest } from '@jest/globals'
import { Game } from './game.mjs'
import { GameOn } from './gameon.mjs'
import { Setup } from './setup.mjs'

describe('game', () => {
  describe('when created', () => {
    let actual
    const expectedReadline = {}
    const renderer = () => {}
    const symboliser = () => {}
    const prng = () => {}
    beforeEach(() => {
      actual = new Game({ width: 4, height: 4 }, expectedReadline, renderer, symboliser, undefined, prng)
    })
    it('is in state setup', () => {
      expect(actual.state).toBeInstanceOf(Setup)
    })
    it('passes the readline to the initial state', () => {
      expect(actual.state.readline).toBe(expectedReadline)
    })
    it('has set console.log for linePrinting', () => {
      expect(actual.printLine).toBe(console.log)
    })
    it('sets renderer as property', () => {
      expect(actual.renderer).toBe(renderer)
    })
    it('sets symboliser as property', () => {
      expect(actual.symboliser).toBe(symboliser)
    })
    it('has a prng property to use for randomness', () => {
      expect(actual.prng).toBe(prng)
    })
    describe('when started', () => {
      it('runs execute on setup state', () => {
        const mockExecute = jest.fn()
        actual.state.execute = mockExecute
        actual.start()
        expect(mockExecute).toHaveBeenCalled()
      })
      describe('when change state', () => {
        let newState
        beforeEach(() => {
          newState = new GameOn(actual)
          newState.execute = jest.fn()
          actual.setState(newState)
        })
        it('sets state to the new state', () => {
          expect(actual.state).toBeInstanceOf(GameOn)
        })
        it('calls execute on the new state', () => {
          expect(newState.execute).toHaveBeenCalled()
        })
      })
    })
  })
})
