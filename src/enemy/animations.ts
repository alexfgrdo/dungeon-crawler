import Phaser from 'phaser';

export const setEnemyAnimation = (
	anims: Phaser.Animations.AnimationManager,
) => {
	//
	// Enemy animation, idle down
	anims.create({
		key: 'enemy-idle-down',
		frames: [{ key: 'enemy', frame: 'enemy_walk_down_1.png' }],
	});

	//
	// Enemy animation, idle up
	anims.create({
		key: 'enemy-idle-up',
		frames: [{ key: 'enemy', frame: 'enemy_walk_up_1.png' }],
	});

	//
	// Enemy animation, idle side
	anims.create({
		key: 'enemy-idle-side',
		frames: [{ key: 'enemy', frame: 'enemy_walk_side_1.png' }],
	});

	//
	// Enemy animation, walk down
	anims.create({
		key: 'enemy-walk-down',
		frames: anims.generateFrameNames('enemy', {
			start: 1,
			end: 4,
			prefix: 'enemy_walk_down_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 15,
	});

	//
	// Enemy animation, walk down
	anims.create({
		key: 'enemy-walk-up',
		frames: anims.generateFrameNames('enemy', {
			start: 1,
			end: 4,
			prefix: 'enemy_walk_up_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 15,
	});

	//
	// Enemy animation, walk down
	anims.create({
		key: 'enemy-walk-side',
		frames: anims.generateFrameNames('enemy', {
			start: 1,
			end: 4,
			prefix: 'enemy_walk_side_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 15,
	});
};
