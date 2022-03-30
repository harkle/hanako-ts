import { Selector } from '../Collection/Types';
export declare class EventManager {
    private static eventCounter;
    private static events;
    private static uid;
    private static getContext;
    static add(item: Selector, eventName: string, selector: Function | string, callback: Function, useCapture: boolean): void;
    static remove(item: Selector, eventName: string, selector: Function | string): void;
}
