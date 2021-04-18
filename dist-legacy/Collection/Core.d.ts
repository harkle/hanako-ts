import { Collection } from '../Collection';
import { Elem, Selector } from './Types';
interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}
/**
 * A collection of HTML elements with shortcut methodes to simplify manipulation
 */
export declare class Core implements Iterable<Elem> {
    protected readonly elements: Elem[];
    /**
     * *selector* can be:
     * - a string containing a CSS query
     * - a single *Elem*
     * - an array of *Elem*
     */
    constructor(selector?: Selector);
    /**
     * @ignore
     */
    [Symbol.iterator](): Iterator<Elem>;
    /**
     * Return the number of *Elem* in the collection
     *
     * @category Collection
     */
    get length(): number;
    /**
     * Execute a *callback* on every *Elem*
     *
     * @category Collection
     */
    forEach(callback: (value: Elem, index: number, array: Elem[]) => void, thisArg?: any): void;
    /**
     * In contrary of *forEach* this function return each *Elem* as *Collection*.
     *
     * @category Collection
     */
    each(callback: Function): this;
    /**
     * Return collection's *Elem* or a single *Elem*
     *
     * @category Collection
     *
     * @param index Index of the element in the collection
     */
    get(index: number): Elem;
    /**
     * Return a new collection containing element at the specified index.
     *
     * @category Collection
    *
    * @param index Index of the element in the collection
    */
    eq(index: number): Collection;
    /**
     * Add an *Elem* to the collection
     *
     * @category Collection
     */
    add(newItem: Elem): void;
    /**
     * Search for a specific *Elem* in the collection
     *
     * @category Collection
     *
     * @param selector A css selector to search
     */
    search(selector: string): Collection;
}
export {};
