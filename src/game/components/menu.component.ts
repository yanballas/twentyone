import * as PIXI from "pixi.js";

import { bootConfig } from "../../utils/configs";
import AssetLoader from "../stages/assets.game";

export default class MenuComponent extends PIXI.Container {
  protected _background: PIXI.Sprite | null = null;
  constructor() {
    super();
    this.name = bootConfig.assets.menu.name;

    this.create();
  }

  protected create(): void {
    this._background = new PIXI.Sprite(
      AssetLoader.getInstance().getTexture("menu"),
    );

    this._background.anchor.set(0.5);
    this._background.name = bootConfig.assets.menu.name;

    this.addChild(this._background);

    this.draw();
  }

  public draw(): void {
    console.log("draw menu");
  }
}
