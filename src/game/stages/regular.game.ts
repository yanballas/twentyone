import * as PIXI from "pixi.js";
import { BASE_HEIGHT, BASE_WIDTH } from "../../utils/constants";
import AssetLoader from "../../utils/assets";

import type { App } from "../app";

import SharedGame from "./shared.game";

export default class RegularGame extends SharedGame {
  protected _app: App;
  protected _background: PIXI.Sprite | null = null;

  constructor(app: App) {
    super(app);
    this._app = app;

    this.create();
  }

  protected create(): void {
    this._background = new PIXI.Sprite(
      AssetLoader.getInstance().getTexture("backgroundRegular"),
    );
    this._background.anchor.set(0.5);
    this._background.position.set(BASE_WIDTH / 2, BASE_HEIGHT / 2);
    this._background.width = BASE_WIDTH;
    this._background.height = BASE_HEIGHT;

    this.addChild(this._background);
    console.log("RegularGame created");
  }
}
