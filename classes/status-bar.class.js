class StatusBar extends DrawableObject {
    percentage = 100;
    IMAGES_HEALTH = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES_HEALTH);
        this.loadImage(this.IMAGES_HEALTH[5]);
        this.height = 158 * globalScaleFactor;
        this.width = 595 * globalScaleFactor;
        this.x = 20;
        this.y = 20;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        this.img = this.imageCache[this.IMAGES_HEALTH[this.resolveImgIndex()]];
    }

    resolveImgIndex() {
        return Math.round(this.percentage / 20);
    }
}