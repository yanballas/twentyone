import * as PIXI from "pixi.js";
import { BASE_HEIGHT, BASE_WIDTH } from "../../utils/constants";

export class RegularGame extends PIXI.Container {

  constructor() {
    super();

    this.create();
    this.setLocation();
  }

  protected create(): void {
    console.log("RegularGame created");
  }

  protected setLocation(): void {
    this.position.set(BASE_WIDTH / 2, BASE_HEIGHT / 2);
    this.pivot.set(this.width / 2, this.height / 2);
  }
}
