const { configureGameCanvasDimensions } = require("./processes/screen");

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

configureGameCanvasDimensions(canvas);
