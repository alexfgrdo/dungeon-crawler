import Phaser from 'phaser';

let speed = 35;

enum Direction {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

//
// Set the rendom direction
const randomDirection = (exclude: Direction) => {
	let newDirection = Phaser.Math.Between(0, 3);

	while (newDirection === exclude) {
		newDirection = Phaser.Math.Between(0, 3);
	}

	return newDirection;
};

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	private direction = Direction.RIGHT;
	private moveEvent: Phaser.Time.TimerEvent;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		frame?: string | number,
	) {
		super(scene, x, y, texture, frame);

		//
		// Play enemy animation
		this.anims.play('enemy-run-down');

		//
		// Add collision with the world
		scene.physics.world.on(
			Phaser.Physics.Arcade.Events.TILE_COLLIDE,
			this.handleTileCollision,
			this,
		);

		//
		// Creation of the loop for the random direction
		this.moveEvent = scene.time.addEvent({
			delay: 2000,
			callback: () => {
				this.direction = randomDirection(this.direction);
			},
			loop: true,
		});
	}

	//
	// Destruction of moveEvent
	destroy(fromScene?: boolean) {
		this.moveEvent.destroy();
		super.destroy();
	}

	//
	// Handle tile collision
	private handleTileCollision(
		go: Phaser.GameObjects.GameObject,
		tile: Phaser.Tilemaps.Tile,
	) {
		if (go !== this) {
			return;
		}

		this.direction = randomDirection(this.direction);
	}

	//
	// Configuration of the direction velocity
	preUpdate(t: number, dt: number) {
		super.preUpdate(t, dt);
		if (this.direction === Direction.DOWN) {
			this.anims.play('enemy-run-down');
			this.setVelocity(0, speed);
		} else if (this.direction === Direction.UP) {
			this.setVelocity(0, -speed);
			this.anims.play('enemy-run-up');
		} else if (this.direction === Direction.LEFT) {
			this.setVelocity(-speed, 0);
			this.anims.play('enemy-run-side');
			this.scaleX = -1;
			this.body.offset.x = 16;
		} else if (this.direction === Direction.RIGHT) {
			this.anims.play('enemy-run-side');
			this.setVelocity(speed, 0);
			this.scaleX = 1;
			this.body.offset.x = 0;
		}
	}
}

export { setEnemyAnimations } from './animations';
