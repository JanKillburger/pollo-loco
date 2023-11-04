/** Represents a collectable coin.
 * @extends CollectableObject
 */
class Coin extends CollectableObject {
    /** Create a collectable coin.
     * Setting image and sound and size and offset.
     */
    constructor(xStart, xRange, yStart, yRange) {
        super(xStart, xRange, yStart, yRange).loadImage('./img/8_coin/coin_1.png');
        this.height = 300 * globalScaleFactor;
        this.width = 301 * globalScaleFactor;
        this.offset = {top: 20, right: 20, bottom: 20, left: 20};
        this.collectingCoinSound = new Audio('./audio/cashRegister.mp3');
    }
}