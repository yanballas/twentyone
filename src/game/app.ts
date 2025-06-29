import * as PIXI from "pixi.js";

import { appConfig } from "../utils/appConfig";
import { resize } from "../utils/resize";
import { RegularGame } from "./stages/regular.game";

declare global {
    var __PIXI_APP__: App; // eslint-disable-line no-var
}

export class App extends PIXI.Application {
    protected rootContainer: HTMLDivElement;
    declare protected _regularGame: RegularGame;
    public readonly ROOT_SCENE_NAME: string = "app";

    constructor() {
        super(appConfig);
        this.rootContainer = document.getElementById("app") as HTMLDivElement;
        this.stage.name = this.ROOT_SCENE_NAME;

        this.rootContainer.appendChild(this.view);

        this.init();
        this.setupEventListeners();
    }

    protected init(): void {
        globalThis.__PIXI_APP__ = this;

        this._regularGame = new RegularGame();
        this.stage.addChild(this._regularGame);
    }

    protected setupEventListeners(): void {
        window.addEventListener("resize", () => resize(this));
        resize(this);
    }
}
