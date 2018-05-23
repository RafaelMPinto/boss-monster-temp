import Container = PIXI.Container;
import {IUpdatable} from './IUpdatable';
import {IViewComponent} from './IViewComponent';
import Sprite = PIXI.Sprite;

export class Target extends Container implements IUpdatable, IViewComponent{

    private static readonly IMG: string = 'pool.png';

    private _img: Sprite;

    constructor() {
        super();
    }

    public init() {
        this.buildView();
    }

    private buildView() {
        this._img = Sprite.fromFrame(Target.IMG);
        this.addChild(this._img);
    }

    public update(delta: number) {

    }

    public destroy(){
        // todo
    }
}