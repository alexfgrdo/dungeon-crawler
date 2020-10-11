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

export default class Player extends Phaser.Physics.Arcade.Sprite {
	private healthState = HealthState.IDLE;
	private damageTime = 0;

	private _health = 3;
	get health() {
		return this._health;
	}

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
		// Configuration of animations, velocity and directions
		if (keys.left?.isDown) {
			this.setVelocity(-speed, 0);
			this.anims.play('player-run', true);
			this.scaleX = -1;
			this.body.offset.x = 16;
		} else if (keys.right?.isDown) {
			this.setVelocity(speed, 0);
			this.anims.play('player-run', true);
			this.scaleX = 1;
			this.body.offset.x = 0;
		} else if (keys.up?.isDown) {
			this.setVelocity(0, -speed);
			this.anims.play('player-run', true);
		} else if (keys.down?.isDown) {
			this.setVelocity(0, speed);
			this.anims.play('player-run', true);
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
	sprite.body.setSize(sprite.width * 1, sprite.height * 1);

	return sprite;
});

export { setPlayerAnimations } from './animations';
