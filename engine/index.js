import { KEY } from "../constants";
import { Player } from "../objects/Player";
import { loadAssets } from "./graphics/loadSprites";
import { render } from "./gameLoop/render";
import { inputListener } from "./gameLoop/inputListener";
const { configureGameCanvasDimensions } = require("./screen");

const initGameEnviroment = () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  configureGameCanvasDimensions(canvas);

  loadAssets().then((sprite) => {
    ctx.imageSmoothingEnabled = false;
    engine(sprite);
  });

  function engine(sprite) {
    console.log("Game started!");
    const player = new Player(ctx, sprite);

    startGame();

    function startGame() {
      inputListener(player);
      gameLoop();
    }

    function gameLoop() {
      render(player, canvas, ctx);
      requestAnimationFrame(gameLoop);
    }
  }
};

export { initGameEnviroment };
