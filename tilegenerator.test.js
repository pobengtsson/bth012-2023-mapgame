import { jest } from '@jest/globals'
import { tileGenerator } from './tilegenerator'

describe('tilegenerator function', () => {
  describe('when called', () => {
    it('returns a tile with desert terrain', () => {
      const prngMock = jest.fn().mockReturnValue(0)
      const gen = tileGenerator(prngMock)
      expect(gen.next().value.terrain).toBe('desert')
    })
  })
})
