class BackgroundObject extends MovableObject {
    width = canvas.width;
    height = canvas.height;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = canvas.height - this.height;
    }
}