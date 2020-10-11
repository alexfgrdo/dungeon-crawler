import Phaser from 'phaser';

import { GAME_URL } from '../../utils';

export default class Preloader extends Phaser.Scene {
	constructor() {
		super('preloader');
	}

	preload() {
		this.load.setBaseURL(GAME_URL);
	}
}
