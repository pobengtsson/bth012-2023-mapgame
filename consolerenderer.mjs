export function consolerenderer (gamemap, printer, symboliser) {
  gamemap.tiles.forEach((line, y) => {
    const lineout = line.map((tile, x) => {
      if (gamemap.playerPos && gamemap.playerPos.x === x && gamemap.playerPos.y === y) {
        return '.'
      } else {
        return symboliser(tile)
      }
    }).join('')
    printer(lineout)
  })
}
