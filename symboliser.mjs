function mapper (terrain) {
  switch (terrain) {
    case 'desert':
      return '_'
    case 'forest':
      return '@'
    case 'mountain':
      return 'M'
    case 'swamp':
      return '~'
    default:
      throw Error(`Unrecognized terrain: ${terrain}`)
  }
}

function cloakIfNotVisisted (symbol, uncloak) {
  return uncloak ? symbol : '#'
}

export function symboliser (tile) {
  return cloakIfNotVisisted(mapper(tile.terrain), tile.isVisited)
}
