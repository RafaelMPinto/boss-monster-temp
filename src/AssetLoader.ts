import Loader = PIXI.loaders.Loader;
import { Signal } from "signals";
import Resource = PIXI.loaders.Resource;

export class AssetLoader {
	private static readonly ASSET_DIRECTORY_PATH = "assets/";

	private _loader: Loader;

	private _filesAdded: number;

    /**
	 * Dispatched once for each file that is loaded.
	 * @type {Signal}
	 */
	public loaded: Signal = new Signal();

	/**
	 * Dispatched every time there is a progress update from the pixi loader.
	 * @type {Signal}
	 */
	public progression: Signal = new Signal();

	/**
	 * Dispatched once all files have downloaded.
	 * @type {Signal}
	 */
	public completed: Signal = new Signal();

	/**
	 * Dispatched once for each file that has an error when loading.
	 * @type {Signal}
	 */
	public errored: Signal = new Signal();

	constructor() {
	}

    /**
	 * Loads all the files listed in the json sections in the queue.
	 */
	public load(assetPaths: string[]): void {
		this._loader = new Loader();
        this.addListeners();

        this._filesAdded = 0;
		for (let i: number = 0; i < assetPaths.length; i++) {
			this._loader.add(assetPaths[i], AssetLoader.ASSET_DIRECTORY_PATH + assetPaths[i]);
			this._filesAdded++;
		}

		this._loader.load();
	}

	private addListeners(): void {
		this._loader.on('load', this._loadHandler, this);
		this._loader.on('error', this._errorHandler, this);
		this._loader.on('progress', this._progressHandler, this);
		this._loader.on('complete', this._completeHandler, this);
	}

    /**
	 * Load Handler
	 * @param loader
	 * @param resources
	 */
	private _loadHandler(loader: Loader, resources: any): void {
		this.loaded.dispatch(loader);
	}

	/**
	 * Load Error Handler
	 * @param loader
	 * @param resources
	 */
	private _errorHandler(error: Error, loader: Loader, resource: Resource): void {
		this.errored.dispatch(loader);
	}

	/**
	 * Progress Load Handler
	 * @param loader
	 * @param resources
	 */
	private _progressHandler(loader: Loader, resources: Resource): void {
		this.progression.dispatch(loader, resources);
	}

	/**
	 * Completed Load Handler
	 * @param loader
	 * @param resources
	 */
	private _completeHandler(loader: Loader, resources: any): void {
		this.completed.dispatch(loader);
	}

	public destroy(): void {
		this.loaded.dispose();
		this.loaded = null;

		this.progression.dispose();
		this.progression = null;

		this.completed.dispose();
		this.completed = null;

		this.errored.dispose();
		this.errored = null;
	}
}