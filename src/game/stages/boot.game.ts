import * as PIXI from "pixi.js";
import deepmerge from "deepmerge";

import type { IConfigBoot } from "../../utils/interface.ts";
import { bootConfig } from "../../utils/configs.ts";
import type { App } from "../app.ts";

import AssetLoader from "../../utils/assets.ts";

import SharedGame from "./shared.game";

export default class BootGame extends SharedGame {
  protected _bootConfig: IConfigBoot;
  protected _assetLoader: AssetLoader;
  protected _backgroundBoot: PIXI.Sprite | null = null;

  constructor(app: App, incomeBootConfig?: IConfigBoot) {
    super(app);
    this._bootConfig = incomeBootConfig
      ? deepmerge(bootConfig, incomeBootConfig)
      : bootConfig;
    this._assetLoader = AssetLoader.getInstance();
    this.init();
  }

  protected async _loadAssets(): Promise<void> {
    try {
      await this._assetLoader.loadAssets(this._bootConfig.assets);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to load assets:", error.message);
      } else {
        console.error("Failed to load assets:", error);
      }
    }
  }

  protected async init(): Promise<void> {
    await this._loadAssets();
    console.log("Boot created");
    this._app.startGame();
  }
}
