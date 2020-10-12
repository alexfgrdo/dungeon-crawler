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
			end: 2,
			prefix: 'player_idle_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 6,
	});

	//
	// Player animation, run
	anims.create({
		key: 'player-run-down',
		frames: anims.generateFrameNames('player', {
			start: 1,
			end: 4,
			prefix: 'player_run_down_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 14,
	});

	//
	// Player animation, run
	anims.create({
		key: 'player-run-up',
		frames: anims.generateFrameNames('player', {
			start: 1,
			end: 4,
			prefix: 'player_run_up_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 14,
	});

	//
	// Player animation, run
	anims.create({
		key: 'player-run-side',
		frames: anims.generateFrameNames('player', {
			start: 1,
			end: 4,
			prefix: 'player_run_side_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 14,
	});

	//
	// Player animation, hit
	anims.create({
		key: 'player-hit',
		frames: [{ key: 'player', frame: 'player_hit.png' }],
	});

	//
	// Player animation, dead
	anims.create({
		key: 'player-dead',
		frames: [{ key: 'player', frame: 'player_dead.png' }],
	});
};
