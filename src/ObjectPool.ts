import DisplayObject = PIXI.DisplayObject;

export class ObjectPool <T extends DisplayObject> {

	private _objects: T[];
	private _fn: Function;

	private _initSize: number;
	private _maxSize: number;
	private _pointerIndex: number;
	private _args: any[];
	private _iStaticMethod: boolean;

	private _name: string;

	/**
	 *
	 * @param name - ObjectPool name - used for debugging
	 * @param maxSize - size of ObjectPool Array
	 * @param initObjNum - Number of objects created initially - 0 by default
	 * @param fnConstructor - class or static method reference to create a new object that will be added to the pool array
	 * @param args - arguments for the previous class or static method
	 */
	constructor(name: string,
				maxSize: number,
				initObjNum: number = 0,
				fnConstructor: Function,
				...args: any[])
	{
		this._objects = new Array(maxSize);

		this._fn = fnConstructor;
		this._initSize = initObjNum;
		this._maxSize = maxSize;
		this._pointerIndex = 0;
		this._args = args;

		this._name = name;

		this.checkIfIsStaticMethod();

		this.createInitObj(initObjNum);
	}

	private checkIfIsStaticMethod(){
		this._iStaticMethod = this._fn.prototype.constructor.name.length === 0;
	}

	private createInitObj(initObjNum: number) {
		for (let i:number = 0; i<initObjNum; i++){
			this.recycle(this.create());
		}
	}

	private create(): T{
		let oTemp: T;
		if (this._iStaticMethod){
			oTemp = this._fn.apply(this, this._args);
		}
		else{
			oTemp = Object.create(this._fn.prototype);
			oTemp.constructor.apply(oTemp, this._args);
		}
		return oTemp;
	}

	public obtain():T {
		let oTemp:T;
		if (this._pointerIndex > 0) {
			this._pointerIndex--;
			oTemp = this._objects[this._pointerIndex];
			this._objects[this._pointerIndex] = null;
		} else {
			oTemp = this.create();
		}
		return oTemp;
	};

	public recycle(oRecyclable:T) {
		if (!this._iStaticMethod){
			if (!(oRecyclable instanceof this._fn)) {
				throw new Error('Trying to recycle the wrong object for pool.');
			}
		}

		if (this._pointerIndex < this._maxSize) {
			this._objects[this._pointerIndex] = oRecyclable;
			this._pointerIndex++;
		} else {
			oRecyclable.destroy();
			oRecyclable = null;
		}
	};

	/**
	 * Removes all the instances from the pool,
	 * making sure to destroy them first
	 */
	public empty(): void {
		for (let i = this._pointerIndex - 1; i >= 0; i--) {
			this._objects[i].destroy();
			this._objects[i] = null;
		}
		this._objects.length = this._pointerIndex = 0;
		this._objects.length = this._maxSize;
	}

	/**
	 * Removes all the instances that exceed the initial pool size,
	 *  making sure to destroy them first
	 */
	public reset(): void {
		for (let i = this._pointerIndex - 1; i >= this._initSize; i--) {
			this._objects[i].destroy();
			this._objects[i] = null;
		}
		this._objects.length = this._pointerIndex = this._initSize;
		this._objects.length = this._maxSize;
	}

	public get pointerIndex(): number {
		return this._pointerIndex;
	};
}
