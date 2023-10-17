export class Tile {
  constructor (aTerrain) {
    this.terrain = aTerrain
    this.isVisited = false
    this.items = []
    this.npcList = []
    this.actions = []
  }
}
