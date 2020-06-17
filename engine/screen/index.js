const { ASPECTRATIO } = require("../../constants");

const configureGameCanvasDimensions = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = canvas.height * ASPECTRATIO;
};

export { configureGameCanvasDimensions };
