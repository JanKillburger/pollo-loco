class Bottle extends CollectableObject {
    constructor(xStart, xRange, yStart, yRange) {
        super(xStart, xRange, yStart, yRange).loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.height = 400 * globalScaleFactor;
        this.width = 400 * globalScaleFactor;
        this.offset = {top: 10, right: 40, bottom: 10, left: 40};
        this.collectingBottleSound = new Audio('./audio/collectBottle.mp3');
    }
}