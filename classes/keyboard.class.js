/** Represents Keyboard.
 * Provides information on which control is active.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /** Creates Keyboard */
    constructor() {
        this.addMobileControlsEvents();
    }

    /** Represents pressing a key, setting the respective property to true.
     * @param {object} key - Key that has been pressed by the user.
     */
    pressKey(key) {
        switch (key) {
            case 'ArrowLeft':
                this.LEFT = true;
                break;
            case 'ArrowRight':
                this.RIGHT = true;
                break;
            case 'ArrowUp':
                this.UP = true;
                break;
            case 'ArrowDown':
                this.DOWN = true;
                break;
            case ' ':
                this.SPACE = true;
                break;
            case 'd':
                this.D = true;
                break;
        }
    }

    /** Represents releasinga a key, setting the respective property to false.
     * @param {object} key - Key that has been released by the user.
     */
    releaseKey(key) {
        switch (key) {
            case 'ArrowLeft':
                this.LEFT = false;
                break;
            case 'ArrowRight':
                this.RIGHT = false;
                break;
            case 'ArrowUp':
                this.UP = false;
                break;
            case 'ArrowDown':
                this.DOWN = false;
                break;
            case ' ':
                this.SPACE = false;
                break;
            case 'd':
                this.D = false;
                break;
        }
    }

    /** Adds equivalent event listeners to the mobile controls to set the properties in the same way as with a keyboard. */
    addMobileControlsEvents() {
        document.getElementById('mobile-left').addEventListener('touchstart', (ev) => {
            ev.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('mobile-left').addEventListener('touchend', (ev) => {
            ev.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('mobile-right').addEventListener('touchstart', (ev) => {
            ev.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('mobile-right').addEventListener('touchend', (ev) => {
            ev.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('mobile-jump').addEventListener('touchstart', (ev) => {
            ev.preventDefault();
            this.UP = true;
        });
        document.getElementById('mobile-jump').addEventListener('touchend', (ev) => {
            ev.preventDefault();
            this.UP = false;
        });
        document.getElementById('mobile-throw').addEventListener('touchstart', (ev) => {
            ev.preventDefault();
            this.D = true;
        });
        document.getElementById('mobile-throw').addEventListener('touchend', (ev) => {
            ev.preventDefault();
            this.D = false;
        });
    }
}