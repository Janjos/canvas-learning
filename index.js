import spritesImage from "./assets/images/sprites.png";
import { KEY } from "./constants";
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

  document.addEventListener(
    "keydown",
    (ev) => onkey(ev, ev.keyCode, true),
    false
  );
  document.addEventListener(
    "keyup",
    (ev) => onkey(ev, ev.keyCode, false),
    false
  );

  function onkey(ev, key, pressed) {
    console.log(player);
    switch (key) {
      case KEY.LEFT:
        player.input.left = pressed;
        ev.preventDefault();
        break;
      case KEY.RIGHT:
        player.input.right = pressed;
        ev.preventDefault();
        break;
      case KEY.SPACE:
        player.input.jump = pressed;
        ev.preventDefault();
        break;
      default:
        break;
    }
  }

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

  if (player.input.left) {
    player.position.x -= 5;
  }
  if (player.input.right) {
    player.position.x += 5;
  }
  if (player.input.jump) {
    player.position.y += 5;
  }

  player.drawPlayerStand();
}

function Player(ctx) {
  this.sprtStand = {
    width: 16,
    height: 16,
    frames: 3,
  };

  this.input = {
    left: false,
    right: false,
    jump: false,
  };

  this.position = {
    x: 0,
    y: 0,
  };

  return {
    input: this.input,
    position: this.position,
    drawPlayerStand: (frame = 0) => {
      ctx.drawImage(
        megamanSprite,
        this.sprtStand.width * frame,
        194,
        this.sprtStand.width,
        this.sprtStand.height,
        this.position.x,
        this.position.y,
        this.sprtStand.width * 5,
        this.sprtStand.height * 5
      );
    },
  };
}
