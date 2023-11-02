class EndbossStatusbar extends StatusBar {
    constructor(currentValue, capacity) {
        super([
            './img/7_statusbars/2_statusbar_endboss/0.png',
            './img/7_statusbars/2_statusbar_endboss/20.png',
            './img/7_statusbars/2_statusbar_endboss/40.png',
            './img/7_statusbars/2_statusbar_endboss/60.png',
            './img/7_statusbars/2_statusbar_endboss/80.png',
            './img/7_statusbars/2_statusbar_endboss/100.png'
        ],
        currentValue,
        capacity);
        this.y = 10;
        this.x = 550;
    }
}