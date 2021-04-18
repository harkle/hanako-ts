import { CSS } from './CSS';
import { Collection } from '../Collection';
export class Traversing extends CSS {
    constructor(selector) {
        super(selector);
    }
    /**
     * Return the previous element for each *Elem* in the collection
     *
     * @category Traversing
     */
    prev() {
        var collection = new Collection();
        this.forEach((item) => {
            collection.add(item.previousElementSibling);
        });
        return collection;
    }
    /**
     * Return the previous element for each *Elem* in the collection
     *
     * @category Traversing
     */
    next() {
        var collection = new Collection();
        this.forEach((item) => {
            collection.add(item.nextElementSibling);
        });
        return collection;
    }
    /**
     * Return the first element in collection
     *
     * @category Traversing
     * @returns Collection
     */
    first() {
        return new Collection(this.elements[0]);
    }
    /**
     * Return the last element in collection
     *
     * @category Traversing
     * @returns Collection
     */
    last() {
        return new Collection(this.elements[this.elements.length - 1]);
    }
    /**
     * Return the parent element for each *Elem* in the collection
     *
     * @category Traversing
     */
    parent() {
        var collection = new Collection();
        if (this.elements.length > 0)
            collection = new Collection(this.get(0).parentNode);
        return collection;
    }
    /**
     * Search for a parent element matching the *selector*
     *
     * @category Traversing
     *
     * @param selector A css selector
     */
    parents(selector) {
        var collection = new Collection();
        if (this.elements.length == 0)
            return collection;
        var current = this.elements[0];
        while (current.parentNode != null && current.parentNode != document.documentElement) {
            let isToBeAdded = true;
            if (selector) {
                isToBeAdded = false;
                if (current.parentNode.matches(selector))
                    isToBeAdded = true;
            }
            if (isToBeAdded)
                collection.add(current.parentNode);
            current = current.parentNode;
        }
        return collection;
    }
    /**
     * Search of children matching the *selector*
     *
     * @category Traversing
     *
     * @param selector A css selector
     */
    find(selector) {
        var collection = new Collection();
        if (this.elements.length == 0)
            return collection;
        var foundElements = this.elements[0].querySelectorAll(selector);
        foundElements.forEach((element) => {
            collection.add(element);
        });
        return collection;
    }
}
