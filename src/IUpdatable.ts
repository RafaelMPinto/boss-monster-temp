
/**
 * IUpdatable
 * @interface
 */
export interface IUpdatable {
    /**
     * update
     * @param {Number} delta - time in milliseconds since last render
     */
    update(deltaTime: number): void;
}