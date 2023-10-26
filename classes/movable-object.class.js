class MovableObject extends DrawableObject {
    speed = 0.05;
    oppositeDirection = false;
    speedY = 0;
    accelerationY = 6;
    energy = 100;
    lastHit = 0;
    currentImage = 0;
    animationInterval;
    damage = 5;

    isAboveGround() {
        return this.y + this.height < groundLevel;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY < 0 || this instanceof ThrowableObject || (this instanceof Endboss && this.isDead())) {
                this.y = Math.min(this.y + this.speedY, groundLevel - this.height);
                if (this.y == groundLevel - this.height) {
                    this.speedY = 0;
                } else {
                    this.speedY += this.accelerationY;
                }
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
        this.speedY = -40;
    }

    isColliding(obj) {
        return (this.x + this.width - this.getOffset('right')) >= obj.x + obj.getOffset('left') && this.x + this.getOffset('left') <= (obj.x + obj.width - obj.getOffset('right')) &&
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)

    }

    isHit() {
        this.energy -= this.damage;
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
        return timePassed < 1;
    }
}