import { CSS } from './CSS';
import { Collection } from '../Collection';
function* _prevAll(item) {
    while (item = item.previousElementSibling) {
        yield item;
    }
}
function* _nextAll(item) {
    while (item = item.nextElementSibling) {
        yield item;
    }
}
export class Traversing extends CSS {
    constructor(selector) {
        super(selector);
    }
    /**
     * Return the previous element for each *Elem* in the collection
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    prev(selector) {
        var collection = new Collection();
        this.forEach((item) => {
            if (item.previousElementSibling) {
                if (!selector || item.previousElementSibling.matches(selector))
                    collection.add(item.previousElementSibling);
            }
        });
        return collection;
    }
    /**
     * Return all previous elements for each *Elem* in the collection
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    prevAll(selector) {
        var collection = new Collection();
        this.forEach((item) => {
            [..._prevAll(item)].forEach((sibling) => {
                if (!selector || sibling.matches(selector))
                    collection.add(sibling);
            });
        });
        return collection;
    }
    /**
     * Return the next element for each *Elem* in the collection
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    next(selector) {
        var collection = new Collection();
        this.forEach((item) => {
            if (item.nextElementSibling) {
                if (!selector || item.nextElementSibling.matches(selector))
                    collection.add(item.nextElementSibling);
            }
        });
        return collection;
    }
    /**
     * Return all next elements for each *Elem* in the collection
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    nextAll(selector) {
        var collection = new Collection();
        this.forEach((item) => {
            [..._nextAll(item)].forEach((sibling) => {
                if (!selector || sibling.matches(selector))
                    collection.add(sibling);
            });
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
     * @param selector A css selector
     * @returns Collection
     */
    parent(selector) {
        var collection = new Collection();
        this.forEach((item) => {
            if (!selector || item.parentNode.matches(selector))
                collection = new Collection(item.parentNode);
        });
        return collection;
    }
    /**
     * Search for a parent element matching the *selector*
     *
     * @category Traversing
     * @returns Collection
     * @param selector A css selector
     */
    parents(selector) {
        var collection = new Collection();
        if (this.elements.length == 0)
            return collection;
        this.forEach((item) => {
            while (item.parentNode != null && item.parentNode != document.documentElement) {
                if (!selector || item.parentNode.matches(selector))
                    collection.add(item.parentNode);
                item = item.parentNode;
            }
        });
        return collection;
    }
    /**
     * Get direct children
     *
     * @category Traversing
     * @returns Collection
     * @param selector A css selector
     */
    children(selector) {
        var collection = new Collection();
        if (this.elements.length == 0)
            return collection;
        this.forEach((item) => {
            item.childNodes.forEach((childNode) => {
                if (childNode.nodeType === 3)
                    return;
                if (!selector || childNode.matches(selector))
                    collection.add(childNode);
            });
        });
        return collection;
    }
    /**
     * Search of children matching the *selector*
     *
     * @category Traversing
     * @param selector A css selector
     * @returns Collection
     */
    find(selector) {
        var collection = new Collection();
        this.forEach((item) => {
            var foundElements = item.querySelectorAll(selector);
            foundElements.forEach((element) => {
                collection.add(element);
            });
        });
        return collection;
    }
}
