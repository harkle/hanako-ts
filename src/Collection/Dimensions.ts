import { HTML } from './HTML';
import { Collection } from '../Collection';
import { Point, Elem, Selector } from './Types';

export class Dimensions extends HTML {
  constructor(selector?: Selector) {
    super(selector);
  }

  /**
   * Get or set the width of an element in pixels
   * 
   * @category Dimensions
   * 
   */
  public width(): number;
  public width(value: number): this;
  public width(value: string): this;
  public width(value?: number | string): number | this {
    if (value) {
      this.elements.forEach((item: Elem) => {
        value = (typeof value == 'string') ? value : value + 'px';
        item.style.setProperty('width', value);
      });

      return this;
    } else {
      if (this.elements.length == 0) return 0;
      if (this.elements[0] === <Selector>window) return window.innerWidth;
      return this.elements[0].getBoundingClientRect().width;
    }
  }

  /**
   * Get or set the height of an element in pixels
   * 
   * @category Dimensions
   * 
   */
  public height(): number;
  public height(value: number): this;
  public height(value: string): this;
  public height(value?: number | string): number | this {
    if (value) {
      this.elements.forEach((item: Elem) => {
        value = (typeof value == 'string') ? value : value + 'px';
        item.style.setProperty('height', value);
      });

      return this;
    } else {
      if (this.elements.length == 0) return 0;
      if (this.elements[0] === <Selector>window) return window.innerHeight;
      return this.elements[0].getBoundingClientRect().height;
    }
  }

  /**
   * Return element position relative to other element or document
   * 
   * @category Dimensions
   * 
   */
   public position(target?: string | Collection): Point {
    if (this.elements.length == 0) return {x: 0, y: 0};
    if (typeof target == 'string') target = new Collection(target);

    const targetPosition: Point = (target) ? {x: target.get(0).getBoundingClientRect().x, y: target.get(0).getBoundingClientRect().y}: {x: 0, y:0};
    const itemBoundingClientRect: DOMRect = this.elements[0].getBoundingClientRect();
    const difference: Point = {x: itemBoundingClientRect.x - targetPosition.x , y: itemBoundingClientRect.y - targetPosition.y}
    const pageScroll = (target) ? {x: 0, y: 0} : {x: window.pageXOffset, y: window.pageYOffset};

    return {
      x: difference.x + pageScroll.x,
      y: difference.y + pageScroll.y
    }
  }

  /**
   * Return element position in viewport
   * 
   * @category Dimensions
   * 
   */
  public viewportPosition(): Point {
    if (this.elements.length == 0) return {x: 0, y: 0};
    const itemBoundingClientRect: DOMRect = this.elements[0].getBoundingClientRect();

    return {
      x: itemBoundingClientRect.x,
      y: itemBoundingClientRect.y,
    }
  }
}
