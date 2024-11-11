class Snake {
  constructor() {
    this.segments = [
      { x: 2, y: 10 },
      { x: 1, y: 10 },
      { x: 0, y: 10 },
    ];
    this._direction = 'right';
    this._wallPosition = [];
  }

  move(direction) {
    const head = { ...this.segments[0] };

    if (direction === 'up') head.y -= 1;
    else if (direction === 'down') head.y += 1;
    else if (direction === 'left') head.x -= 1;
    else if (direction === 'right') head.x += 1;

    this.segments.unshift(head);
    this.segments.pop();
  }

  get head() {
    return this.segments[0];
  }

  get direction() {
    return this._direction;
  }

  set direction(newDirection) {
    this._direction = newDirection;
  }

  set selectedMode(selectedMode) {
    this._selectedMode = selectedMode;
  }

  set wallPositions(wallPositions) {
    this._wallPosition = wallPositions;
  }

  grow() {
    const lastSegment = this.segments[this.segments.length - 1];
    this.segments.push({ ...lastSegment });
  }

  isCollision(gridSize) {
    const head = this.head;

    // Check for collision with field boundaries
    if (this._selectedMode != 'God mode') {
      if (
        head.x < 1 ||
        head.x >= gridSize - 1 ||
        head.y < 1 ||
        head.y >= gridSize - 1
      ) {
        return true;
      }

      // Check for body collision
      for (let i = 1; i < this.segments.length; i++) {
        if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
          return true;
        }
      }

      // Check for walls collision
      for (let wall of this._wallPosition) {
        if (head.x === wall.x && head.y === wall.y) {
          return true;
        }
      }
    } else {
      if (head.x < 0) {
        head.x = gridSize - 2;
      } else if (head.x >= gridSize) {
        head.x = 1;
      }

      if (head.y < 0) {
        head.y = gridSize - 2;
      } else if (head.y >= gridSize) {
        head.y = 1;
      }
    }

    return false;
  }
}

window.Snake = Snake;