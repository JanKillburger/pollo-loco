let globalScaleFactor = 0.23;
let globalMotionInterval = 100;
let nextAvailableObjectId = 1;
let groundLevel = 430;
const gameResources = [
    './img/5_background/layers/air.png',
    './img/5_background/layers/3_third_layer/2.png',
    './img/5_background/layers/2_second_layer/2.png',
    './img/5_background/layers/1_first_layer/2.png',
    './img/5_background/layers/air.png',
    './img/5_background/layers/3_third_layer/1.png',
    './img/5_background/layers/2_second_layer/1.png',
    './img/5_background/layers/1_first_layer/1.png',
    './img/5_background/layers/air.png',
    './img/5_background/layers/3_third_layer/2.png',
    './img/5_background/layers/2_second_layer/2.png',
    './img/5_background/layers/1_first_layer/2.png',
    './img/5_background/layers/air.png',
    './img/5_background/layers/3_third_layer/1.png',
    './img/5_background/layers/2_second_layer/1.png',
    './img/5_background/layers/1_first_layer/1.png',
    './img/5_background/layers/air.png',
    './img/5_background/layers/3_third_layer/2.png',
    './img/5_background/layers/2_second_layer/2.png',
    './img/5_background/layers/1_first_layer/2.png',
    './audio/collectBottle.mp3',
    './audio/dying.mp3',
    './audio/isHurt.mp3',
    './audio/jump.mp3',
    './audio/snoring.mp3',
    './audio/characterWalking.mp3',
    './audio/smallChickenAlarm.mp3',
    './audio/cashRegister.mp3',
    './audio/chickenScream.mp3',
    './audio/grillSound.mp3',
    './audio/smallChickenAlarm.mp3',
    './audio/bottleCrash.mp3',
    './img/arrow-up.png',
    './img/disable-fullscreen.png',
    './img/enable-fullscreen.png',
    './img/left-chevron.png',
    './img/mute-sounds.png',
    './img/right-chevron.png',
    './img/unmute-sounds.png',
    './img/wine-bottle.png',
    './img/2_character_pepe/1_idle/idle/I-10.png',
    './img/2_character_pepe/1_idle/idle/I-1.png',
    './img/2_character_pepe/1_idle/idle/I-2.png',
    './img/2_character_pepe/1_idle/idle/I-3.png',
    './img/2_character_pepe/1_idle/idle/I-4.png',
    './img/2_character_pepe/1_idle/idle/I-5.png',
    './img/2_character_pepe/1_idle/idle/I-6.png',
    './img/2_character_pepe/1_idle/idle/I-7.png',
    './img/2_character_pepe/1_idle/idle/I-8.png',
    './img/2_character_pepe/1_idle/idle/I-9.png',
    './img/2_character_pepe/1_idle/long_idle/I-11.png',
    './img/2_character_pepe/1_idle/long_idle/I-12.png',
    './img/2_character_pepe/1_idle/long_idle/I-13.png',
    './img/2_character_pepe/1_idle/long_idle/I-14.png',
    './img/2_character_pepe/1_idle/long_idle/I-15.png',
    './img/2_character_pepe/1_idle/long_idle/I-16.png',
    './img/2_character_pepe/1_idle/long_idle/I-17.png',
    './img/2_character_pepe/1_idle/long_idle/I-18.png',
    './img/2_character_pepe/1_idle/long_idle/I-19.png',
    './img/2_character_pepe/1_idle/long_idle/I-20.png',
    './img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png',
    './img/2_character_pepe/3_jump/J-31.png',
    './img/2_character_pepe/3_jump/J-32.png',
    './img/2_character_pepe/3_jump/J-33.png',
    './img/2_character_pepe/3_jump/J-34.png',
    './img/2_character_pepe/3_jump/J-35.png',
    './img/2_character_pepe/3_jump/J-36.png',
    './img/2_character_pepe/3_jump/J-37.png',
    './img/2_character_pepe/3_jump/J-38.png',
    './img/2_character_pepe/3_jump/J-39.png',
    './img/2_character_pepe/4_hurt/H-41.png',
    './img/2_character_pepe/4_hurt/H-42.png',
    './img/2_character_pepe/4_hurt/H-43.png',
    './img/2_character_pepe/5_dead/D-51.png',
    './img/2_character_pepe/5_dead/D-52.png',
    './img/2_character_pepe/5_dead/D-53.png',
    './img/2_character_pepe/5_dead/D-54.png',
    './img/2_character_pepe/5_dead/D-55.png',
    './img/2_character_pepe/5_dead/D-56.png',
    './img/2_character_pepe/5_dead/D-57.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    './img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    './img/4_enemie_boss_chicken/1_walk/G1.png',
    './img/4_enemie_boss_chicken/1_walk/G2.png',
    './img/4_enemie_boss_chicken/1_walk/G3.png',
    './img/4_enemie_boss_chicken/1_walk/G4.png',
    './img/4_enemie_boss_chicken/2_alert/G10.png',
    './img/4_enemie_boss_chicken/2_alert/G11.png',
    './img/4_enemie_boss_chicken/2_alert/G12.png',
    './img/4_enemie_boss_chicken/2_alert/G5.png',
    './img/4_enemie_boss_chicken/2_alert/G6.png',
    './img/4_enemie_boss_chicken/2_alert/G7.png',
    './img/4_enemie_boss_chicken/2_alert/G8.png',
    './img/4_enemie_boss_chicken/2_alert/G9.png',
    './img/4_enemie_boss_chicken/3_attack/G13.png',
    './img/4_enemie_boss_chicken/3_attack/G14.png',
    './img/4_enemie_boss_chicken/3_attack/G15.png',
    './img/4_enemie_boss_chicken/3_attack/G16.png',
    './img/4_enemie_boss_chicken/3_attack/G17.png',
    './img/4_enemie_boss_chicken/3_attack/G18.png',
    './img/4_enemie_boss_chicken/3_attack/G19.png',
    './img/4_enemie_boss_chicken/3_attack/G20.png',
    './img/4_enemie_boss_chicken/4_hurt/G21.png',
    './img/4_enemie_boss_chicken/4_hurt/G22.png',
    './img/4_enemie_boss_chicken/4_hurt/G23.png',
    './img/4_enemie_boss_chicken/5_dead/G24.png',
    './img/4_enemie_boss_chicken/5_dead/G25.png',
    './img/4_enemie_boss_chicken/5_dead/G26.png',
    './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    './img/6_salsa_bottle/salsa_bottle.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    './img/7_statusbars/2_statusbar_endboss/0.png',
    './img/7_statusbars/2_statusbar_endboss/100.png',
    './img/7_statusbars/2_statusbar_endboss/20.png',
    './img/7_statusbars/2_statusbar_endboss/40.png',
    './img/7_statusbars/2_statusbar_endboss/60.png',
    './img/7_statusbars/2_statusbar_endboss/80.png',
    './img/8_coin/coin_1.png',
    './img/8_coin/coin_2.png',
    './img/9_intro_outro_screens/game_over/game over.png',
    './img/9_intro_outro_screens/game_over/you lost.png',
    
]