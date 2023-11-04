/** Represents cloud.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    /** Creates cloud, setting img, position. */
    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /** Moves cloud to the left. */
    animate() {
        this.moveLeft();
    }
}