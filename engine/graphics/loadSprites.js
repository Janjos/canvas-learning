import spritesImage from "../../assets/images/sprites.png";

const loadAssets = () => {
  return new Promise((resolve, reject) => {
    try {
      const sprite = new Image();
      sprite.ready = false;
      sprite.src = spritesImage;
      sprite.onload = resolve(sprite);
    } catch (error) {
      reject(error);
    }
  });
};

export { loadAssets };
