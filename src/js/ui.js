import {Actor, BaseAlign, Color, Font, FontStyle, Label, TextAlign, vec, Vector} from "excalibur";
import {Fish} from "./fish.js";

export class Ui extends Actor{

    score
    constructor() {
        super();


    }

    onInitialize(_engine) {

        const label = new Label({
            pos: new Vector(_engine.drawWidth / 2, _engine.drawHeight - 80),
            text: "Prevent the fish to turn to the Darkside.\nClick on dark fish to kill them.",
            font: new Font({
                family: 'Poppins',
                // style: FontStyle.Italic,
                size: 40,
                strokeColor: Color.Black,
                lineWidth: 2,
                bold: true,
                color: Color.White,
                baseAlign: BaseAlign.Top,
                textAlign: TextAlign.Center
            })
        })
        _engine.add(label)

        this.score = new Label({
            pos: new Vector(_engine.drawWidth - 50, 50),
            text: "Dark Fish: 10 (50)",
            font: new Font({
                family: 'Poppins',
                textAlign: TextAlign.Right,
                // style: FontStyle.Italic,
                size: 40,
                strokeColor: Color.Black,
                lineWidth: 2,
                bold: true,
                color: Color.White,
                baseAlign: BaseAlign.Top
            })
        })
        _engine.add(this.score)

    }

    onPostUpdate(_engine, _delta) {
        /**
         * @type {Fish[]}
         */
        const fish = _engine.currentScene.actors.filter(a => a instanceof Fish)
        console.log(fish)
        const darkFished = fish.filter(f => f.darkSide)


        this.score.text = `Dark Fish: ${darkFished.length} (${fish.length})`
    }
}