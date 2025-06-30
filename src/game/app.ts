import * as PIXI from "pixi.js";

import { appConfig } from "../utils/configs.ts";

import BootGame from "./stages/boot.game.ts";
import RegularGame from "./stages/regular.game.ts";
import { BASE_HEIGHT, getWindowSize, BASE_WIDTH } from "../utils/constants.ts";

declare global {
  var __PIXI_APP__: App; // eslint-disable-line no-var
}

export class App extends PIXI.Application {
  protected rootContainer: HTMLDivElement;
  declare protected _bootScene: BootGame;
  declare protected _regularScene: RegularGame | null;
  public readonly ROOT_SCENE_NAME: string = "app";

  constructor() {
    super(appConfig);
    this.rootContainer = document.getElementById("app") as HTMLDivElement;
    this.stage.name = this.ROOT_SCENE_NAME;
    this._regularScene = null;

    this.rootContainer.appendChild(this.view);

    this.init();
  }

  protected resizeGame(): void {
    const { width: windowWidth, height: windowHeight } = getWindowSize();

    const scaleX = windowWidth / BASE_WIDTH;
    const scaleY = windowHeight / BASE_HEIGHT;
    const scale =
      windowWidth >= 1024 ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);

    this.stage.scale.set(scale);

    const stageWidth = BASE_WIDTH * scale;
    const stageHeight = BASE_HEIGHT * scale;

    this.stage.position.set(
      (windowWidth - stageWidth) / 2,
      (windowHeight - stageHeight) / 2,
    );
  }

  protected init(): void {
    globalThis.__PIXI_APP__ = this;

    window.addEventListener("resize", () => this.resizeGame());
    this.resizeGame();

    try {
      this._bootScene = new BootGame(this);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error("error initial bootScene"); // Для неизвестных типов ошибок
    }
  }

  public startGame(): void {
    this._regularScene = new RegularGame(this);
    this.stage.addChild(this._regularScene);
    console.log("changeScene");
  }
}
