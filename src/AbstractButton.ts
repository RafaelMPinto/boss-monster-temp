import DestroyOptions = PIXI.DestroyOptions;
import { Signal } from 'signals';
import {IViewComponent} from "./IViewComponent";
import Texture = PIXI.Texture;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;


export class AbstractButton extends Sprite implements IViewComponent {

	protected _isInteractDown: boolean;
	protected _isInteractOver: boolean;
	protected _enabled: boolean;

	public changed: Signal;
	public clicked: Signal;
	public rolledover: Signal;
	public rolledout: Signal;
	public down: Signal;
	public up: Signal;

	public get anchorXY(): number { return this.anchor.x; }
	public set anchorXY(value: number) { this.anchor.x = this.anchor.y = value; }

	public get scaleXY(): number { return this.scale.x; }
	public set scaleXY(value: number) { this.scale.x = this.scale.y = value; }

	public get enabled(): boolean { return this._enabled; }
	public set enabled(value: boolean) { this._enabled = this.interactive = this.buttonMode = value; }


	/**
	 * @constructor
	 * @param {String} frameID
	 */
	constructor(frameID: string = '') {
		super(frameID == '' ? null : Texture.fromFrame(frameID));

		this.enabled = true;

		this.hitArea = new Rectangle(0, 0, this.width, this.height);

		this._isInteractDown = false;
		this._isInteractOver = false;

		this.on('mousedown', this.interactionDownHandler);
		this.on('touchstart', this.interactionDownHandler);

		this.on('mouseup', this.interactionUpHandler);
		this.on('touchend', this.interactionUpHandler);

		this.on('mouseupoutside', this.interactionUpOutsideHandler);
		this.on('touchendoutside', this.interactionUpOutsideHandler);

		this.on('mouseover', this.interactionOverHandler);
		this.on('mouseout', this.interactionOutHandler);

		// NOTE: Should this IChange interface be implement here?
		this.changed = new Signal();
		this.clicked = new Signal();
		this.down = new Signal();
		this.up = new Signal();
		this.rolledover = new Signal();
		this.rolledout = new Signal();
	}

	/**
	 * Init
	 * @protected
	 */
	protected init(): void {
	}

	/**
	 * Interaction Down Handler
	 * @protected
	 */
	protected interactionDownHandler(event?:any): void {
		this.down.dispatch(this);
		this._isInteractDown = true;
	}

	/**
	 * Interaction Up Handler
	 * @protected
	 */
	protected interactionUpHandler(event?:any): void {
		this.up.dispatch(this);
		if (this._enabled && this._isInteractDown) {
			this.clicked.dispatch(this);
		}
		this._isInteractDown = false;
	}

	/**
	 * Interaction Up Outside Handler
	 * @protected
	 */
	protected interactionUpOutsideHandler(event?:any): void {
		this._isInteractDown = false;
	}

	/**
	 * Interaction Over Handler
	 * @protected
	 */
	protected interactionOverHandler(event?:any): void {
		this.rolledover.dispatch(this);
		this._isInteractOver = true;
	}

	/**
	 * Interaction Out Handler
	 * @protected
	 */
	protected interactionOutHandler(event?:any): void {
		this.rolledout.dispatch();
		this._isInteractOver = false;
	}



	/**
	 * Destroy Listeners
	 * @protected
	 */
	protected destroyListeners(): void {
		this.off('mousedown', this.interactionDownHandler);
		this.off('touchstart', this.interactionDownHandler);

		this.off('mouseup', this.interactionUpHandler);
		this.off('touchend', this.interactionUpHandler);

		this.off('mouseupoutside', this.interactionUpOutsideHandler);
		this.off('touchendoutside', this.interactionUpOutsideHandler);

		this.off('mouseover', this.interactionOverHandler);
		this.off('mouseout', this.interactionOutHandler);
	}

	/**
	 * Destroy Signals
	 */
	protected destroySignals(): void {
		this.changed.removeAll();
		this.changed.dispose();
		this.clicked.removeAll();
		this.clicked.dispose();
	}


	public destroy(): void {
		this.destroySignals();
		this.destroyListeners();
		super.destroy({
			children: true,
			texture: false,
			baseTexture: false
		} as DestroyOptions);
	}
}
