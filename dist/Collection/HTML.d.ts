import { Traversing } from './Traversing';
import { Collection } from '../Collection';
import { Selector } from './Types';
export declare class HTML extends Traversing {
    constructor(selector?: Selector);
    /**
     * Remove the *Elem* for the DOM.
     *
     * @category HTML manipulation
     *
     */
    remove(): this;
    /**
     * Clear all DOM children of the *Elem*
     *
     * @category HTML manipulation
     *
     */
    empty(): this;
    /**
     * Return a clone of the collection
     *
     * @category HTML manipulation
     *
     */
    clone(): Collection;
    /**
     * Insert content, specified by the parameter, to the beginning of each element in the collection
     *
     * @category HTML manipulation
     *
     */
    prepend(itemsArray: Collection | Collection[]): this;
    /**
     * Insert content, specified by the parameter, to the end of each element in the collection
     *
     * @category HTML manipulation
     *
     */
    append(itemsArray: Collection | Collection[]): this;
    /**
     * Add an element before specified element
     *
     * @category HTML manipulation
     */
    before(itemsArray: Collection | Collection[]): this;
    /**
     * Add an element after specified element
     *
     * @category HTML manipulation
     */
    after(itemsArray: Collection | Collection[]): this;
    /**
     * Wrap each element in the collection with specified element
     *
     * @category HTML manipulation
     *
     */
    wrap(wrapper: Collection): this;
    /**
     * Set the *value* of the first element in the collection of set the *value* of all elements in the collection.
     *
     * @category HTML manipulation
     *
     */
    val(): string;
    val(value: string | number): this;
    /**
     * Set the *innerHTML* of the first element in the collection of set the *innerHTML* of all elements in the collection.
     *
     * @category HTML manipulation
     *
     */
    html(): string;
    html(value: string | number): this;
    html(value: string | number, append?: boolean): this;
    /**
     * Set the text of the first element in the collection of set the text of all elements in the collection.
     *
     * @category HTML manipulation
     *
     */
    text(): string;
    text(value: string | number): this;
    /**
     * Get the value of an attribute for the first element in the set of matched elements or set one attribute for every matched element.
     *
     * @category HTML manipulation
     *
     */
    attr(name: string): string;
    attr(name: string, value: any): this;
    /**
     * Remove an attribute on each element in the set.
     *
     * @category HTML manipulation
     *
     */
    removeAttr(name: string): Collection;
    /**
     * Get the value of a data attribute for the first element in the set of matched elements or set one data attribute for every matched element.
     *
     * @category HTML manipulation
     *
     */
    data(name: string): string;
    data(name: string, value: any): this;
}
