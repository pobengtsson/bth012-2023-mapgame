import { tileGenerator } from './tilegenerator'

export class GameMap {
  constructor (dimensions, tileiterator = tileGenerator()) {
    this.width = dimensions.width
    this.height = dimensions.height
    this.tiles = new Array(this.width)
    for (let x = 0; x < this.width; x++) {
      this.tiles[x] = new Array(this.height)
      for (let y = 0; y < this.height; y++) {
        this.tiles[x][y] = tileiterator.next().value
      }
    }
  }
}
