import Phaser from 'phaser';

import '../../player';
import Player, { setPlayerAnimation } from '../../player';

export default class Game extends Phaser.Scene {
	private keys!: Phaser.Types.Input.Keyboard.CursorKeys;
	private player!: Player;

	constructor() {
		super('game');
	}

	preload() {
		//
		// Keyboard inputs creation
		this.keys = this.input.keyboard.createCursorKeys();
	}
	create() {
		//
		// Load player animations
		setPlayerAnimation(this.anims);

		//
		// Tileset creation
		const tilemap = this.make.tilemap({ key: 'tileset' });
		const tileset = tilemap.addTilesetImage('tileset', 'tiles', 16, 16, 1, 2);

		//
		// Show layers
		tilemap.createStaticLayer('Ground', tileset);
		const walls = tilemap.createStaticLayer('Walls', tileset);

		//
		// Set walls collision
		walls.setCollisionByProperty({ collider: true });

		//
		// Add player to the scene, this collision and camera
		this.player = this.add.player(128, 128, 'player');
		this.physics.add.collider(this.player, walls);
		this.cameras.main.startFollow(this.player, true);
	}

	update(t: number, dt: number) {
		//
		// Allow direction in the scene for the player
		if (this.player) {
			this.player.update(this.keys);
		}
	}
}
