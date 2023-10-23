class Coin extends CollectableObject {
    constructor(xRange, yRange) {
        super(xRange, yRange).loadImage('../img/8_coin/coin_1.png');
        this.height = 300 * globalScaleFactor;
        this.width = 301 * globalScaleFactor;
    }
}