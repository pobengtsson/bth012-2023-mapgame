import { symboliser } from './symboliser.mjs'
import { Tile } from './tile.mjs'

describe('symboliser', () => {
  const examples = [
    { tile: new Tile('desert'), expected: '_' },
    { tile: new Tile('forest'), expected: '@' },
    { tile: new Tile('mountain'), expected: 'M' },
    { tile: new Tile('swamp'), expected: '~' }]
  for (const ex of examples) {
    describe(`when called with unvisited tile with ${ex.tile.terrain}`, () => {
      it('returns the masking symbol', () => {
        expect(symboliser(ex.tile)).toEqual('#')
      })
    })
    describe(`when called with visited ${ex.tile.terrain} terrain`, () => {
      it(`returns ${ex.expected}`, () => {
        ex.tile.isVisited = true
        expect(symboliser(ex.tile)).toEqual(ex.expected)
      })
    })
  }
  describe('when called with unrecognized terrain', () => {
    describe('when visited', () => {
      it('throws an error', () => {
        const alienTile = new Tile('alien terrain', true)
        expect(() => symboliser(alienTile)).toThrow()
      })
    })
    describe('when not visited', () => {
      it('throws an error', () => {
        const alienTile = new Tile('alien terrain', false)
        expect(() => symboliser(alienTile)).toThrow()
      })
    })
  })
})
