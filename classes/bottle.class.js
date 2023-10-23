class Bottle extends CollectableObject {
    constructor(xRange, yRange) {
        super(xRange, yRange).loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.height = 400 * globalScaleFactor;
        this.width = 400 * globalScaleFactor;
    }
}