import { HTML } from './HTML';
import { Collection } from '../Collection';
import { Point, Selector } from './Types';
export declare class Dimensions extends HTML {
    constructor(selector?: Selector);
    /**
     * Get or set the width of an element in pixels
     *
     * @category Dimensions
     *
     */
    width(): number;
    width(value: number): this;
    width(value: string): this;
    /**
     * Get or set the height of an element in pixels
     *
     * @category Dimensions
     *
     */
    height(): number;
    height(value: number): this;
    height(value: string): this;
    /**
     * Return element position relative to other element or document
     *
     * @category Dimensions
     *
     */
    position(target?: string | Collection): Point;
    /**
     * Return element position in viewport
     *
     * @category Dimensions
     *
     */
    viewportPosition(): Point;
}
