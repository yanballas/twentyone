import * as PIXI from "pixi.js";
import deepmerge from  "deepmerge"

import type {IConfigBoot} from "../../utils/interface.ts";

import {bootConfig} from "../../utils/configs.ts";
import type {App} from "../app.ts";

export default class BootGame extends PIXI.Container {
    protected _app: App;
    protected _bootConfig: IConfigBoot;
    protected _background: PIXI.Sprite | null = null;

    constructor(app: App, incomeBootConfig?: IConfigBoot) {
        super();
        this._app = app;
        this._bootConfig = incomeBootConfig
            ? deepmerge(bootConfig, incomeBootConfig)
            : bootConfig;
        this.init();
    }

    protected init(): void {
        console.log("Boot created");
        this._app.startGame()
    }
}