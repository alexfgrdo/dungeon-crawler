import Phaser from 'phaser';

export const setEnemyAnimations = (
	anims: Phaser.Animations.AnimationManager,
) => {
	//
	// Enemy animation, run down
	anims.create({
		key: 'enemy-run-down',
		frames: anims.generateFrameNames('enemy', {
			start: 1,
			end: 4,
			prefix: 'enemy_run_down_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 7,
	});

	//
	// Enemy animation, run up
	anims.create({
		key: 'enemy-run-up',
		frames: anims.generateFrameNames('enemy', {
			start: 1,
			end: 4,
			prefix: 'enemy_run_up_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 7,
	});

	//
	// Enemy animation, run side
	anims.create({
		key: 'enemy-run-side',
		frames: anims.generateFrameNames('enemy', {
			start: 1,
			end: 4,
			prefix: 'enemy_run_side_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 7,
	});
};
