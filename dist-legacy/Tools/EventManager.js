import { Collection } from '../Collection';
function checkParents(items, eventTarget) {
    var realItem;
    items.forEach((item) => {
        if (item === eventTarget) {
            realItem = item;
            return;
        }
        var parent = eventTarget.parentNode;
        while (parent !== document) {
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
    static uid() {
        return EventManager.eventCounter++;
    }
    static getContext(uid, item, selector) {
        const contextSelect = (typeof selector == 'string') ? selector + '_' : '';
        let context = '';
        if (item === window) {
            context = 'w_';
        }
        else if (item === document) {
            context = 'd_' + contextSelect;
        }
        else {
            context = 'e_' + contextSelect + uid + '_';
            Object.defineProperty(item, 'eventUID', {
                value: uid,
                writable: true
            });
        }
        return context;
    }
    static add(item, eventName, selector, callback) {
        const context = EventManager.getContext(EventManager.uid(), item, selector) + eventName;
        EventManager.events[context] = function (event) {
            if (typeof selector == 'string') {
                var realTarget = checkParents(new Collection(selector), event.target);
                if (realTarget)
                    callback.call(realTarget, event, new Collection(realTarget));
            }
            else {
                callback.call(this, event, new Collection(this));
            }
        };
        item.addEventListener(eventName, EventManager.events[context]);
    }
    static remove(item, eventName, selector) {
        const uid = (item !== document && item !== window) ? item.eventUID : 0;
        const context = EventManager.getContext(uid, item, selector) + eventName;
        item.removeEventListener(eventName, EventManager.events[context]);
        delete EventManager.events[context];
    }
}
EventManager.eventCounter = 0;
EventManager.events = {};
