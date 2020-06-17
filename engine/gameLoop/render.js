const render = (player, canvas, ctx) => {
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
};

export { render };
