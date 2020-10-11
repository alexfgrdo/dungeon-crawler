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

		this.anims.play('player-idle-down');
	}

	handleDamage(dir: Phaser.Math.Vector2) {
		// if (this._health <= 0) {
		// 	return;
		// }

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
			this.anims.play('player-idle-up');
			this.setVelocity(0, 0);
		} else {
			this.setVelocity(dir.x, dir.y);
			this.setTint(0xff0000);

			this.healthState = HealthState.DAMAGE;
			this.damageTime = 0;
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
				if (this.damageTime >= 250) {
					this.healthState = HealthState.IDLE;
					this.setTint(0xffffff);
					this.damageTime = 0;
				}
				break;
			case HealthState.DEAD:
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
			this.anims.play('player-walk-side', true);
			this.scaleX = -1;
			this.body.offset.x = 16;
		} else if (keys.right?.isDown) {
			this.setVelocity(speed, 0);
			this.anims.play('player-walk-side', true);
			this.scaleX = 1;
			this.body.offset.x = 0;
		} else if (keys.up?.isDown) {
			this.setVelocity(0, -speed);
			this.anims.play('player-walk-up', true);
		} else if (keys.down?.isDown) {
			this.setVelocity(0, speed);
			this.anims.play('player-walk-down', true);
		} else {
			const parts = this.anims.currentAnim.key.split('-');
			parts[1] = 'idle';
			this.setVelocity(0, 0);
			this.anims.play(parts.join('-'));
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
