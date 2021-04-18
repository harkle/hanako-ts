import { Traversing } from './Traversing';
import { Collection } from '../Collection';
export class HTML extends Traversing {
    constructor(selector) {
        super(selector);
    }
    /**
     * Remove the *Elem* for the DOM.
     *
     * @category HTML manipulation
     *
     */
    remove() {
        this.elements.forEach((item) => {
            item.remove();
        });
        return this;
    }
    /**
     * Clear all DOM children of the *Elem*
     *
     * @category HTML manipulation
     *
     */
    empty() {
        this.elements.forEach((item) => {
            while (item.firstChild)
                item.removeChild(item.firstChild);
        });
        return this;
    }
    /**
     * Return a clone of the collection
     *
     * @category HTML manipulation
     *
     */
    clone() {
        let collection = new Collection();
        this.elements.forEach((item) => {
            collection.add(item.cloneNode(true));
        });
        return collection;
    }
    /**
     * Insert content, specified by the parameter, to the beginning of each element in the collection
     *
     * @category HTML manipulation
     *
     */
    prepend(itemsArray) {
        if (!Array.isArray(itemsArray))
            itemsArray = [itemsArray];
        itemsArray.forEach((items) => {
            items.forEach((item) => {
                if (this.elements.length == 0)
                    return;
                this.elements[0].insertBefore(item, this.elements[0].firstChild);
            });
        });
        return this;
    }
    /**
     * Insert content, specified by the parameter, to the end of each element in the collection
     *
     * @category HTML manipulation
     *
     */
    append(itemsArray) {
        if (!Array.isArray(itemsArray))
            itemsArray = [itemsArray];
        itemsArray.forEach((items) => {
            items.forEach((item) => {
                if (this.elements.length == 0)
                    return;
                this.elements[0].appendChild(item);
            });
        });
        return this;
    }
    /**
     * Wrap each element in the collection with specified element
     *
     * @category HTML manipulation
     *
     */
    wrap(wrapper) {
        this.elements.forEach((item) => {
            if (wrapper.length == 0)
                return;
            var wrapperCopy = wrapper.get(0).cloneNode();
            item.parentNode.insertBefore(wrapperCopy, item);
            wrapperCopy.appendChild(item);
        });
        return this;
    }
    val(value) {
        if (typeof value != 'string' && typeof value != 'number') {
            if (this.elements.length == 0)
                return '';
            return this.elements[0].value;
        }
        else {
            this.elements.forEach((item) => {
                item.value = value.toString();
            });
            return this;
        }
    }
    html(value, append) {
        if (typeof value != 'string' && typeof value != 'number') {
            if (this.elements.length == 0)
                return '';
            return this.elements[0].innerHTML;
        }
        else {
            this.elements.forEach((item) => {
                if (append) {
                    item.innerHTML += value.toString();
                }
                else {
                    item.innerHTML = value.toString();
                }
            });
            return this;
        }
    }
    text(value) {
        if (typeof value != 'string' && typeof value != 'number') {
            if (this.elements.length == 0)
                return '';
            return this.elements[0].textContent;
        }
        else {
            this.elements.forEach((item) => {
                item.textContent = value.toString();
            });
            return this;
        }
    }
    attr(name, value) {
        if (!value) {
            if (this.elements.length == 0)
                return '';
            return this.elements[0].getAttribute(name);
        }
        else {
            this.elements.forEach((item) => {
                item.setAttribute(name, value);
            });
            return this;
        }
    }
    /**
     * Remove an attribute on each element in the set.
     *
     * @category HTML manipulation
     *
     */
    removeAttr(name) {
        this.elements.forEach((item) => {
            item.removeAttribute(name);
        });
        return this;
    }
    data(name, value) {
        if (!value) {
            if (this.elements.length == 0)
                return '';
            return this.elements[0].dataset[name];
        }
        else {
            this.elements.forEach((item) => {
                item.dataset[name] = value;
            });
            return this;
        }
    }
}
