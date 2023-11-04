/** Representing bottle statusbar.
 * @extends StatusBar
 */
class BottleStatusbar extends StatusBar {
    /** Create new Bottle statusbar.
     * @param {number} currentValue - Initial value to set to statusbar to.
     * @param {number} capacity - Maximum value for statusbar.
     * Calls super function to set images for various statusbar states and currentValue and capacity.
     * Sets initial image and y position. 
     */
    constructor(currentValue, capacity) {
        super([
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
        ],
        currentValue,
        capacity);
        this.y = 40;
        this.loadImage(this.IMAGES_STATUSBAR[this.resolveImgIndex()]);
    }
}