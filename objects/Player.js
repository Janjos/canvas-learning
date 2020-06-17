import { TICKS_PER_FRAME } from "../constants";

function Player(ctx, sprite) {
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
        sprite,
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
        sprite,
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

export { Player };
