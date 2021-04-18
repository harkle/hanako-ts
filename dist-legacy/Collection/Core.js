import { Collection } from '../Collection';
/**
 * A collection of HTML elements with shortcut methodes to simplify manipulation
 */
export class Core {
    /**
     * *selector* can be:
     * - a string containing a CSS query
     * - a single *Elem*
     * - an array of *Elem*
     */
    constructor(selector) {
        this.elements = [];
        if (typeof selector == 'number')
            return;
        if (selector instanceof Collection)
            return selector;
        var elements = selector;
        if (typeof selector === 'string')
            elements = document.querySelectorAll(selector);
        if (elements) {
            if (elements.nodeType || elements === window)
                elements = [elements];
            this.elements = Array.prototype.slice.call(elements);
            ;
        }
    }
    /**
     * @ignore
     */
    [Symbol.iterator]() {
        return this.elements[Symbol.iterator]();
    }
    /**
     * Return the number of *Elem* in the collection
     *
     * @category Collection
     */
    get length() {
        return this.elements.length;
    }
    /**
     * Execute a *callback* on every *Elem*
     *
     * @category Collection
     */
    forEach(callback, thisArg) {
        this.elements.forEach(callback);
    }
    /**
     * In contrary of *forEach* this function return each *Elem* as *Collection*.
     *
     * @category Collection
     */
    each(callback) {
        this.forEach((item, index) => callback(new Collection(item), index));
        return this;
    }
    /**
     * Return collection's *Elem* or a single *Elem*
     *
     * @category Collection
     *
     * @param index Index of the element in the collection
     */
    get(index) {
        return this.elements[index < 0 ? index + this.elements.length : index];
    }
    ;
    /**
     * Return a new collection containing element at the specified index.
     *
     * @category Collection
    *
    * @param index Index of the element in the collection
    */
    eq(index) {
        return new Collection(this.get(index));
    }
    ;
    /**
     * Add an *Elem* to the collection
     *
     * @category Collection
     */
    add(newItem) {
        var isAlreadyInCollection = false;
        this.forEach((item) => {
            if (newItem === item)
                isAlreadyInCollection = true;
        });
        if (!isAlreadyInCollection)
            this.elements.push(newItem);
    }
    /**
     * Search for a specific *Elem* in the collection
     *
     * @category Collection
     *
     * @param selector A css selector to search
     */
    search(selector) {
        var filteredElement = new Collection();
        this.forEach((item) => {
            if (item.matches(selector))
                filteredElement.add(item);
        });
        return filteredElement;
    }
}
