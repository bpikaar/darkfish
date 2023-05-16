import {Actor, Color, Random, Resource, Timer, Vector} from "excalibur";
import {Resources} from "./resources.js";

export class Virus extends Actor {
    sprite
    darkSide

    turnDark() {
        this.sprite = this.graphics.use(Resources.VirusBad.toSprite())
        this.darkSide = true
    }

    constructor(posX, posY) {
        super({
                width: Resources.VirusGood.width,
                height: Resources.VirusGood.height
        });
        this.pos = new Vector(posX, posY)

        this.sprite = this.graphics.use(Resources.VirusGood.toSprite())
    }

    onInitialize(_engine) {
        let direction = new Vector(
            Math.random() < 0.5 ? -1 : 1,
            Math.random() < 0.5 ? -1 : 1
        )
        this.darkSide = Math.random() < 0.05
        if(this.darkSide) this.turnDark()

        this.vel = new Vector(
            Math.random() * 40 * direction.x,
            Math.random() * 40 * direction.y
        )
        if(direction.x > 0) {
            this.sprite.flipHorizontal = true
        }

        setTimeout(() => this.swimFast(), Math.random() * 4000 + 500)

        this.on("pointerdown", () => this.die())
        this.on("collisionstart", (event) => this.flip(event))
        this.on("exitviewport", () => this.returnToViewport(_engine))
    }

    die() {
       this.kill()
    }

    flip(event) {
        this.vel.x *= -1
        this.sprite.flipHorizontal = !this.sprite.flipHorizontal

        if(event.other instanceof  Virus) {
            if(event.other.darkSide && !this.darkSide) {
                this.turnDark()
            }
        }
    }

    swimFast() {
        this.vel = this.vel.scale(new Vector(5, 5))

        setTimeout(() => this.swimNormal(), Math.random() * 1500 + 500)
    }

    swimNormal() {
        this.vel = this.vel.scale(new Vector(1/5, 1/5))

        setTimeout(() => this.swimFast(), Math.random() * 4000 + 500)
    }

    returnToViewport(engine) {
        if(this.collider.bounds.right < 0) {
            this.pos.x = engine.drawWidth + this.width / 2
        }
        if(this.collider.bounds.right > engine.drawWidth) {
            this.pos.x = 0 - this.width / 2
        }
        if(this.collider.bounds.bottom < 0) {
            this.pos.y = engine.drawHeight + this.height / 2
        }
        if(this.collider.bounds.bottom > engine.drawHeight) {
            this.pos.y = 0 - this.height / 2
        }
    }
}