import { Collection } from '../Collection';

export type GenericElement = Window | Document | HTMLElement | Element | Node;
export type Selector = string | EventTarget | HTMLCollection | NodeList | GenericElement | GenericElement[] | ArrayLike<GenericElement> | Collection;

export interface Point {
  x?: number,
  y?: number
}

export interface Dimensions {
  width?: number,
  height?: number
}

type ElementHTML = HTMLElement & HTMLInputElement & HTMLImageElement & HTMLCanvasElement & HTMLAudioElement & Element & Node
export interface Elem extends ElementHTML {
  eventUID: number;
}
