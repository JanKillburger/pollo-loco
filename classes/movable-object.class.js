class MovableObject extends DrawableObject {
    speed = 0.05;
    oppositeDirection = false;
    speedY = 0;
    accelerationY = 6;
    energy = 100;
    lastHit = 0;
    currentImage = 0;
    animationInterval;

    isAboveGround() {
        return this.y < 150;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY < 0 || this instanceof ThrowableObject || (this instanceof Endboss && this.isDead())) {
                this.y += this.speedY;
                this.speedY += this.accelerationY;
            }
        }, globalMotionInterval);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    jump() {
        this.currentImage = 0; //ensures that jumping animation is played from the first image of the array
        this.speedY = -60;
    }

    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y /*+ this.offsetY*/ + this.height) >= obj.y &&
            (this.y /*+ this.offsetY*/) <= (obj.y + obj.height) //&&
        //obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    }

    isHit() {
        this.energy -= 5; 
        if (this.energy <= 0) {
            this.energy = 0;
            this.currentImage = 0; //ensures that dying animation is played from the first image of the array
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1000;
        return timePassed < 1 ;
    }
}