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
	}

	create() {
		this.scene.start('game');
	}
}
