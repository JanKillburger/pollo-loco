class World {
    canvas;
    keyboard;
    ctx;
    level = level1;
    cameraX = 0;
    throwableObjects = [];
    availableBottles = 6;
    availableCoins = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.character = new Character(this);
        this.statusBarHealth = new HealthStatusbar(100, 100);
        this.statusBarBottles = new BottleStatusbar(this.availableBottles, 6);
        this.statusBarCoins = new CoinStatusbar(this.availableCoins, 10);
        this.draw();
        this.checkGameEvents();
        this.checkThrows();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.cameraX, 0);
        this.statusBarHealth.draw(this.ctx);
        this.statusBarBottles.draw(this.ctx);
        this.statusBarCoins.draw(this.ctx);
        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () { self.draw() });
    }

    checkGameEvents() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrows();
            this.checkCollections();
        }, globalMotionInterval);
    }

    checkCollisions() {
        //checks collisions of enemies with character
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCrushingEnemy(enemy) && !enemy.isDead()) {
                enemy.isHit();
                this.character
            } else if (this.character.isColliding(enemy) && this.character.energy > 0 && !enemy.isDead()) {
                this.character.isHit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
            this.character.checkCrushingCourse(enemy);
            //checks collisions of bottles with current enemy instance
            this.throwableObjects.forEach((tO) => {
                if (tO.isColliding(enemy) && !enemy.isDead() && !tO.isDead()) {
                    enemy.isHit();
                    tO.isHit();
                    setTimeout(() => {
                        this.throwableObjects.splice(this.throwableObjects.indexOf(tO), 1)
                    }, 600);
                } else if (tO.y > 300 && !tO.isDead()) {
                    tO.isHit();
                    setTimeout(() => {
                        this.throwableObjects.splice(this.throwableObjects.indexOf(tO), 1)
                    }, 500);
                }
            })
        })
    }

    checkThrows() {
        if (this.keyboard.D && !this.character.isDead() && this.availableBottles > 0) {
            const bottle = new ThrowableObject(this.character.x, this.character.oppositeDirection ? -1 : 1, this.character.y);
            this.character.resetIdleState();
            this.throwableObjects.push(bottle);
            this.availableBottles--;
            this.statusBarBottles.setPercentage(this.availableBottles);
        }
    }

    checkCollections() {
        this.level.collectableObjects.forEach((cO) => {
            let isCollected = false;
            if (this.character.isColliding(cO)) {
                if (cO instanceof Coin && this.availableCoins < this.statusBarCoins.capacity) {
                    this.availableCoins++;
                    this.statusBarCoins.setPercentage(this.availableCoins);
                    isCollected = true;
                } else if (cO instanceof Bottle && this.availableBottles < this.statusBarBottles.capacity) {
                    this.availableBottles++;
                    this.statusBarBottles.setPercentage(this.availableBottles);
                    isCollected = true;
                }
                if (isCollected) {this.level.collectableObjects.splice(this.level.collectableObjects.indexOf(cO), 1);}
            }
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o))
    }

    addToMap(mo) {
        if (mo.oppositeDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.oppositeDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }

    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }


}