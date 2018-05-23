import Container = PIXI.Container;
import {IUpdatable} from './IUpdatable';
import {IViewComponent} from './IViewComponent';
import Sprite = PIXI.Sprite;

export class Scene extends Container implements IUpdatable, IViewComponent{

    private static readonly BACKGROUND_IMG: string = 'background.jpg';
    private static readonly FLOOR_LEFT_IMG: string = 'floor_left.png';
    private static readonly FLOOR_RIGHT_IMG: string = 'floor_right.png';

    private _background_img: Sprite;
    private _leftFloor: Sprite;
    private _rightFloor: Sprite;

    private _width: number;
    private _height: number;

    constructor(width: number, height: number) {
        super();

        this._width = width;
        this._height = height;
    }

    public init() {
        this.createBackground();
        this.createFloor();
    }

    private createBackground() {
        this._background_img = Sprite.fromFrame(Scene.BACKGROUND_IMG);
        this.addChild(this._background_img);
    }

    private createFloor() {
        this._leftFloor = Sprite.fromFrame(Scene.FLOOR_LEFT_IMG);
        this._leftFloor.x = 0;
        this._leftFloor.y = this._height - this._leftFloor.height;
        this.addChild(this._leftFloor);

        this._rightFloor = Sprite.fromFrame(Scene.FLOOR_RIGHT_IMG);
        this._rightFloor.x = this._width - this._rightFloor.width;
        this._rightFloor.y = this._height - this._rightFloor.height;
        this.addChild(this._rightFloor);
    }

    public update(delta: number) {

    }

    public destroy(){
        // todo
    }
}