/** Creates a new Level object.
 * @returns {object} Level 1 object
 */
function initLevel1() {
    return new Level(
        [
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],
        [
            new Cloud()
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3)
        ],
        719 * 3,
        [
            new Coin(0, 1800, 100, 150),
            new Bottle(0, 1800, 100, 150),
            new Coin(0, 1800, 100, 150),
            new Bottle(0, 1800, 100, 150),
            new Coin(0, 1800, 100, 150),
            new Bottle(0, 1800, 100, 150),
            new Coin(0, 1800, 100, 150),
            new Bottle(0, 1800, 100, 150),
            new Coin(0, 1800, 100, 150),
            new Bottle(0, 1800, 100, 150),
            new Coin(0, 1800, 100, 150),
            new Bottle(0, 1800, 100, 150)
        ]
    );
}