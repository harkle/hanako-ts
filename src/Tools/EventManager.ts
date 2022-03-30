import { Elem, Selector } from '../Collection/Types';
import { Collection } from '../Collection';

function checkParents(items: Collection, eventTarget: EventTarget): Elem {
  var realItem: Elem;

  items.forEach((item: Elem) => {
    if (item === eventTarget) {
      realItem = item;

      return;
    }

    var parent: Node = (<Elem>eventTarget).parentNode;
    while (parent !== document && parent) {
      if (item === parent) {
        realItem = item;
        return;
      }

      parent = parent.parentNode;
    }
  });

  return realItem;
}

export class EventManager {
  private static eventCounter: number = 0;
  private static events: {[key: string]: EventListener} = {};

  private static uid(): number {
    return EventManager.eventCounter++;
  }

  private static getContext(uid: number, item: Selector, selector: Function | string): string {
    const contextSelect: string = (typeof selector == 'string') ? selector + '_' : '';
    
    let context = '';

    if (item === window) {
      context = 'w_';
    } else if (item === document) {
      context = 'd_' + contextSelect;
    } else {
      context = 'e_' + contextSelect + uid + '_';
      Object.defineProperty(item, 'eventUID', {
        value: uid,
        writable: true
      });
    }

    return context;
  }

  public static add(item: Selector, eventName: string, selector: Function | string, callback: Function, useCapture: boolean) {
    const context: string = EventManager.getContext(EventManager.uid(), item, selector) + eventName;
    
    EventManager.events[context] = function (event: Event) {
      if (typeof selector == 'string') {
        var realTarget: Elem = checkParents(new Collection(selector), event.target);
        if (realTarget) callback.call(realTarget, event, new Collection(realTarget));
      } else {
        callback.call(this, event, new Collection(this));
      }
    };

    (<Elem>item).addEventListener(eventName, EventManager.events[context], useCapture);
  }

  public static remove(item: Selector, eventName: string, selector: Function | string) {
    const uid: number = (item !== document && item !== window) ? (<Elem>item).eventUID : 0;
    const context: string = EventManager.getContext(uid, item, selector) + eventName;

    (<Elem>item).removeEventListener(eventName, EventManager.events[context]);

    delete EventManager.events[context];
  }
}
