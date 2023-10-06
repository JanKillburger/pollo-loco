class MovableObject {
    x = 200;
    y = 280;
    img;
    height = 150;
    width = 100;
    speed = 0.05;
    imageCache = [];
    currentImage = 0;
    oppositeDirection = false;
    speedY = 0;
    accelerationY = 2.5;

    isAboveGround() {
        return this.y < 150;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY < 0) {
                this.y += this.speedY;
                this.speedY += this.accelerationY;
            }
        }, 1000 / 25);
    }

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

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}