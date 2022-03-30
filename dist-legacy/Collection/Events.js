import { Dimensions } from './Dimensions';
import { EventManager } from '../Tools/EventManager';
export class Events extends Dimensions {
    constructor(selector) {
        super(selector);
    }
    on(eventNames, selector, callback, useCapture) {
        if (typeof eventNames == 'string')
            eventNames = [eventNames];
        if (typeof selector == 'function')
            callback = selector;
        if (typeof selector == 'function')
            useCapture = callback;
        eventNames.forEach((eventName) => {
            this.forEach((item) => {
                EventManager.add(item, eventName, selector, callback, useCapture);
            });
        });
        return this;
    }
    /**
     * Remove an event handler function for one or more events to the selected elements.
     *
     * @category Events
     *
     */
    off(eventNames, selector) {
        if (typeof eventNames == 'string')
            eventNames = [eventNames];
        eventNames.forEach((eventName) => {
            this.forEach((item) => {
                EventManager.remove(item, eventName, selector);
            });
        });
        return this;
    }
    /**
     * Trigger an event handler function for one or more events to the selected elements.
     *
     * @category Events
     *
     */
    trigger(eventName) {
        const event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, false);
        this.forEach((item) => {
            item.dispatchEvent(event);
        });
        return this;
    }
}
