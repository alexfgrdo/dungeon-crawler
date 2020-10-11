import Phaser from 'phaser';

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
};

export default new Phaser.Game(CONFIG);
