import { Graphics, Container } from 'pixi.js';
import Snake from './Snake.js';
import Food from './Food.js';
import Wall from './Wall.js';
import Menu from './Menu.js';

class Game {
  constructor(app, gridSize = 22, cellSize = 20) {
    this.app = app;
    this.gridSize = gridSize;
    this.cellSize = cellSize;

    this.menuContainer = new Container();
    this.gameContainer = new Container();

    this.wall = new Wall(this.cellSize);
    this.menu = new Menu();
    this.wallPositions = [];
    this.graphics = [];
    this.wallGraphics = [];
    this.speed = 150;
    this.currentScore = 0;
    this.lastKeyPressed = null;

    this.drawWalls();
    this.addEventListeners();
    this.initContainers();
  }

  initContainers() {
    this.menuContainer.addChild(this.menu.container);
    this.app.stage.addChild(this.menuContainer);
    this.app.stage.addChild(this.gameContainer);
  }

  addEventListeners() {
    window.addEventListener('keydown', (e) => this.handleInput(e));
  }

  handleInput(event) {
    const key = event.key;

    // Store the last key pressed, if it's a valid direction change
    if (key === 'ArrowUp' && this.snake.direction !== 'down') {
      this.lastKeyPressed = 'up';
    } else if (key === 'ArrowDown' && this.snake.direction !== 'up') {
      this.lastKeyPressed = 'down';
    } else if (key === 'ArrowLeft' && this.snake.direction !== 'right') {
      this.lastKeyPressed = 'left';
    } else if (key === 'ArrowRight' && this.snake.direction !== 'left') {
      this.lastKeyPressed = 'right';
    }
  }

  initGameObject() {
    this.snake = new Snake();
    this.food = new Food(this.gridSize);
    this.food.selectedMode = this.selectedMode;
    this.snake.selectedMode = this.selectedMode;
    this.food.foodPositions(this.snake.segments);
  }
  update() {
    if (this.lastKeyPressed) {
      this.snake.direction = this.lastKeyPressed;
      this.lastKeyPressed = null;
    }

    this.snake.move(this.snake.direction);

    if (this.snake.isCollision(this.gridSize)) {
      alert('Good Game');
      this.menu.restoreMenu();
      return;
    }

    if (this.checkCollisionWithFood()) {
      this.snake.grow();
      if (this.selectedMode === 'Walls') {
        this.spawnWall();
      }
      this.food.foodPositions(this.snake.segments);
      this.currentScore++;
      this.menu.updateScore(this.currentScore);
    }

    this.draw();
  }
  spawnWall() {
    let wallPosition;
    do {
      wallPosition = {
        x: Math.floor(Math.random() * (this.gridSize - 2)) + 1,
        y: Math.floor(Math.random() * (this.gridSize - 2)) + 1,
      };
    } while (this.isPositionOccupied(wallPosition));

    this.wallPositions.push(wallPosition);
    const wallGraphic = this.wall.drawWall(
      wallPosition.x,
      wallPosition.y,
      0xa96a0e
    );
    this.gameContainer.addChild(wallGraphic);
    this.wallGraphics.push(wallGraphic);
    this.snake.wallPositions = this.wallPositions;
  }

  isPositionOccupied(position) {
    for (let segment of this.snake.segments) {
      if (segment.x === position.x && segment.y === position.y) {
        return true;
      }
    }

    for (let foodPosition of this.food.positions) {
      if (foodPosition.x === position.x && foodPosition.y === position.y) {
        return true;
      }
    }

    return false;
  }

  checkCollisionWithFood() {
    const snakeHead = this.snake.head;

    for (let foodPosition of this.food.positions) {
      if (snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y) {
        if (this.selectedMode === 'Portal') {
          const nextFoodPosition = this.getNextFoodPosition(foodPosition);
          if (nextFoodPosition) {
            this.snake.head.x = nextFoodPosition.x;
            this.snake.head.y = nextFoodPosition.y;
          }
        }
        if (this.selectedMode === 'Speed') {
          this.speed /= 1.1;
        }
        return true;
      }
    }
    return false;
  }

  getNextFoodPosition(currentFoodPosition) {
    return this.food.positions.find(
      (position) =>
        position.x !== currentFoodPosition.x ||
        position.y !== currentFoodPosition.y
    );
  }

  draw() {
    this.clearSnakeAndFood();

    this.drawCell(this.snake.head.x, this.snake.head.y, 0xffbc03);
    for (let i = 1; i < this.snake.segments.length; i++) {
      const segment = this.snake.segments[i];
      this.drawCell(segment.x, segment.y, 0x00ff00);
    }

    this.drawFood();
    this.drawWalls();
  }
  clearSnakeAndFood() {
    if (this.graphics.length > 0) {
      this.graphics.forEach((graphic) => {
        graphic.clear();
      });
      this.graphics = [];
    }
  }

  drawFood() {
    for (let foodPosition of this.food.currentPositions) {
      this.drawCell(foodPosition.x, foodPosition.y, 0xff0000);
    }
  }

  drawWalls() {
    for (let x = 0; x < this.gridSize; x++) {
      this.gameContainer.addChild(this.wall.drawWall(x, 0, 0xa96a0e));
      this.gameContainer.addChild(
        this.wall.drawWall(x, this.gridSize - 1, 0xa96a0e)
      );
    }

    for (let y = 1; y < this.gridSize - 1; y++) {
      this.gameContainer.addChild(this.wall.drawWall(0, y, 0xa96a0e));
      this.gameContainer.addChild(
        this.wall.drawWall(this.gridSize - 1, y, 0xa96a0e)
      );
    }
  }

  drawCell(x, y, color) {
    const cell = new Graphics();
    cell.rect(0, 0, this.cellSize, this.cellSize).fill(color);
    cell.x = x * this.cellSize;
    cell.y = y * this.cellSize;
    this.graphics.push(cell);
    this.gameContainer.addChild(cell);
  }

  reset() {
    // Stop any game loop or update interval
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }

    // Clear snake and food graphics from the game container
    this.clearSnakeAndFood();

    // Remove any remaining walls
    this.wallGraphics.forEach((wall) => {
      this.gameContainer.removeChild(wall);
    });
    this.wallPositions = [];
    this.wallGraphics = [];
    this.graphics.forEach((graphic) => {
      this.gameContainer.removeChild(graphic);
    });
    this.graphics = [];

    // Reset score and update menu score display
    this.currentScore = 0;
    this.menu.updateScore(this.currentScore);

    // Clear walls and redraw boundaries
    this.drawWalls();

    this.speed = 150;
    this.menuContainer.visible = true;
  }

  get gameStatus() {
    return this.menu.gameStatus;
  }

  get selectedMode() {
    return this.menu.selectedMode;
  }
}

export default Game;
