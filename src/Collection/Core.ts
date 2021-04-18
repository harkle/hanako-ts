import { Collection } from '../Collection';
import { GenericElement, Elem, Selector } from './Types';

interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

/**
 * A collection of HTML elements with shortcut methodes to simplify manipulation
 */
export class Core implements Iterable<Elem> {
  protected readonly elements: Elem[] = [];

  /**
   * *selector* can be:
   * - a string containing a CSS query
   * - a single *Elem*
   * - an array of *Elem*
   */
  constructor(selector?: Selector) {
    if (typeof selector == 'number') return;

    if (selector instanceof Collection) return <Core><unknown>selector;

    var elements: any = selector;

    if (typeof selector === 'string') elements = document.querySelectorAll(selector);

    if (elements) {
      if (elements.nodeType || elements === window) elements = [elements];

      this.elements = Array.prototype.slice.call(elements);;
    }
  }

  /**
   * @ignore
   */
  [Symbol.iterator](): Iterator<Elem> {
    return this.elements[Symbol.iterator]();
  }

  /**
   * Return the number of *Elem* in the collection
   *
   * @category Collection 
   */
  get length(): number {
    return this.elements.length
  }

  /**
   * Execute a *callback* on every *Elem*
   *
   * @category Collection 
   */
  public forEach(callback: (value: Elem, index: number, array: Elem[]) => void, thisArg?: any) {
    this.elements.forEach(callback);
  }

  /**
   * In contrary of *forEach* this function return each *Elem* as *Collection*.
   *
   * @category Collection 
   */
  public each(callback: Function): this {
    this.forEach((item: Elem, index: number) => callback(new Collection(item), index));

    return this;
  }

  /**
   * Return collection's *Elem* or a single *Elem*
   *
   * @category Collection 
   * 
   * @param index Index of the element in the collection
   */
  public get(index: number): Elem {
    return this.elements[index < 0 ? index + this.elements.length : index];
  };

  /**
   * Return a new collection containing element at the specified index.
   *
   * @category Collection 
  * 
  * @param index Index of the element in the collection
  */
  public eq(index: number): Collection {
    return new Collection(this.get(index));
  };

  /**
   * Add an *Elem* to the collection
   *
   * @category Collection 
   */
  public add(newItem: Elem) {
    var isAlreadyInCollection = false;

    this.forEach((item: Elem) => {
      if (newItem === item) isAlreadyInCollection = true;
    });

    if (!isAlreadyInCollection) this.elements.push(newItem);
  }

  /**
   * Search for a specific *Elem* in the collection
   *
   * @category Collection 
   * 
   * @param selector A css selector to search
   */
  public search(selector: string): Collection {
    var filteredElement: Collection = new Collection();

    this.forEach((item: Elem) => {
      if (item.matches(selector)) filteredElement.add(item);
    });

    return filteredElement;
  }
}
