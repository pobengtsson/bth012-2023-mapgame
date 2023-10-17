export class GameMap {
  constructor (dimensions) {
    this.width = dimensions.width
    this.height = dimensions.height
    this.tiles = new Array(this.width)
    for (let x = 0; x < this.width; x++) {
      // this.tiles[x] = new Array(this.height)
    }
  }
}
