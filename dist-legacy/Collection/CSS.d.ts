import { Core } from './Core';
import { Selector } from './Types';
export declare class CSS extends Core {
    constructor(selector?: Selector);
    /**
     * Return *true* if any *Elem* has the given class
     *
     * @category CSS class
     */
    hasClass(className: string): boolean;
    /**
     * Add the given *classNames* to all *Elem*
     *
     * @category CSS class
     */
    addClass(classNames: string): this;
    /**
     * Remove the given *classNames* to all *Elem*
     *
     * @category CSS class
     */
    removeClass(classNames: string): this;
    /**
     * Toggle the given *classNames* to all *Elem*
     *
     * @category CSS class
     */
    toggleClass(classNames: string): this;
    /**
    * Get the value of a css property for the first element in the set of matched elements or set css properties for every matched element.
    *
    * @category HTML manipulation
    *
    */
    css(name: string): string;
    css(name: {
        [property: string]: string | number;
    }): this;
    css(name: string, value?: string | number, priority?: '' | 'important'): this;
    private prepareCSSValue;
}
