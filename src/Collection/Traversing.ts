import { CSS } from './CSS';
import { Collection } from '../Collection';
import { Elem, Selector } from './Types';

export class Traversing extends CSS {
  constructor(selector?: Selector) {
    super(selector);
  }

  /**
   * Return the previous element for each *Elem* in the collection
   * 
   * @category Traversing
   */
  public prev(): Collection {
    var collection = new Collection();

    this.forEach((item: Elem) => {
      collection.add(<Elem>item.previousElementSibling);
    });

    return collection;
  }

  /**
   * Return the previous element for each *Elem* in the collection
   * 
   * @category Traversing
   */
  public next(): Collection {
    var collection = new Collection();

    this.forEach((item: Elem) => {
      collection.add(<Elem>item.nextElementSibling);
    });

    return collection;
  }

  /**
   * Return the first element in collection
   * 
   * @category Traversing
   * @returns Collection
   */
  public first(): Collection {
    return new Collection(this.elements[0]);
  }

  /**
   * Return the last element in collection
   * 
   * @category Traversing
   * @returns Collection
   */
  public last(): Collection {
    return new Collection(this.elements[this.elements.length - 1]);
  }

  /**
   * Return the parent element for each *Elem* in the collection
   * 
   * @category Traversing
   */
  public parent(): Collection {
    var collection: Collection = new Collection();

    if (this.elements.length > 0) collection = new Collection(this.get(0).parentNode);

    return collection
  }

  /**
   * Search for a parent element matching the *selector*
   * 
   * @category Traversing
   * 
   * @param selector A css selector
   */
  public parents(selector?: string): Collection {
    var collection: Collection = new Collection();
    if (this.elements.length == 0) return collection;

    var current: Elem = this.elements[0];

    while (current.parentNode != null && current.parentNode != document.documentElement) {
      let isToBeAdded: boolean = true;
      if (selector) {
        isToBeAdded = false;
        if ((<Elem>current.parentNode).matches(selector)) isToBeAdded = true;
      }

      if (isToBeAdded) collection.add(<Elem>current.parentNode);
      current = <Elem>current.parentNode;
    }

    return collection;
  }

  /**
   * Search of children matching the *selector*
   * 
   * @category Traversing
   * 
   * @param selector A css selector
   */
  public find(selector: string): Collection {
    var collection: Collection = new Collection();

    if (this.elements.length == 0) return collection;

    var foundElements: NodeList = this.elements[0].querySelectorAll(selector);

    foundElements.forEach((element: Node) => {
      collection.add(<Elem>element);
    });

    return collection;
  }
}
