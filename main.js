import { Application } from 'pixi.js';
import Game from './src/classes/Game.js';

const app = new Application();
await app.init({ width: 740, height: 440, backgroundColor: 0x575757 });
// globalThis.__PIXI_APP__ = app;

document.getElementById('game-container').appendChild(app.canvas);

const game = new Game(app);

let counter = 0;
app.ticker.add((ticker) => {
  counter += ticker.elapsedMS;
  if (counter > game.speed) {
    if (game.gameStatus === 'start') {
      game.initGameObject();
      game.menu.gameStatus = 'playing';
    }
    if (game.gameStatus === 'playing') {
      game.update();
      counter = 0;
    }
    else {
      game.reset();
    }
  }
});
