import Phaser from 'phaser';

export const setEnemyAnimations = (
	anims: Phaser.Animations.AnimationManager,
) => {
	//
	// Enemy animation, run
	anims.create({
		key: 'enemy-run',
		frames: anims.generateFrameNames('enemy', {
			start: 1,
			end: 4,
			prefix: 'enemy-run-',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 15,
	});
};
