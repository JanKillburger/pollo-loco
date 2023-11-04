/** Represents statusbar
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    currentValue = 100;
    capacity;
    IMAGES_STATUSBAR;

    /** Create statusbar
     * @param {string[]} images - Array containing images
     * @param {number} currentValue - Initial value to set statusbar to.
     * @param {number} capacity - Maximum value for statusbar.
     */
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

    /** Set percentage property of statusbar.
     * @param {number} currentValue - Value to set statusbar to.
     * Sets status bar to currentValue and updates statusbar img if necessary.
     */
    setPercentage(currentValue) {
        this.currentValue = currentValue;
        this.img = this.imageCache[this.IMAGES_STATUSBAR[this.resolveImgIndex()]];
    }

    /** Resolve image index.
     * Statusbar images show linearly increasing fills.
     * Division of currentvalue and capacity is between 0 and 1.
     * This is multiplied by the (number of images - 1) and rounded to an integer to get a valid index value.
     * @returns calculated img index
     */
    resolveImgIndex() {
        return Math.round(this.currentValue / this.capacity * (this.IMAGES_STATUSBAR.length - 1));
    }
}