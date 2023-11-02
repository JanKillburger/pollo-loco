class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    constructor() {
        this.addMobileControlsEvents();
    }
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