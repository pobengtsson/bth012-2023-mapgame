import { GameMap } from './gamemap.mjs'
import { Tile } from './tile.mjs'
import { jest } from '@jest/globals'

describe('GameMap', () => {
  let gamemap
  let mockNext
  beforeEach(() => {
    mockNext = jest.fn().mockReturnValue({ value: new Tile('asd') })
    gamemap = new GameMap({ width: 10, height: 10 }, { next: mockNext })
  })
  describe('when created', () => {
    it('has given width', () => {
      expect(gamemap.dimensions.width).toEqual(10)
    })
    it('has given height', () => {
      expect(gamemap.dimensions.height).toEqual(10)
    })
    it('has list of tiles with width length', () => {
      expect(gamemap.tiles).toHaveLength(10)
    })
    it('has 100 map tiles', () => {
      const allTiles = gamemap.tiles.flatMap((x) => x)
      expect(allTiles).toHaveLength(100)
    })
    it('has used the generator to get all tiles', () => {
      expect(mockNext).toHaveBeenCalledTimes(100)
    })
    it('has only tile objects in the map', () => {
      const allTiles = gamemap.tiles.flatMap((x) => x)
      expect(allTiles.every((tile) => tile instanceof Tile)).toEqual(true)
    })
    describe('when visited', () => {
      it('sets tile isVisited to true', () => {
        gamemap.playerPos = { x: 5, y: 3 }
        gamemap.visit()
        expect(gamemap.tiles[5][3].isVisited).toEqual(true)
      })
    })
  })
})
