import Phaser from 'phaser';

export const setPlayerAnimations = (
	anims: Phaser.Animations.AnimationManager,
) => {
	//
	// Player animation, idle down
	anims.create({
		key: 'player-idle-down',
		frames: [{ key: 'player', frame: 'player_walk_down_1.png' }],
	});

	//
	// Player animation, idle up
	anims.create({
		key: 'player-idle-up',
		frames: [{ key: 'player', frame: 'player_walk_up_1.png' }],
	});

	//
	// Player animation, idle side
	anims.create({
		key: 'player-idle-side',
		frames: [{ key: 'player', frame: 'player_walk_side_1.png' }],
	});

	//
	// Player animation, walk down
	anims.create({
		key: 'player-walk-down',
		frames: anims.generateFrameNames('player', {
			start: 1,
			end: 4,
			prefix: 'player_walk_down_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 15,
	});

	//
	// Player animation, walk down
	anims.create({
		key: 'player-walk-up',
		frames: anims.generateFrameNames('player', {
			start: 1,
			end: 4,
			prefix: 'player_walk_up_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 15,
	});

	//
	// Player animation, walk down
	anims.create({
		key: 'player-walk-side',
		frames: anims.generateFrameNames('player', {
			start: 1,
			end: 4,
			prefix: 'player_walk_side_',
			suffix: '.png',
		}),
		repeat: -1,
		frameRate: 15,
	});
};
