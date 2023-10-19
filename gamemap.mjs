import { tileGenerator } from './tilegenerator.mjs'

export class GameMap {
  constructor (dimensions, tileiterator = tileGenerator()) {
    this.dimensions = dimensions
    const width = dimensions.width
    const height = dimensions.height
    this.tiles = new Array(width)
    for (let x = 0; x < width; x++) {
      this.tiles[x] = new Array(height)
      for (let y = 0; y < height; y++) {
        this.tiles[x][y] = tileiterator.next().value
      }
    }
  }
}
