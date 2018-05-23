import {IUpdatable} from './IUpdatable';
import {IViewComponent} from './IViewComponent';
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;

export class Ball extends Container implements IViewComponent{

    private static readonly IMG: string = 'cannon_ball.png';

    private _img: Sprite;
    private _isPlaying: boolean = false;

    constructor() {
        super();
        this.buildView();
    }

    private buildView() {
        this._img = Sprite.fromFrame(Ball.IMG);
        this._img.scale.set(0.7);
        this._img.anchor.set(0.5);
        this.addChild(this._img);
    }

    set isPlaying(val: boolean) {
        this._isPlaying = val;
    }

    public destroy(){
        // todo
    }
}