class Food {
  constructor(gridSize) {
    this.gridSize = gridSize;
  }

  getRandomFoodPosition(snakeSegments) {
    let position;
    let isOnSnake;

    do {
      const x = Math.floor(Math.random() * (this.gridSize - 2)) + 1;
      const y = Math.floor(Math.random() * (this.gridSize - 2)) + 1;
      position = { x, y };

      isOnSnake = snakeSegments.some(
        (segment) => segment.x === x && segment.y === y
      );
    } while (isOnSnake);

    return position;
  }
  foodPositions(snakeSegments) {
    this.positions = [];

    if (this._selectedMode === 'Portal') {
      // Generate two random food positions
      for (let i = 0; i < 2; i++) {
        this.positions.push(this.getRandomFoodPosition(snakeSegments));
      }
    } else {
      // Default to a single food position
      this.positions.push(this.getRandomFoodPosition(snakeSegments));
    }
  }

  set selectedMode(selectedMode) {
    this._selectedMode = selectedMode;
  }
  get currentPositions() {
    return this.positions;
  }
}

window.Food = Food;
