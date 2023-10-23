class CollectableObject extends DrawableObject {
    constructor(xRange, yRange) {
        super();
        this.x = Math.random() * xRange;
        this.y = Math.random() * yRange;
    }
}