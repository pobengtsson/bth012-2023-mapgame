import { Tile } from './tile'

describe('tile', () => {
  describe('when created', () => {
    it('has the given terrain type', () => {
      expect(new Tile('grassland').terrain).toEqual('grassland')
    })
    it('has not been visited', () => {
      expect(new Tile('ignored').isVisited).toEqual(false)
    })
    it('has no items', () => {
      expect(new Tile('ignored').items).toHaveLength(0)
    })
    it('has no non player characters', () => {
      expect(new Tile('ignored').npcList).toHaveLength(0)
    })
    it('has no player actions', () => {
      expect(new Tile('ignored').actions).toHaveLength(0)
    })
  })
})
