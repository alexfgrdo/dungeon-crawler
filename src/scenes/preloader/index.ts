import Phaser from 'phaser';

import { GAME_URL } from '../../utils';

export default class Preloader extends Phaser.Scene {
	constructor() {
		super('preloader');
	}

	preload() {
		this.load.setBaseURL(GAME_URL);

		//
		// Load tilemap
		this.load.image('tiles', 'tileset/tileset_extruded.png');
		this.load.tilemapTiledJSON('tileset', 'tileset/tileset.json');

		//
		// Load player
		this.load.atlas('player', 'player/player.png', 'player/player.json');

		//
		// Load player
		this.load.atlas('enemy', 'enemy/enemy.png', 'enemy/enemy.json');
	}

	create() {
		this.scene.start('game');
	}
}
