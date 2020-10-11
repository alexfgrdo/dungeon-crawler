import Phaser from 'phaser';

import { Game } from './scenes';

const CONFIG: Object = {
	type: Phaser.AUTO,
	width: 400,
	height: 250,
	scale: { zoom: 2 },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true,
		},
	},
	scene: [Game],
};

export default new Phaser.Game(CONFIG);
