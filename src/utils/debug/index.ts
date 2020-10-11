import Phaser from 'phaser';

export const debugGraphics = (
	layer: Phaser.Tilemaps.StaticTilemapLayer,
	scene: Phaser.Scene,
) => {
	const debug = scene.add.graphics().setAlpha(0.25);
	layer.renderDebug(debug, {
		tileColor: null,
		collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255),
	});
};
