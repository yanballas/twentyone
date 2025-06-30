import * as PIXI from "pixi.js";

import type { App } from "../app";

import SharedGame from "./shared.game";
import AssetLoader from "./assets.game";
import MenuComponent from "../components/menu.component";
import { bootConfig } from "../../utils/configs";

export default class RegularGame extends SharedGame {
  protected _app: App;
  declare protected _background: PIXI.Sprite;
  declare protected _menu: MenuComponent;

  constructor(app: App) {
    super(app);
    this._app = app;

    this.create();
  }

  protected create(): void {
    this._background = new PIXI.Sprite(
      AssetLoader.getInstance().getTexture("backgroundRegular"),
    );
    this._background.name = bootConfig.assets.backgroundRegular.name;

    this.addChild(this._background);

    this._menu = new MenuComponent();
    this.addChild(this._menu);

    console.log("RegularGame created");

    this.draw();
  }

  public draw(): void {
    super.draw();
  }
}
