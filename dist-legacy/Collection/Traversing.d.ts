import { CSS } from './CSS';
import { Collection } from '../Collection';
import { Selector } from './Types';
export declare class Traversing extends CSS {
    constructor(selector?: Selector);
    /**
     * Return the previous element for each *Elem* in the collection
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    prev(selector?: string): Collection;
    /**
     * Return all previous elements for each *Elem* in the collection
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    prevAll(selector?: string): Collection;
    /**
     * Return the next element for each *Elem* in the collection
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    next(selector?: string): Collection;
    /**
     * Return all next elements for each *Elem* in the collection
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    nextAll(selector?: string): Collection;
    /**
     * Return the first element in collection
     *
     * @category Traversing
     * @returns Collection
     */
    first(): Collection;
    /**
     * Return the last element in collection
     *
     * @category Traversing
     * @returns Collection
     */
    last(): Collection;
    /**
     * Return the parent element for each *Elem* in the collection
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    parent(selector?: string): Collection;
    /**
     * Search for a parent element matching the *selector*
     *
     * @category Traversing
     * @returns Collection
     * @param selector A css selector
     */
    parents(selector?: string): Collection;
    /**
     * Get direct children
     *
     * @category Traversing
     * @returns Collection
     * @param selector A css selector
     */
    children(selector?: string): Collection;
    /**
     * Search of children matching the *selector*
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    find(selector: string): Collection;
}
