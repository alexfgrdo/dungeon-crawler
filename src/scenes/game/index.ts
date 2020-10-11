import Phaser from 'phaser';

import '../../player';
import Player, { setPlayerAnimations } from '../../player';
import Enemy, { setEnemyAnimations } from '../../enemy';

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
		// Load animations animations
		setPlayerAnimations(this.anims);
		setEnemyAnimations(this.anims);

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

		//
		// Add enemies to the world
		const enemies = this.physics.add.group({
			classType: Enemy,
			createCallback: (go) => {
				const enemyGo = go as Enemy;
				enemyGo.body.onCollide = true;
			},
		});

		//
		// Position and collisions for enemy
		enemies.get(256, 256, 'enemy');
		this.physics.add.collider(enemies, walls);
	}

	update(t: number, dt: number) {
		//
		// Allow direction in the scene for the player
		if (this.player) {
			this.player.update(this.keys);
		}
	}
}
