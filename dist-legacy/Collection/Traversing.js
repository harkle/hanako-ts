import { CSS } from './CSS';
import { Collection } from '../Collection';
export class Traversing extends CSS {
    constructor(selector) {
        super(selector);
    }
    /**
     * Return the previous DOM element for each *Elem* in the collection
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
     * Return the previous DOM element for each *Elem* in the collection
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
     * Return the parent DOM element for each *Elem* in the collection
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
     * Search for a parent DOM element matching the *selector*
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
     * Search of DOM children matching the *selector*
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
