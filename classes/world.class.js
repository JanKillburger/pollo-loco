class World {
    canvas;
    keyboard;
    ctx;
    level = level1;
    cameraX = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.character = new Character(this);
        this.statusBarHealth = new StatusBar();
        this.draw();
        this.checkCollisions();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.cameraX, 0);
        this.statusBarHealth.draw(this.ctx);
        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () { self.draw() });
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach( (enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.isHit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            })
        }, 200);
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