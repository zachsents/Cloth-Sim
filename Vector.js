export default class Vector {
    constructor(x = 0, y = 0) {
        this.mat = math.matrix([x, y])
    }

    x(set) {
        return set ? this.mat.set([0], set) : this.mat.get([0])
    }

    y(set) {
        return set ? this.mat.set([1], set) : this.mat.get([1])
    }

    clone() {
        return new Vector(this.mat.get([0]), this.mat.get([1]))
    }

    add(v) {
        this.mat = math.add(this.mat, v.mat)
        return this
    }

    sub(v) {
        this.mat = math.subtract(this.mat, v.mat)
        return this
    }

    scale(v) {
        this.mat = math.multiply(this.mat, typeof v === 'number' ? v : v.mat)
        return this
    }

    magnitude() {
        return math.norm(this.mat)
    }

    setMagnitude(mag) {
        this.scale(mag / math.norm(this.mat))
        return this
    }

    normalize() {
        this.setMagnitude(1)
        return this
    }

    invert() {
        this.scale(-1)
        return this
    }

    projectOn(v) {
        let unitVector = v.clone().normalize()
        let scalarProjection = math.dot(this.mat, unitVector.mat)
        return unitVector.setMagnitude(scalarProjection)
    }

    distance(v) {
        return math.distance(this.mat, v.mat)
    }

    zero() {
        this.mat = math.matrix([0, 0])
        return this
    }
}