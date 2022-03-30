import { Dimensions } from './Dimensions';
import { Selector, EventCallback } from './Types';
import { Collection } from '../Collection';
export declare class Events extends Dimensions {
    constructor(selector?: Selector);
    /**
     * Attach an event handler function for one or more events to the selected elements.
     *
     * @category Events
     *
     */
    on(eventNames: string | Array<string>, callback: EventCallback, useCapture?: boolean): Collection;
    on(eventNames: string | Array<string>, selector: Selector, callback: EventCallback, useCapture?: boolean): Collection;
    /**
     * Remove an event handler function for one or more events to the selected elements.
     *
     * @category Events
     *
     */
    off(eventNames: string | Array<string>, selector?: string): Collection;
    /**
     * Trigger an event handler function for one or more events to the selected elements.
     *
     * @category Events
     *
     */
    trigger(eventName: string): Collection;
}
