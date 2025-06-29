import * as PIXI from "pixi.js";
import type { IAssetResources } from "./interface";

export default class AssetLoader {
  protected static _instance: AssetLoader;
  protected _loader: PIXI.Loader = PIXI.Loader.shared;

  public static getInstance(): AssetLoader {
    if (!AssetLoader._instance) {
      AssetLoader._instance = new AssetLoader();
    }
    return AssetLoader._instance;
  }

  public loadAssets(assets: IAssetResources): Promise<void> {
    return new Promise((resolve, reject) => {
      this._loader.reset();

      Object.values(assets).forEach((asset) => {
        this._loader.add(asset.name, asset.url);
      });

      this._loader.load((_, resources) => {
        try {
          Object.keys(resources).forEach((name) => {
            const resource = resources[name];
            if (resource.texture) {
              PIXI.utils.TextureCache[name] = resource.texture;
            }
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      this._loader.onError.add((error) => {
        reject(error);
      });
    });
  }

  public getTexture(name: string): PIXI.Texture {
    const texture = PIXI.utils.TextureCache[name];
    if (!texture) {
      throw new Error(`Texture ${name} not found in cache`);
    }
    return texture;
  }
}
