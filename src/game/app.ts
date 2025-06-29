import * as PIXI from "pixi.js";

import { appConfig } from "../utils/configs.ts";
import { resize } from "../utils/resize";

import BootGame from "./stages/boot.game.ts";
import RegularGame from "./stages/regular.game.ts";

declare global {
    var __PIXI_APP__: App; // eslint-disable-line no-var
}

export class App extends PIXI.Application {
    protected rootContainer: HTMLDivElement;
    declare protected _bootScene: BootGame;
    declare protected _regularScene: RegularGame | null;
    public readonly ROOT_SCENE_NAME: string = "app";

    constructor() {
        super(appConfig);
        this.rootContainer = document.getElementById("app") as HTMLDivElement;
        this.stage.name = this.ROOT_SCENE_NAME;
        this._regularScene = null;

        this.rootContainer.appendChild(this.view);

        this.init();
        this.setupEventListeners();
    }

    protected init(): void {
        globalThis.__PIXI_APP__ = this;

        try {
            this._bootScene = new BootGame(this);
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            }
            throw new Error('error initial bootScene'); // Для неизвестных типов ошибок
        }
    }

    public startGame(): void {
        this._regularScene = new RegularGame();
        this.stage.addChild(this._regularScene);
        console.log("changeScene");
    }

    protected setupEventListeners(): void {
        window.addEventListener("resize", () => resize(this));
        resize(this);
    }
}
