class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    speed = 0.05;
    imageCache = [];
    currentImage = 0;
    oppositeDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60
        )
    }

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60
        )
    }
}