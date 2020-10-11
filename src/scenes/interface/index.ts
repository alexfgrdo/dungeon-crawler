import Phaser from 'phaser';

import { sceneEvent } from '../../utils';

export default class Interface extends Phaser.Scene {
	private hearts!: Phaser.GameObjects.Group;

	constructor() {
		super({ key: 'interface' });
	}

	create() {
		//
		// Create hearts
		this.hearts = this.add.group({
			classType: Phaser.GameObjects.Image,
		});

		//
		// Hearts configuration
		this.hearts.createMultiple({
			key: 'heart-full',
			setXY: {
				x: 10,
				y: 10,
				stepX: 16,
			},
			quantity: 3,
		});

		//
		// Add health state changed
		sceneEvent.on('player-health-changed', this.handlePlayerHealthChange, this);

		//
		// Clean heath state changed
		this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
			sceneEvent.off(
				'player-health-changed',
				this.handlePlayerHealthChange,
				this,
			);
		});
	}

	private handlePlayerHealthChange(health: number) {
		this.hearts.children.each((go, index) => {
			const heart = go as Phaser.GameObjects.Image;

			//
			// Set heart animation
			if (index < health) {
				heart.setTexture('heart-full');
			} else {
				heart.setTexture('heart-empty');
			}
		});
	}
}
