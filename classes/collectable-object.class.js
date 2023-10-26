class CollectableObject extends DrawableObject {
    constructor(xStart, xRange, yStart, yRange) {
        super();
        this.x = xStart + Math.random() * xRange;
        this.y = yStart + Math.random() * yRange;
    }
}