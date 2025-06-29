export interface WindowSize {
  width: number;
  height: number;
}

export interface IAssetResource {
  url: string;
  name: string;
}

export interface IAssetResources {
  [key: string]: IAssetResource;
}

export interface IConfigBoot {
  assets: IAssetResources;
}
