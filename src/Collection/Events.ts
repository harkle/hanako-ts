import { Dimensions } from './Dimensions';
import { EventManager } from '../Tools/EventManager';
import { Elem, Selector, EventCallback} from './Types';
import { Collection } from '../Collection';

export class Events extends Dimensions {
  constructor(selector?: Selector) {
    super(selector);
  }

  /**
   * Attach an event handler function for one or more events to the selected elements.
   * 
   * @category Events
   * 
   */
  public on(eventNames: string | Array<string>, callback: EventCallback, useCapture?: boolean): Collection;
  public on(eventNames: string | Array<string>, selector: Selector, callback: EventCallback, useCapture?: boolean): Collection;
  public on(eventNames: string | Array<string>, selector?: any, callback?: any, useCapture?: boolean): Collection {
    if (typeof eventNames == 'string') eventNames = [eventNames];
    if (typeof selector == 'function') callback = selector;
    if (typeof selector == 'function') useCapture = callback;

    eventNames.forEach((eventName: string) => {
      this.forEach((item: Elem) => {
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
  public off(eventNames: string | Array<string>, selector?: string): Collection {
    if (typeof eventNames == 'string') eventNames = [eventNames];
    eventNames.forEach((eventName: string) => {
      this.forEach((item: Elem) => {
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
  public trigger(eventName: string): Collection {
    const event: Event = document.createEvent('HTMLEvents')
    event.initEvent(eventName, true, false);

    this.forEach((item: Elem) => {
      item.dispatchEvent(event);
    });

    return this;
  }
}
