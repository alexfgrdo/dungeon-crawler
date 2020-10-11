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

export default class Player extends Phaser.Physics.Arcade.Sprite {
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

	preUpdate(t: number, dt: number) {
		super.preUpdate(t, dt);
	}

	update(keys: Phaser.Types.Input.Keyboard.CursorKeys) {
		//
		// If no keybord inputs
		if (!keys) {
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
