import { BASE_HEIGHT, BASE_WIDTH } from "./constants";
import type { IConfigBoot } from "./interface.ts";

import backgroundRegular from "../assets/textures/backgroundRegular.webp";
import backgroundBoot from "../assets/textures/backgroundBoot.webp";

export const appConfig = {
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  resizeTo: window,
};

export const bootConfig: IConfigBoot = {
  assets: {
    backgroundBoot: {
      url: backgroundBoot,
      name: "backgroundBoot",
    },
    backgroundRegular: {
      url: backgroundRegular,
      name: "backgroundRegular",
    },
  },
};
