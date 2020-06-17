import spritesImage from "./assets/images/sprites.png";
const { configureGameCanvasDimensions } = require("./processes/screen");

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
configureGameCanvasDimensions(canvas);

const megamanSprite = new Image();
megamanSprite.ready = false;
megamanSprite.onload = setAssetReady;
megamanSprite.src = spritesImage;

function setAssetReady() {
  ctx.imageSmoothingEnabled = false;
  engine();
}

function engine() {
  console.log("Game started!");
  const player = new Player(ctx);
  startGame();

  function startGame() {
    gameLoop();
  }

  function gameLoop() {
    update();
    render(player);
    requestAnimationFrame(gameLoop);
  }
}

function update() {}

function render(player) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.drawPlayerStand();
}

function Player(ctx) {
  this.sprtStand = {
    width: 16,
    height: 16,
    frames: 3,
  };

  return {
    drawPlayerStand: (frame = 0) => {
      ctx.drawImage(
        megamanSprite,
        this.sprtStand.width * frame,
        194,
        this.sprtStand.width,
        this.sprtStand.height,
        0,
        0,
        this.sprtStand.width * 5,
        this.sprtStand.height * 5
      );
    },
  };
}
