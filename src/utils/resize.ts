import * as PIXI from "pixi.js";
import {
  BASE_ASPECT,
  BASE_HEIGHT,
  BASE_WIDTH,
  getWindowSize,
} from "./constants";

export function resize(app: PIXI.Application) {
  const { width: windowWidth, height: windowHeight } = getWindowSize();
  const currentAspect: number = windowWidth / windowHeight;

  let scale: number = 1;
  let offsetX: number = 0;
  let offsetY: number = 0;

  if (currentAspect > BASE_ASPECT) {
    scale = windowHeight / BASE_HEIGHT;
    const contentWidth: number = BASE_WIDTH * scale;
    offsetX = (windowWidth - contentWidth) / 2;
  } else {
    scale = windowWidth / BASE_WIDTH;
    const contentHeight: number = BASE_HEIGHT * scale;
    offsetY = (windowHeight - contentHeight) / 2;
  }

  app.stage.scale.set(scale);
  app.stage.position.set(offsetX, offsetY);
}
