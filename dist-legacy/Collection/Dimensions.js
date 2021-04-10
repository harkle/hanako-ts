import { HTML } from './HTML';
import { Collection } from '../Collection';
export class Dimensions extends HTML {
    constructor(selector) {
        super(selector);
    }
    width(value) {
        if (value) {
            this.elements.forEach((item) => {
                value = (typeof value == 'string') ? value : value + 'px';
                item.style.setProperty('width', value);
            });
            return this;
        }
        else {
            if (this.elements.length == 0)
                return 0;
            if (this.elements[0] === window)
                return window.innerWidth;
            return this.elements[0].getBoundingClientRect().width;
        }
    }
    height(value) {
        if (value) {
            this.elements.forEach((item) => {
                value = (typeof value == 'string') ? value : value + 'px';
                item.style.setProperty('height', value);
            });
            return this;
        }
        else {
            if (this.elements.length == 0)
                return 0;
            if (this.elements[0] === window)
                return window.innerHeight;
            return this.elements[0].getBoundingClientRect().height;
        }
    }
    /**
     * Return element position relative to other element or document
     *
     * @category Dimensions
     *
     */
    position(target) {
        if (this.elements.length == 0)
            return { x: 0, y: 0 };
        if (typeof target == 'string')
            target = new Collection(target);
        const targetPosition = (target) ? { x: target.get(0).getBoundingClientRect().x, y: target.get(0).getBoundingClientRect().y } : { x: 0, y: 0 };
        const itemBoundingClientRect = this.elements[0].getBoundingClientRect();
        const difference = { x: itemBoundingClientRect.x - targetPosition.x, y: itemBoundingClientRect.y - targetPosition.y };
        const pageScroll = (target) ? { x: 0, y: 0 } : { x: window.pageXOffset, y: window.pageYOffset };
        return {
            x: difference.x + pageScroll.x,
            y: difference.y + pageScroll.y
        };
    }
    /**
     * Return element position in viewport
     *
     * @category Dimensions
     *
     */
    viewportPosition() {
        if (this.elements.length == 0)
            return { x: 0, y: 0 };
        const itemBoundingClientRect = this.elements[0].getBoundingClientRect();
        return {
            x: itemBoundingClientRect.x,
            y: itemBoundingClientRect.y,
        };
    }
}
