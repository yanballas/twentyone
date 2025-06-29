import { BASE_HEIGHT, BASE_WIDTH } from "./constants";
import type {IConfigBoot} from "./interface.ts";

export const appConfig = {
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  resizeTo: window,
};

export const bootConfig: IConfigBoot = {
  background: {
    url: "",
    name: ""
  }
}