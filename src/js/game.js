import '../css/style.css'
import {Actor, DisplayMode, Engine, Screen, Vector} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {Fish} from "./fish.js";
import {Ui} from "./ui.js";

export class Game extends Engine {

    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
             displayMode: DisplayMode.FillScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        this.add(new Ui())

        for (let i = 0; i < 50; i++) {
            this.add(new Fish(
                Math.random() * (this.drawWidth - 50) + 50,
                Math.random() * (this.drawHeight - 50) + 50
            ))
        }
    }
}

new Game()
