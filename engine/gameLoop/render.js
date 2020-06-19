import { PLAYER_SPEED, TILES_SIZE, GRAVITY } from "../../constants";
import { Floor } from "../../objects/Floor";

const render = (player, canvas, ctx, sprite) => {
  //Clean canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Floor added for tests
  const floorTest = new Floor(
    ctx,
    sprite,
    { posX: 0, posY: canvas.height - TILES_SIZE * 5 },
    { tileX: TILES_SIZE, tileY: TILES_SIZE * 4 }
  );
  floorTest.drawFloor();
  const floorTest2 = new Floor(
    ctx,
    sprite,
    { posX: TILES_SIZE * 5, posY: canvas.height - TILES_SIZE * 5 },
    { tileX: TILES_SIZE * 2, tileY: TILES_SIZE * 4 }
  );
  floorTest2.drawFloor();
  //End floor test

  if (player.isJumping) {
    player.position.y -= 20 - player.jumpingTickCount * 1.1;
    player.jumpingTickCount++;
    if (player.jumpingTickCount > 20) {
      player.jumpingTickCount = 0;
      player.isJumping = false;
    }
  }

  const colisions = checkColision(player, [floorTest, floorTest2]);

  player.collides = colisions;
  if (!colisions.bottom && !player.isJumping) {
    player.position.y += GRAVITY;
    player.isJumping = false;
  }

  if (player.hasInputPressed()) {
    if (player.input.left) {
      player.position.x -= PLAYER_SPEED;
      if (player.position.x < 0) player.position.x = 0;
    }

    if (player.input.right) {
      player.position.x += PLAYER_SPEED;
      if (player.position.x >= canvas.width - TILES_SIZE * player.sprtScale)
        player.position.x = canvas.width - TILES_SIZE * player.sprtScale;
    }

    if (player.input.jump && player.collides.bottom && !player.isJumping) {
      player.position.y -= 20;
      player.jumpingTickCount = 1;
      player.isJumping = true;
    }

    player.drawPlayerWalk();
  } else {
    player.drawPlayerStand();
  }
};

function checkColision(player, objects) {
  let collides = { top: false, bottom: false, left: false, right: false };

  objects.forEach((obj) => {
    if (
      player.position.x <= obj.position.x + TILES_SIZE * 5 &&
      player.position.y >= obj.position.y - TILES_SIZE * 5
    ) {
      collides.bottom = true;
    }
  });

  return collides;
}

export { render };
