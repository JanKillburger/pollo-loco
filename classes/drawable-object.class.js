class DrawableObject {
    x = 200;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = [];

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    setImage(array, key) {
        this.img.src = array[key];
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
}