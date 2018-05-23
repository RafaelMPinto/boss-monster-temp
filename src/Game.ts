import Container = PIXI.Container;
import {Cannon} from './Cannon';
import {IUpdatable} from './IUpdatable';
import {IViewComponent} from './IViewComponent';
import {Target} from './Pool';
import {Ball} from './Ball';
import Point = PIXI.Point;
import {Scene} from './Scene';
import {HitAreaButton} from "./HitAreaButton";
import {ObjectPool} from "./ObjectPool";
import {TweenMax, Linear, Elastic} from "gsap";
import {MathUtils} from './MathUtils';


export class Game extends Container implements IUpdatable, IViewComponent{

    private static readonly CANNON_OFFSET: Point = new Point(250, -200);
    private static readonly CANNON_LENGTH: number = 200;
    private static readonly TARGET_OFFSET: Point = new Point(-430, -165);
    private static readonly VELOCITY: number = 120;
    private static readonly GRAVITY: number = 10;

    private _width: number;
    private _height: number;

    private _objectPool: ObjectPool<Ball>;

    private _scene: Scene;
    private _cannon: Cannon;
    private _target: Target;
    private _balls: Ball[];
    private _button: HitAreaButton;

    private flag: boolean = true;


    constructor(width: number, height: number) {
        super();

        this._balls = [];
        this._width = width;
        this._height = height;
    }

    public buildView() {
        this.createObjectPool();
        this.createScene();
        this.createCannon();
        this.createTarget();
        this.createButton();
    }

    private createObjectPool() {
        this._objectPool = new ObjectPool<Ball>(
            'ball',  // parameter only needed for debugging
            20,
            3,
            Ball);
    }

    private createScene() {
        this._scene = new Scene(this._width, this._height);
        this.addChild(this._scene);
        this._scene.init();
    }

    private createCannon() {
        this._cannon = new Cannon();
        this._cannon.y = this._height + Game.CANNON_OFFSET.y;
        this._cannon.x = Game.CANNON_OFFSET.x;
        this.addChild(this._cannon);


        let myVal: number = this._cannon.test;
        this._cannon.init();
    }

    private createTarget() {
        this._target = new Target();
        this._target.y = this._height + Game.TARGET_OFFSET.y;
        this._target.x = this._width + Game.TARGET_OFFSET.x;
        this.addChild(this._target);
        this._target.init();
    }

    private createButton() {
        this._button = new HitAreaButton(this._width, this._height);
        this._button.down.add(this.fire.bind(this));
        this.addChild(this._button);
    }

    private fire(){
       this.createBall();
    }

    private createBall() {
        let ball:Ball = this._objectPool.obtain();

        const angle: number = this._cannon.getCannonRotation();
        const dMax: number = Math.pow(Game.VELOCITY,2) * Math.sin(2*angle) / Game.GRAVITY;
        const hMax: number = Math.pow(Game.VELOCITY,2) * Math.pow(Math.sin(angle),2)/(2*Game.GRAVITY);

        const p1: Point = new Point(this._cannon.x - 60, this._cannon.y-10);
        const p2: Point = new Point(this._cannon.x + dMax*0.5, this._cannon.y-hMax);
        const p3: Point = new Point(this._cannon.x + dMax, this._cannon.y);

        ball.position.set(p1.x, p1.y);
        this.addChild(ball);
        this.setChildIndex(this._cannon, this.children.length-1);
        this._balls.push(ball);
        this.flag = false;

        let parabola: { a: number; b: number; c: number };

        parabola = MathUtils.calculateParabola(p1, p2, p3);
        const getY = this.getParabolaY.bind(this, parabola.a, parabola.b, parabola.c);

        const t: number = 1;

        TweenMax.delayedCall(0.3, () =>{
            this.flag = true;
        });

        TweenMax.fromTo(ball, t,
            {x: p1.x, rotation: 0},
            {
                x: p3.x, rotation: p3.x >= -1 ? 6: -6, ease: Linear.easeNone,
                onUpdate:() => {
                    ball.y = getY(ball.x);
                },
                onComplete: () => {
                    this.removeChild(ball);
                    this._objectPool.recycle(ball);
                }
            });
    }

    private getParabolaY(a:number, b:number, c:number, x:number): number{
        return a*x*x + b*x + c;
    }

    public update(delta: number) {
        if(this._cannon && this.flag) {
            this._cannon.update(delta);
        }
    }

    public destroy() {
        // todo
    }
}