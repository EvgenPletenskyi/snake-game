class Wall {
  constructor(cellSize) {
    this.cellSize = cellSize;
  }

  drawWall(x, y, color) {
    const wall = new PIXI.Graphics();
    wall.rect(0, 0, this.cellSize, this.cellSize).fill(color);
    wall.x = x * this.cellSize;
    wall.y = y * this.cellSize;
    return wall;
  }
}

window.Wall = Wall;
