import { GameMap } from './gamemap'

describe('GameMap', () => {
  describe('when created', () => {
    it('has given width', () => {
      expect(new GameMap({ width: 10, height: 10 }).width).toEqual(10)
    })
    it('has given height', () => {
      expect(new GameMap({width: 15, height: 15 }).height).toEqual(15)
    })
    it('has list of tiles with widthn length', () => {
      expect(new GameMap({width: 15, height: 15 }).tiles).toHaveLength(15)
    })
    it('has lists of lists where each sublist is 15 items', () => {
      const gameMap = new GameMap({ width: 15, height: 15 })
      const lengths = gameMap.tiles.map((a) => a.length)
      const allCorrectLength = lengths.every((l) => l === 15)
      expect(allCorrectLength).toEqual(true)
    })
  })
})
