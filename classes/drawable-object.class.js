/** Represents drawable Object.
 * Defines default position, size and offset values and other properties.
 */
class DrawableObject {
    x = 200;
    y = 280;
    height = 150;
    width = 100;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    img;
    imageCache = [];

    /** Load image
     * @param {string} path - Relative path to img file.
     * Creates new Image object, assigns the provided path and assigns it to the img.src property.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /** Set image
     * @param {Array} array - Image array to select img from.
     * @param {string} key - Key to use for array.
     */
    setImage(array, key) {
        this.img.src = array[key];
    }

    /** Draw frame.
     * Helper function to visualize size and offset of objects for collision detection
     * @param {object} ctx - Context to draw in.
     */
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
    }

    /** Draw.
     * @param {object} ctx - Canvas context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /** Load images
     * @param {string[]} arr - Contains relative paths to images to load.
     * Gets images and stores them with path as key in the imageCache array.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /** Get offset
     * @param {string} side - Side of the object.
     * @returns the offset of the requested side.
     * Takes into account the flipping/mirroring of images when returning the right/left offset.  
     */
    getOffset(side) {
        if ((side === 'left' || side === 'right') && this.oppositeDirection) {
            return side === 'left' ? this.offset.right : this.offset.left;
        } else {
            return this.offset[side];
        }
    }
}