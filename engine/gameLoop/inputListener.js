import { KEY } from "../../constants";

const inputListener = (player) => {
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
};

export { inputListener };
