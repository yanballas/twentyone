import * as PIXI from "pixi.js";
import deepmerge from "deepmerge";

import type { IAssetResources, IConfigBoot } from "../../utils/interface.ts";
import { bootConfig } from "../../utils/configs.ts";

export default class AssetLoader extends PIXI.Loader {
  protected static _instance: AssetLoader;

  protected _bootConfig: IConfigBoot;

  constructor(incomeBootConfig?: IConfigBoot) {
    super();
    this._bootConfig = incomeBootConfig
      ? deepmerge(bootConfig, incomeBootConfig)
      : bootConfig;
  }

  public static getInstance(incomeBootConfig?: IConfigBoot): AssetLoader {
    if (!AssetLoader._instance) {
      AssetLoader._instance = new AssetLoader(incomeBootConfig);
    }
    return AssetLoader._instance;
  }

  public loadAssets(assets: IAssetResources): Promise<void> {
    return new Promise((resolve, reject) => {
      this.reset();

      Object.values(assets).forEach((asset) => {
        if (!PIXI.utils.TextureCache[asset.name]) {
          this.add(asset.name, asset.url);
        }
      });

      this.load((_, resources) => {
        try {
          Object.keys(resources).forEach((name) => {
            const resource = resources[name];
            if (resource.texture && !PIXI.utils.TextureCache[name]) {
              PIXI.utils.TextureCache[name] = resource.texture;
            }
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      this.onError.add((error) => {
        reject(error);
      });
    });
  }

  public getTexture(name: string): PIXI.Texture {
    let texture = PIXI.utils.TextureCache[name];

    if (!texture) {
      const fullPath = Object.keys(PIXI.utils.TextureCache).find((key) =>
        key.includes(name),
      );
      if (fullPath) {
        texture = PIXI.utils.TextureCache[fullPath];
      }
    }

    if (!texture) {
      throw new Error(`Texture ${name} not found in cache`);
    }
    return texture;
  }

  protected async _loadAssets(): Promise<void> {
    try {
      await this.loadAssets(this._bootConfig.assets);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to load assets:", error.message);
      } else {
        console.error("Failed to load assets:", error);
      }
    }
  }

  public async init(): Promise<void> {
    await this._loadAssets();
    console.log("AssetLoader created");
  }
}
