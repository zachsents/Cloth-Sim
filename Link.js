/*
*   Damped spring constraint between point masses
*/
export default class Link {
    constructor({nodeA, nodeB, length = 1, springConstant = 0.5, dampingConstant = 1}) {
        this.nodeA = nodeA
        this.nodeB = nodeB

        this.length = length
        this.springConstant = springConstant
        this.dampingConstant = dampingConstant

        this.id = 'link-' + window.id++

        // attach this object to linked Nodes
        this.nodeA.links.push(this)
        this.nodeB.links.push(this)
    }

    calculateForce() {
        let displacement = this.nodeA.pos.distance(this.nodeB.pos) - this.length
        let direction = this.nodeB.pos.clone().sub(this.nodeA.pos).normalize()

        // Node A: damping force
        this.nodeA.applyForce(
            this.nodeA.vel.clone().projectOn(direction).scale(-this.dampingConstant)
        )
        // Node A: spring force
        this.nodeA.applyForce(
            direction.clone().setMagnitude(displacement * this.springConstant)
        )
        // Node B: damping force
        this.nodeB.applyForce(
            this.nodeB.vel.clone().projectOn(direction).invert().scale(-this.dampingConstant)
        )
        // Node B: spring force
        this.nodeB.applyForce(
            direction.clone().invert().setMagnitude(displacement * this.springConstant)
        )
    }
}