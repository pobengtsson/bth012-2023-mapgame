import { Player } from './player.mjs'

describe('Player', () => {
  describe('when created', () => {
    it('has the given name', () => {
      const expectedName = 'Player one'
      const actual = new Player(expectedName)
      expect(actual.name).toEqual(expectedName)
    })
    it('has 100 as health level', () => {
      const actual = new Player('ignored')
      expect(actual.health).toEqual(100)
    })
    it('has armour level 100', () => {
      expect(new Player('ignored').armour).toEqual(100)
    })
    it('has damage level 20', () => {
      expect(new Player('ignored').damage).toEqual(20)
    })
    it('is healthy', () => {
      expect(new Player('ignored').isHealthy()).toEqual(true)
    })
  })
})
