import { TILES_SIZE } from "../constants";

function Floor(ctx, sprite, { posX, posY }, { tileX, tileY }) {
  this.sprtScale = 5;
  this.position = {
    x: posX,
    y: posY,
  };

  this.tilePosition = {
    x: tileX,
    y: tileY,
  };

  return {
    position: this.position,
    tilePosition: this.tilePosition,
    drawFloor: () => {
      // ctx.drawImage(
      //   sprite,
      //   tileX,
      //   tileY,
      //   16,
      //   16,
      //   posX,
      //   posY,
      //   TILES_SIZE * this.sprtScale,
      //   TILES_SIZE * this.sprtScale
      // );
      ctx.drawImage(
        sprite,
        this.tilePosition.x,
        this.tilePosition.y,
        16,
        16,
        this.position.x,
        this.position.y,
        TILES_SIZE * this.sprtScale,
        TILES_SIZE * this.sprtScale
      );
    },
  };
}

export { Floor };
