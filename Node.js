import Vector from "./Vector.js"

export default class Node {
    constructor({x = 0, y = 0, mass = 1, pinned = false}) {
        this.pos = new Vector(x, y)
        this.vel = new Vector(0, 0)
        this.acc = new Vector(0, 0)
        this.mass = mass

        this.pinned = pinned
        this.updatedYet = false
        this.links = []

        this.id = 'node-' + window.id++
    }

    applyForce(force) {
        let scaledForce = force.clone().scale(1 / this.mass)
        this.acc.add(scaledForce)
    }

    collapseVectors() {
        if(this.pinned)
            this.acc.zero()
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.zero()
    }
}