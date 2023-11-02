class Coin extends CollectableObject {
    constructor(xStart, xRange, yStart, yRange) {
        super(xStart, xRange, yStart, yRange).loadImage('./img/8_coin/coin_1.png');
        this.height = 300 * globalScaleFactor;
        this.width = 301 * globalScaleFactor;
        this.offset = {top: 20, right: 20, bottom: 20, left: 20};
    }
}