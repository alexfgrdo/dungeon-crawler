import Phaser from 'phaser';

let speed = 100;

//
// Global type creation
declare global {
	namespace Phaser.GameObjects {
		interface GameObjectFactory {
			player(x: number, y: number, texture: string, frame?: string | number);
		}
	}
}

enum HealthState {
	IDLE,
	DAMAGE,
	DEAD,
}

enum Direction {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
	private healthState = HealthState.IDLE;
	private damageTime = 0;

	private direction = Direction.RIGHT;

	private _health = 3;

	get health() {
		return this._health;
	}

	private knives?: Phaser.Physics.Arcade.Group;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		frame?: string | number,
	) {
		super(scene, x, y, texture, frame);
	}

	handleDamage(dir: Phaser.Math.Vector2) {
		//
		// If damage
		if (this.healthState == HealthState.DAMAGE) {
			return;
		}

		--this._health;

		//
		// If we die
		if (this._health <= +0) {
			this.healthState = HealthState.DEAD;
			this.setVelocity(0, 0);
		} else {
			this.healthState = HealthState.DAMAGE;
			this.setVelocity(dir.x, dir.y);
		}
	}

	//
	// Set knives
	setKnives(knives: Phaser.Physics.Arcade.Group) {
		this.knives = knives;
	}

	//
	// Set knives animation
	private throwKnife() {
		if (!this.knives) return;

		const vector = new Phaser.Math.Vector2(0, 0);

		//
		// Set knives direction
		if (this.direction === Direction.UP) {
			vector.y = -1;
		} else if (this.direction === Direction.DOWN) {
			vector.y = 1;
		} else if (this.direction === Direction.LEFT) {
			vector.x = -1;
		} else if (this.direction === Direction.RIGHT) {
			vector.x = 1;
		} else return;

		//
		// Set knife rotation and velocity
		const angle = vector.angle();
		const knife = this.knives.get(
			this.x,
			this.y,
			'knife',
		) as Phaser.Physics.Arcade.Image;

		knife.setActive(true);
		knife.setVisible(true);

		knife.setRotation(angle);

		knife.x += vector.x * 16;
		knife.y += vector.y * 16;

		knife.setVelocity(vector.x * 300, vector.y * 300);
	}

	preUpdate(t: number, dt: number) {
		super.preUpdate(t, dt);

		//
		// If state is IDLE or DAMAGE
		switch (this.healthState) {
			case HealthState.IDLE:
				break;
			case HealthState.DAMAGE:
				this.damageTime += dt;
				this.anims.play('player-hit');
				this.setTint(0xff0000);

				if (this.damageTime >= 250) {
					this.healthState = HealthState.IDLE;
					this.damageTime = 0;
					this.setTint(0xffffff);
				}
				break;
			case HealthState.DEAD:
				this.anims.play('player-dead');
				break;
		}
	}

	update(keys: Phaser.Types.Input.Keyboard.CursorKeys) {
		//
		// If no keybord inputs
		if (!keys) {
			return;
		}

		//
		// If damage or die
		if (
			this.healthState === HealthState.DAMAGE ||
			this.healthState === HealthState.DEAD
		) {
			return;
		}

		//
		// Configure space bar for knives
		if (Phaser.Input.Keyboard.JustDown(keys.space!)) {
			this.throwKnife();
			return;
		}

		//
		// Configuration of animations, velocity and directions
		if (keys.left?.isDown) {
			this.direction = Direction.LEFT;
			this.setVelocity(-speed, 0);
			this.anims.play('player-run-side', true);
			this.scaleX = -1;
			this.body.offset.x = 16;
		} else if (keys.right?.isDown) {
			this.direction = Direction.RIGHT;
			this.setVelocity(speed, 0);
			this.anims.play('player-run-side', true);
			this.scaleX = 1;
			this.body.offset.x = 0;
		} else if (keys.up?.isDown) {
			this.direction = Direction.UP;
			this.setVelocity(0, -speed);
			this.anims.play('player-run-up', true);
		} else if (keys.down?.isDown) {
			this.direction = Direction.DOWN;
			this.setVelocity(0, speed);
			this.anims.play('player-run-down', true);
		} else {
			this.setVelocity(0, 0);
			this.anims.play('player-idle', true);
		}
	}
}

//
// Add of PLayer to the register to do this.add.player instead new Player
Phaser.GameObjects.GameObjectFactory.register('player', function (
	this: Phaser.GameObjects.GameObjectFactory,
	x: number,
	y: number,
	texture: string,
	frame?: string | number,
) {
	let sprite = new Player(this.scene, x, y, texture, frame);

	this.displayList.add(sprite);
	this.updateList.add(sprite);

	this.scene.physics.world.enableBody(
		sprite,
		Phaser.Physics.Arcade.DYNAMIC_BODY,
	);

	//
	// Set player size
	sprite.body.setSize(sprite.width * 1, sprite.height * 0.6);
	sprite.body.offset.y = 10;

	return sprite;
});

export { setPlayerAnimations } from './animations';
