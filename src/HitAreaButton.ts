import Rectangle = PIXI.Rectangle;
import { AbstractButton } from './AbstractButton';
import Graphics = PIXI.Graphics;

export class HitAreaButton extends AbstractButton {

	private _gfx: Graphics;

	constructor(width: number, height: number) {
		super();

		this.init();
		this.hitArea = new Rectangle(0, 0, width, height);
		this.interactive = true;
		this.buttonMode = true;

		this._gfx = new Graphics();
		this._gfx.beginFill(0, 0);
		this._gfx.drawRect(0, 0, width, height);
		this._gfx.endFill();

		this.addChild(this._gfx);
	}

	public center(): void {
		this._gfx.x = this.width * .5;
		this._gfx.y = this.height * .5;
	}
}
