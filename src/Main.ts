import * as PIXI from 'pixi.js'
import Application = PIXI.Application;
import { AssetLoader } from './AssetLoader';
import Loader = PIXI.loaders.Loader;
import {Game} from './Game';

new class Main {
	private _application: Application;

    private _assetLoader: AssetLoader;

    private _width: number;
    private _height: number;

    private _game: Game;

    /**
     * Add assets to load here
     */
    // todo - load from a json
    private _assets: string[] = [
        'cannonball_assets.json',
        'cannonball_background.json'
    ];

    constructor() {
        this.createApplication();
        this.createAssetLoader();
    }

	private createApplication(): void {
		this._width = window.innerWidth;
		this._height = window.innerHeight;

		const gameContainer: HTMLDivElement = document.getElementById('gameContainer') as HTMLDivElement;
		this._application = new Application(this._width, this._height , { backgroundColor: 0xffffff, antialias: true });
		gameContainer.appendChild(this._application.view);
		this._application.ticker.add((delta) => this.update(delta));
	}

	private createAssetLoader(): void {
		this._assetLoader = new AssetLoader();
        this._assetLoader.completed.add((loader: Loader) => this.loadCompleteHandler(loader));
		this._assetLoader.load(this._assets);
	}

    /**
     * Runs after assets have finished loading
     */
    private loadCompleteHandler(loader: Loader): void {
    	this.createGame();
    }

    private createGame() {
        this._game = new Game(this._width, this._height);
        this._application.stage.addChild(this._game);
        this._game.buildView();
	}

    /**
     * Update logic here
     */
    private update(delta: number): void {
        if(this._game){
            this._game.update(delta);
        }
    }

    /**
     * Cleanup logic here
     */
    private destroy(): void {
        this._application.destroy();
        this._application = null;

        this._assetLoader.destroy();
        this._assetLoader = null;
    }
}