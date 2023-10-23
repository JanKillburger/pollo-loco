class StatusBar extends DrawableObject {
    currentValue = 100;
    capacity;
    IMAGES_STATUSBAR;
    constructor(images, currentValue, capacity) {
        super();
        this.IMAGES_STATUSBAR = images;
        this.loadImages(images);
        this.height = 158 * globalScaleFactor;
        this.width = 595 * globalScaleFactor;
        this.x = 20;
        this.currentValue = currentValue;
        this.capacity = capacity;
        this.loadImage(this.IMAGES_STATUSBAR[this.resolveImgIndex()]);
    }

    setPercentage(currentValue) {
        this.currentValue = currentValue;
        this.img = this.imageCache[this.IMAGES_STATUSBAR[this.resolveImgIndex()]];
    }

    resolveImgIndex() {
        return Math.round(this.currentValue / this.capacity * (this.IMAGES_STATUSBAR.length - 1));
    }
}