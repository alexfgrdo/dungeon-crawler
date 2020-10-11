import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
	private keys!: Phaser.Types.Input.Keyboard.CursorKeys;

	constructor() {
		super('game');
	}

	preload() {
		//
		// Création des inputs du clavier
		this.keys = this.input.keyboard.createCursorKeys();
	}
	create() {}
}
