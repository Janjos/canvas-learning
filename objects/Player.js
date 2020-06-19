import { TICKS_PER_FRAME, TILES_SIZE } from "../constants";

function Player(ctx, sprite) {
  this.friction = 0.8;

  this.input = {
    left: false,
    right: false,
    jump: false,
  };

  this.jumpingTickCount = 0;
  this.jumpIsDone = false;

  this.collides = { top: false, bottom: false, left: false, right: false };

  this.hasInputPressed = () => {
    const { left, right, jump } = this.input;
    return left || right || jump;
  };

  this.position = {
    x: 0,
    y: 500,
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
    sprtScale: this.sprtScale,
    hasInputPressed: this.hasInputPressed,
    jumpingTickCount: this.jumpingTickCount,
    isJumping: this.jumpingTickCount > 0,
    drawPlayerStand: () => {
      this.resetTickCount();
      ctx.drawImage(
        sprite,
        0,
        0,
        TILES_SIZE,
        TILES_SIZE,
        this.position.x,
        this.position.y,
        TILES_SIZE * this.sprtScale,
        TILES_SIZE * this.sprtScale
      );
    },
    drawPlayerWalk: () => {
      this.tickCount_walk++;
      const leftSide = this.input.left;
      if (this.tickCount_walk > TICKS_PER_FRAME) {
        this.tickCount_walk = 0;
        this.frameIndex_walk++;
        if (this.frameIndex_walk > 3) this.frameIndex_walk = 1;
      }
      ctx.drawImage(
        sprite,
        TILES_SIZE * this.frameIndex_walk,
        leftSide ? 16 : 0,
        TILES_SIZE,
        TILES_SIZE,
        this.position.x,
        this.position.y,
        TILES_SIZE * this.sprtScale,
        TILES_SIZE * this.sprtScale
      );
      this.tickCount++;
    },
    drawPlayerJump: () => {
      ctx.drawImage(
        sprite,
        TILES_SIZE * this.frameIndex_walk,
        leftSide ? 16 : 0,
        TILES_SIZE,
        TILES_SIZE,
        this.position.x,
        this.position.y,
        TILES_SIZE * this.sprtScale,
        TILES_SIZE * this.sprtScale
      );
      this.tickCount++;
    },
  };
}

export { Player };
