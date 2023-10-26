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

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    setImage(array, key) {
        this.img.src = array[key];
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    getOffset(side) {
        if ((side === 'left' || side === 'right') && this.oppositeDirection) {
            return side === 'left' ? this.offset.right : this.offset.left;
        } else {
            return this.offset[side];
        }
    }
}