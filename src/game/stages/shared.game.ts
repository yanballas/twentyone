import * as PIXI from "pixi.js";
import type { App } from "../app";

export default class SharedGame extends PIXI.Container {
  protected _app: App;
  protected _background: PIXI.Sprite | null = null;

  constructor(app: App) {
    super();
    this._app = app;
    this._background = null;
    this.draw();
  }

  public draw(): void {
    this.scale.set(0.5);
    this.pivot.set(0.5);
  }
}
