import DestroyOptions = PIXI.DestroyOptions;

export interface IViewComponent {
    destroy(destroyOptions?: DestroyOptions): void;
}