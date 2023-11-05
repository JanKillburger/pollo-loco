/** Class representing the world (environment) of the game. */
class World {
    canvas;
    keyboard;
    ctx;
    level = initLevel1();
    cameraX = 0;
    throwableObjects = [];
    availableBottles = 6;
    availableCoins = 0;
    sounds = [];
    lastThrowDate = new Date();
    endboss = this.level.enemies[this.level.enemies.length - 1];
    /** Create the world.
     * @param {HTMLCanvasElement} canvas - canvas element to draw the game in.
     * @param {object} keyboard - Can be used to check which controls (keyboard or touchscreen) are currently enabled/disabled.
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.character = new Character(this);
        this.statusBarHealth = new HealthStatusbar(100, 100);
        this.statusBarEndboss = new EndbossStatusbar(100, 100);
        this.statusBarBottles = new BottleStatusbar(this.availableBottles, 6);
        this.statusBarCoins = new CoinStatusbar(this.availableCoins, 10);
        this.draw();
        this.checkGameEvents();
        this.checkThrows();
    }

    /** Draw the canvas for each screen refresh.
     * Adds all the elements to the canvas and calls the requestAnimationFrame method with this function as argument.
     * Effectively this function is calling itself for each screen refresh.
     */
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
        this.statusBarEndboss.draw(this.ctx);
        this.statusBarBottles.draw(this.ctx);
        this.statusBarCoins.draw(this.ctx);
        let self = this;
        requestAnimationFrame(function () { self.draw() });
    }

    /** Check game events: collisions, throws, collections. Sets interval to constantly detect events. */
    checkGameEvents() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrows();
            this.checkCollections();
            this.checkEndbossAttack();
        }, globalMotionInterval);
    }

    /** Check collisions.
     * Loops through enemies array of level object:
     * 1. checks if character is about to crush the enemy
     * 2. upon collision of enemy with character: checks if enemy is crushed by character, otherwise character is hit by enemy.
     * 3. checks for all throwable objects (bottles flying right now) if they are colliding with the enemy or groundLevel
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.character.checkCrushingCourse(enemy);
            this.handleCharacterCollision(enemy);
            this.throwableObjects.forEach((tO) => {
                if (tO.isColliding(enemy) && !enemy.isDead() && !tO.isDead()) {
                    this.destroyBottle(tO);
                    this.handleEnemyDamage(enemy, tO.damage);
                } else if (tO.y + tO.height - tO.offset.bottom >= groundLevel && !tO.isDead()) {
                    this.destroyBottle(tO);
                }
            })
        })
    }

    /** Hits enemy. If enemy is Endboss it updates the endboss statusbar.
     * @param {object} enemy - Enemy being hit (Chicken, small chicken or Endboss)
     * @param {number} damage - Damage to decrease enemy's energy by.
     */
    handleEnemyDamage(enemy, damage) {
        enemy.isHit(damage);
        if (enemy instanceof Endboss) {
            this.statusBarEndboss.setPercentage(enemy.energy);
        }
    }

    /** Handle character collision.
     * Differentiates between character jumping on enemy and enemy hitting character.
     * @param {object} enemy - Enemy colliding with character.
     */
    handleCharacterCollision(enemy) {
        if (this.character.isCrushingEnemy(enemy) && !enemy.isDead()) {
            enemy.isHit(this.character.damage);
        }
        else if (this.character.isColliding(enemy) && !this.character.isDead() && !enemy.isDead()) {
            this.character.isHit(enemy.damage);
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    /** Destroy throwable Object (bottle).
     * Plays crash sound, sets energy to zero and sets timeout to remove throwable Object from throwableObjects array after destruction.
     * @param {object} tO - throwable Object (bottle) to be destroyed.
     */
    destroyBottle(tO) {
        playSound(tO.bottleCrash);
        tO.isHit(tO.energy);
        setTimeout(() => {
            this.throwableObjects.splice(this.throwableObjects.indexOf(tO), 1)
        }, 600);
    }

    /** Check if bottle needs to be thrown.
     * Required: control is being pressed, another bottle is available and last throw dates back at least 500ms.
     * Sets lastThrowDate for next check.
     * Creates new ThrowableObject and decrements the available bottles and updates statusbar.
     */
    checkThrows() {
        if (this.keyboard.D && this.availableBottles > 0 && new Date() - this.lastThrowDate > 500) {
            this.lastThrowDate = new Date();
            const bottle = new ThrowableObject(this.character.x, this.character.oppositeDirection ? -1 : 1, this.character.y);
            this.character.resetIdleState();
            this.throwableObjects.push(bottle);
            this.availableBottles--;
            this.statusBarBottles.setPercentage(this.availableBottles);
        }
    }

    /** Check collections of collectable items (coins, bottles):
     * Checks collision of character with all collectable items and removes them from the collectableObjects array.
     * Required: sufficient capacity for another item.
     * Collects item.
     */
    checkCollections() {
        this.level.collectableObjects.forEach((cO) => {
            let isCollected = false;
            if (this.character.isColliding(cO)) {
                if (cO instanceof Coin && this.availableCoins < this.statusBarCoins.capacity) {
                    this.collectCoin(cO);
                    isCollected = true;
                } else if (cO instanceof Bottle && this.availableBottles < this.statusBarBottles.capacity) {
                    this.collectBottle(cO);
                    isCollected = true;
                }
                if (isCollected) { this.level.collectableObjects.splice(this.level.collectableObjects.indexOf(cO), 1); }
            }
        })
    }

    /** Check distance of character to endboss.
     * Triggers attack of endboss on character if distance falls below defined threshold
     */
    checkEndbossAttack() {
        if (this.endboss.x - this.character.x < 350 && !this.endboss.isAttackingGlobal) {
            this.endboss.startAttack(this.character.x);
            this.level.collectableObjects.push(new Bottle(this.endboss.x, 0, groundLevel - 100, 0));
        }
    }

    /** Collect coin.
     * Increments available Coins.
     * Updates coin statusbar.
     * Plays coin collection sound.
     */
    collectCoin(cO) {
        this.availableCoins++;
        this.statusBarCoins.setPercentage(this.availableCoins);
        playSound(cO.collectingCoinSound);
    }

    /** Collect bottle.
     * Increments available bottles.
     * Updates bottle statusbar.
     * Plays bottle collection sound.
     */
    collectBottle(cO) {
        this.availableBottles++;
        this.statusBarBottles.setPercentage(this.availableBottles);
        playSound(cO.collectingBottleSound);
    }

    /** Call addToMap function for objects array.
     * @param {object[]} objects - Array of objects to be drawn on to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o))
    }

    /** Draw movable Object to map.
     * @param {object} mo - Movable object to be drawn.
     * @param {boolean} mo.oppositeDirection - True for default direction (e.g. Pepe looking to the right), otherwise false.
     * Flips (mirrors) image if required.
     */
    addToMap(mo) {
        if (mo.oppositeDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.oppositeDirection) {
            this.flipImageBack(mo);
        }
    }

    /** Flips image by manipulating the canvas context
     * @param {object} mo - Movable object.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }

    /** Restores canvas after manipulation for flipping image
     * @param {object} mo - Movable object.
    */
    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }
}