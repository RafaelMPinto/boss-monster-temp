import Container = PIXI.Container;
import {IUpdatable} from './IUpdatable';
import {IViewComponent} from './IViewComponent';
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;

export class Cannon extends Container implements IUpdatable, IViewComponent{

    private static readonly BASE_IMG: string = 'cannon_base.png';
    private static readonly MAIN_IMG: string = 'cannon_main.png';

    private static readonly BASE_1_POS: Point = new Point(-80, -40);
    private static readonly BASE_2_POS: Point = new Point(-50, -30);
    private static readonly MAIN_POS: Point = new Point(0, 0);
    private static readonly MAIN_ANCHOR: Point = new Point(0.6, 0.8);
    private static readonly MAIN_INITIAL_ROTATION: number = Math.PI*0.15;
    private static readonly DELTA_ROTATION: number = 0.03;
    private static readonly ROTATION_LIMIT: number = 40;

    private _base1: Sprite;
    private _base2: Sprite;
    private _main: Sprite;

    private _signal: number = -1;
    private _counter: number = 0;

    private _test: number = 0;

    constructor() {
        super();
    }

    public init() {
        this.buildView();
    }

    private buildView() {
        this._base1 = Sprite.fromFrame(Cannon.BASE_IMG);
        this._base1.x = Cannon.BASE_1_POS.x;
        this._base1.y = Cannon.BASE_1_POS.y;
        this.addChild(this._base1);

        this._main = Sprite.fromFrame(Cannon.MAIN_IMG);
        this._main.rotation = Cannon.MAIN_INITIAL_ROTATION;
        this._main.anchor.x = Cannon.MAIN_ANCHOR.x;
        this._main.anchor.y = Cannon.MAIN_ANCHOR.y;
        this._main.x = Cannon.MAIN_POS.x;
        this._main.y = Cannon.MAIN_POS.y;
        this.addChild(this._main);

        this._base2 = Sprite.fromFrame(Cannon.BASE_IMG);
        this._base2.x = Cannon.BASE_2_POS.x;
        this._base2.y = Cannon.BASE_2_POS.y;
        this.addChild(this._base2);
    }

    public getCannonRotation():number {
        return -(this._main.rotation - Cannon.MAIN_INITIAL_ROTATION );
    }

    public update(delta: number) {
        this._counter++;
        if(this._counter % Cannon.ROTATION_LIMIT === 0) {
            this._signal *= -1;
            this._counter = 0;
        }
        this._main.rotation += this._signal * Cannon.DELTA_ROTATION;
        //console.log(this._main.rotation);
    }

    public destroy(){
        // todo
    }
}