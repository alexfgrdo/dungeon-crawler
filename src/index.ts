import Phaser from 'phaser';

import { GAME_WIDTH, GAME_HEIGHT, GAME_ZOOM, GAME_GRAVITY } from './utils';

import { Game } from './scenes';

const CONFIG: Object = {
	type: Phaser.AUTO,
	width: GAME_WIDTH,
	height: GAME_HEIGHT,
	scale: { zoom: GAME_ZOOM },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: GAME_GRAVITY },
			debug: true,
		},
	},
	scene: [Game],
};

export default new Phaser.Game(CONFIG);
