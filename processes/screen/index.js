const { GAMEWINDOW } = require("../../constants");

const nativeWidth = GAMEWINDOW.WIDTH;
const nativeHeight = GAMEWINDOW.HEIGTH;

const configureGameCanvasDimensions = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = canvas.height * (nativeWidth / nativeHeight);
};

export { configureGameCanvasDimensions };
