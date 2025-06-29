import type { WindowSize } from "./interface";

export const BASE_WIDTH: number = 1440;
export const BASE_HEIGHT: number = 800;
export const BASE_ASPECT: number = BASE_WIDTH / BASE_HEIGHT;

export const getWindowSize = (): WindowSize => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};
