import { jest } from '@jest/globals'
import { consolerenderer } from './consolerenderer.mjs'
import { GameMap } from './gamemap.mjs'
import { Tile } from './tile.mjs'

describe('consoleRenderer', () => {
  let outputMock
  let mockNext
  let symboliserMock
  const expectedTerrain = 'test terrain'
  beforeEach(() => {
    mockNext = jest.fn().mockReturnValue({ value: new Tile(expectedTerrain) })
    outputMock = jest.fn()
    symboliserMock = jest.fn().mockReturnValue('s')
  })
  describe('when rendering a 1x1 map', () => {
    beforeEach(() => {
      consolerenderer(new GameMap({ width: 1, height: 1 }, { next: mockNext }), outputMock, () => '#')
    })
    it('prints 1 lines', () => {
      expect(outputMock).toHaveBeenCalledTimes(1)
    })
  })
  describe('when rendering a 4 x 4 map', () => {
    beforeEach(() => {
      consolerenderer(new GameMap({ width: 4, height: 4 }, { next: mockNext }), outputMock, symboliserMock)
    })
    it('prints 4 lines', () => {
      expect(outputMock).toHaveBeenCalledTimes(4)
    })
    it('prints all lines with 4 characters for tile symbols', () => {
      const printedLines = outputMock.mock.calls.map((args) => args[0])
      expect(printedLines.every((line) => line === 'ssss')).toEqual(true)
    })
    it('calls the symboliser with the tile terrain', () => {
      const actualArgs = symboliserMock.mock.calls.map((args) => args[0])
      expect(actualArgs.every((tile) => tile instanceof Tile)).toEqual(true)
    })
  })
  const examples = [
    { pos: { x: 0, y: 0 }, line: '.sss' },
    { pos: { x: 1, y: 0 }, line: 's.ss' },
    { pos: { x: 2, y: 0 }, line: 'ss.s' },
    { pos: { x: 3, y: 0 }, line: 'sss.' }
  ]
  for (const ex of examples) {
    describe(`when rendering with player pos ${ex.pos}`, () => {
      it(`prints ${ex.line} as the first line`, () => {
        const gmap = new GameMap({ width: 4, height: 4 }, { next: mockNext })
        gmap.playerPos = ex.pos
        consolerenderer(gmap, outputMock, symboliserMock)
        const printedLines = outputMock.mock.calls.map((args) => args[0])
        expect(printedLines[0]).toEqual(ex.line)
      })
    })
  }
})
