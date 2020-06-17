import spritesImage from "./assets/images/sprites.png";
import { KEY, TICKS_PER_FRAME } from "./constants";
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
    gameLoop(0);
  }

  function gameLoop(frame) {
    update();
    render(player);
    requestAnimationFrame(gameLoop);
  }
}

function update() {}

function render(player) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (player.hasInputPressed()) {
    if (player.input.left) {
      player.position.x -= 5;
      if (player.position.x < 0) player.position.x = 0;
    }

    if (player.input.right) {
      player.position.x += 5;
      if (
        player.position.x >=
        canvas.width - player.sprtStand.width * player.sprtScale
      )
        player.position.x =
          canvas.width - player.sprtStand.width * player.sprtScale;
    }

    if (player.input.jump) {
      player.position.y += 5;
    }

    player.drawPlayerWalk();
  } else {
    player.drawPlayerStand();
  }
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
  this.hasInputPressed = () => {
    const { left, right, jump } = this.input;
    return left || right || jump;
  };
  this.position = {
    x: 0,
    y: 0,
  };
  this.tickCount_walk = 1;
  this.frameIndex_walk = 1;

  this.resetTickCount = () => {
    this.tickCount_walk = 0;
    this.frameIndex_walk = 1;
  };

  // The number of times that sprite will be scaled. Later, this value will change according to user screen size
  this.sprtScale = 5;

  return {
    input: this.input,
    position: this.position,
    sprtStand: this.sprtStand,
    sprtScale: this.sprtScale,
    hasInputPressed: this.hasInputPressed,
    drawPlayerStand: () => {
      this.resetTickCount();
      ctx.drawImage(
        megamanSprite,
        0,
        193,
        this.sprtStand.width,
        this.sprtStand.height,
        this.position.x,
        this.position.y,
        this.sprtStand.width * this.sprtScale,
        this.sprtStand.height * this.sprtScale
      );
    },
    drawPlayerWalk: () => {
      this.tickCount_walk++;
      if (this.tickCount_walk > TICKS_PER_FRAME) {
        this.tickCount_walk = 0;
        this.frameIndex_walk++;
        if (this.frameIndex_walk > 3) this.frameIndex_walk = 1;
      }
      ctx.drawImage(
        megamanSprite,
        this.sprtStand.width * this.frameIndex_walk,
        193,
        this.sprtStand.width,
        this.sprtStand.height,
        this.position.x,
        this.position.y,
        this.sprtStand.width * this.sprtScale,
        this.sprtStand.height * this.sprtScale
      );
      this.tickCount++;
    },
  };
}
