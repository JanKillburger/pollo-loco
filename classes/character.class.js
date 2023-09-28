class Character extends MovableObject {
y = 150;
height = 1200 * globalScaleFactor;
width = this.height / 1.97;//1,97 is aspect ratio of img being used
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
    }

    jump() {

    }
}