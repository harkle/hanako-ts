import { Collection } from '../Collection';
export declare type GenericElement = Window | Document | HTMLElement | Element | Node;
export declare type Selector = string | EventTarget | HTMLCollection | NodeList | GenericElement | GenericElement[] | ArrayLike<GenericElement> | Collection;
export declare type GenericEvent = Event & MouseEvent & KeyboardEvent & WheelEvent & TouchEvent;
export declare type EventCallback = (event: GenericEvent, item: Collection) => void;
export interface Point {
    x?: number;
    y?: number;
}
export interface Dimensions {
    width?: number;
    height?: number;
}
declare type ElementHTML = HTMLElement & HTMLInputElement & HTMLImageElement & HTMLCanvasElement & HTMLAudioElement & Element & Node;
export interface Elem extends ElementHTML {
    eventUID: number;
}
export {};
