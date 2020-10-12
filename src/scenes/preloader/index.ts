import Phaser from 'phaser';

import { GAME_URL } from '../../utils';

export default class Preloader extends Phaser.Scene {
	constructor() {
		super('preloader');
	}

	preload() {
		this.load.setBaseURL(GAME_URL);

		//
		// Load tilemap assets
		this.load.image('tiles', 'tileset/tileset_extruded.png');
		this.load.tilemapTiledJSON('tileset', 'tileset/tileset.json');

		//
		// Load player assets
		this.load.atlas('player', 'player/player.png', 'player/player.json');

		//
		// Load player assets
		this.load.atlas('enemy', 'enemy/enemy.png', 'enemy/enemy.json');

		//
		// Load interface assets
		this.load.image('heart-full', 'interface/heart_full.png');
		this.load.image('heart-empty', 'interface/heart_empty.png');

		//
		// Load interface assets
		this.load.image('knife', 'knife/knife.png');
	}

	create() {
		this.scene.start('game');
	}
}
