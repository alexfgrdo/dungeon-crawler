import Phaser from 'phaser';

import { debugGraphics, sceneEvent } from '../../utils';

import '../../player';
import Player, { setPlayerAnimations } from '../../player';
import Enemy, { setEnemyAnimations } from '../../enemy';

export default class Game extends Phaser.Scene {
	private keys!: Phaser.Types.Input.Keyboard.CursorKeys;
	private player!: Player;
	private playerEnemyCollider?: Phaser.Physics.Arcade.Collider;

	private knives!: Phaser.Physics.Arcade.Group;
	private enemies!: Phaser.Physics.Arcade.Group;

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
		// Load interface
		this.scene.run('interface');

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
		this.cameras.main.startFollow(this.player, true);

		//
		// Add enemies to the world
		this.enemies = this.physics.add.group({
			classType: Enemy,
			createCallback: (go) => {
				const enemyGo = go as Enemy;
				enemyGo.body.onCollide = true;
			},
		});

		//
		// Position for enemies
		this.enemies.get(150, 150, 'enemy');
		this.enemies.get(200, 150, 'enemy');
		this.enemies.get(200, 250, 'enemy');
		this.enemies.get(225, 300, 'enemy');
		this.enemies.get(225, 300, 'enemy');
		this.enemies.get(225, 300, 'enemy');
		this.enemies.get(225, 300, 'enemy');
		this.enemies.get(225, 300, 'enemy');

		// Set player attack
		this.knives = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Image,
		});

		this.player.setKnives(this.knives);

		// Set collisions
		this.physics.add.collider(this.player, walls);
		this.physics.add.collider(this.enemies, walls);
		this.physics.add.collider(
			this.knives,
			walls,
			this.handleKnivesWallsCollision,
			undefined,
			this,
		);
		this.physics.add.collider(
			this.knives,
			this.enemies,
			this.handleKnivesEnemyCollision,
			undefined,
			this,
		);
		this.playerEnemyCollider = this.physics.add.collider(
			this.enemies,
			this.player,
			this.handlePlayerEnemyCollision,
			undefined,
			this,
		);

		//
		// Debug walls
		// debugGraphics(walls, this);
	}

	private handlePlayerEnemyCollision(
		a: Phaser.GameObjects.GameObject,
		b: Phaser.GameObjects.GameObject,
	) {
		const enemy = b as Enemy;

		//
		// Create expulsion animation
		const dx = this.player.x - enemy.x;
		const dy = this.player.y - enemy.y;
		const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
		this.player.handleDamage(dir);

		//
		// Send event
		sceneEvent.emit('player-health-changed', this.player.health);

		//
		// If player die, stop collision
		if (this.player.health <= 0) {
			this.playerEnemyCollider?.destroy;
		}
	}

	private handleKnivesEnemyCollision(
		a: Phaser.GameObjects.GameObject,
		b: Phaser.GameObjects.GameObject,
	) {
		this.knives.killAndHide(a);
		this.enemies.killAndHide(b);
	}

	private handleKnivesWallsCollision(
		a: Phaser.GameObjects.GameObject,
		b: Phaser.GameObjects.GameObject,
	) {
		this.knives.killAndHide(a);
	}

	update(t: number, dt: number) {
		//
		// Allow direction in the scene for the player
		if (this.player) {
			this.player.update(this.keys);
		}
	}
}
