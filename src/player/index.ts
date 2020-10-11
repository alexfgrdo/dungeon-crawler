import Phaser from 'phaser';

//
// Global type creation
declare global {
	namespace Phaser.GameObjects {
		interface GameObjectsFactory {
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
	}
}
