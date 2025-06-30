import { BASE_HEIGHT, BASE_WIDTH } from "./constants";
import type { IConfigBoot } from "./interface.ts";

import backgroundRegular from "../assets/textures/backgroundRegular.webp";
import backgroundMenu from "../assets/textures/menu.webp";

export const appConfig = {
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  resizeTo: window,
};

export const bootConfig: IConfigBoot = {
  assets: {
    menu: {
      url: backgroundMenu,
      name: "menu",
    },
    backgroundRegular: {
      url: backgroundRegular,
      name: "backgroundRegular",
    },
  },
};
