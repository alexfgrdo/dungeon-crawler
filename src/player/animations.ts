import Phaser from 'phaser';

export const setPlayerAnimations = (
	anims: Phaser.Animations.AnimationManager,
) => {
	//
	// Player animation, idle
	anims.create({
		key: 'player-idle',
		frames: anims.generateFrameNames('player', {
			start: 1,
			end: 4,
			prefix: 'player-idle-',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 12,
	});

	//
	// Player animation, run
	anims.create({
		key: 'player-run',
		frames: anims.generateFrameNames('player', {
			start: 1,
			end: 4,
			prefix: 'player-run-',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 14,
	});

	//
	// Player animation, hit
	anims.create({
		key: 'player-hit',
		frames: [{ key: 'player', frame: 'player-hit.png' }],
	});

	//
	// Player animation, dead
	anims.create({
		key: 'player-dead',
		frames: [{ key: 'player', frame: 'player-dead.png' }],
	});
};
