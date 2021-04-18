import { CSS } from './CSS';
import { Collection } from '../Collection';
import { Selector } from './Types';
export declare class Traversing extends CSS {
    constructor(selector?: Selector);
    /**
     * Return the previous element for each *Elem* in the collection
     *
     * @category Traversing
     */
    prev(): Collection;
    /**
     * Return the previous element for each *Elem* in the collection
     *
     * @category Traversing
     */
    next(): Collection;
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
     */
    parent(): Collection;
    /**
     * Search for a parent element matching the *selector*
     *
     * @category Traversing
     *
     * @param selector A css selector
     */
    parents(selector?: string): Collection;
    /**
     * Search of children matching the *selector*
     *
     * @category Traversing
     *
     * @param selector A css selector
     */
    find(selector: string): Collection;
}
