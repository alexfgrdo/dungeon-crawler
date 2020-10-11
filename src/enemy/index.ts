import Phaser from 'phaser';

let speed = 50;

enum Direction {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	private direction = Direction.RIGHT;

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
