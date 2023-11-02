class CoinStatusbar extends StatusBar {
    constructor(currentValue, capacity) {
        super([
            './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
        ],
        currentValue,
        capacity);
        this.y = 70;
        this.loadImage(this.IMAGES_STATUSBAR[this.resolveImgIndex()]);
    }
}