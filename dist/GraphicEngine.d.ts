import { Collection } from './Collection';
import { Selector, Dimensions } from './Collection/Types';
export interface GraphicEngineOptions {
    width?: number;
    height?: number;
    clear?: boolean;
    pixelRatio?: number | 'device';
    antialias?: boolean;
    alpha?: boolean;
}
export declare abstract class GraphicEngine extends Collection {
    protected options: GraphicEngineOptions;
    protected framecount: number;
    constructor(selector: Selector, options?: GraphicEngineOptions);
    private requestAnimationFrame;
    resize(dimensions?: Dimensions): void;
    setup(): void;
    protected clear(): void;
    animate(): void;
    draw(): void;
    protected render(): void;
}
