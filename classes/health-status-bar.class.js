/** Represents HealthStatusbar
 * @extends StatusBar
 */
class HealthStatusbar extends StatusBar {
    /** Creates health status bar. */
    constructor(currentValue, capacity) {
        super([
            './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
        ],
        currentValue,
        capacity);
        this.y = 10;
    }
}