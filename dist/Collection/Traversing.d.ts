import { CSS } from './CSS';
import { Collection } from '../Collection';
import { Selector } from './Types';
export declare class Traversing extends CSS {
    constructor(selector?: Selector);
    /**
     * Return the previous DOM element for each *Elem* in the collection
     *
     * @category Traversing
     */
    prev(): Collection;
    /**
     * Return the previous DOM element for each *Elem* in the collection
     *
     * @category Traversing
     */
    next(): Collection;
    /**
     * Return the parent DOM element for each *Elem* in the collection
     *
     * @category Traversing
     */
    parent(): Collection;
    /**
     * Search for a parent DOM element matching the *selector*
     *
     * @category Traversing
     *
     * @param selector A css selector
     */
    parents(selector?: string): Collection;
    /**
     * Search of DOM children matching the *selector*
     *
     * @category Traversing
     *
     * @param selector A css selector
     */
    find(selector: string): Collection;
}
