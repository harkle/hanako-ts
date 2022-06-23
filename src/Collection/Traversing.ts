import { CSS } from './CSS';
import { Collection } from '../Collection';
import { Elem, Selector } from './Types';

function* _prevAll(item: Elem) {
  while (item = <Elem>item.previousElementSibling) {
    yield item;
  }
}

function* _nextAll(item: Elem) {
  while (item = <Elem>item.nextElementSibling) {
    yield item;
  }
}

export class Traversing extends CSS {
  constructor(selector?: Selector) {
    super(selector);
  }

  /**
   * Return the previous element for each *Elem* in the collection
   * 
   * @category Traversing
   * @param selector A css selector
   * @returns Collection
   */
  public prev(selector?: string): Collection {
    var collection = new Collection();

    this.forEach((item: Elem) => {
      if (item.previousElementSibling) {
        if (!selector || item.previousElementSibling.matches(selector)) collection.add(<Elem>item.previousElementSibling);
      }
    });

    return collection;
  }

  /**
   * Return all previous elements for each *Elem* in the collection
   * 
   * @category Traversing
   * @param selector A css selector
   * @returns Collection
   */
  public prevAll(selector?: string): Collection {
    var collection = new Collection();

    this.forEach((item: Elem) => {
      [..._prevAll(item)].forEach((sibling: Elem) => {
        if (!selector || sibling.matches(selector)) collection.add(sibling);
      });
    });

    return collection;
  }

  /**
   * Return the next element for each *Elem* in the collection
   * 
   * @category Traversing
   * @param selector A css selector
   * @returns Collection
   */
  public next(selector?: string): Collection {
    var collection = new Collection();

    this.forEach((item: Elem) => {
      if (item.nextElementSibling) {
        if (!selector || item.nextElementSibling.matches(selector)) collection.add(<Elem>item.nextElementSibling);
      }
    });

    return collection;
  }

  /**
   * Return all next elements for each *Elem* in the collection
   * 
   * @category Traversing
   * @param selector A css selector
   * @returns Collection
   */
  public nextAll(selector?: string): Collection {
    var collection = new Collection();

    this.forEach((item: Elem) => {
      [..._nextAll(item)].forEach((sibling: Elem) => {
        if (!selector || sibling.matches(selector)) collection.add(sibling);
      });
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
   * @param selector A css selector
   * @returns Collection
   */
  public parent(selector?: string): Collection {
    var collection: Collection = new Collection();

    this.forEach((item: Elem) => {
      if (!selector || (<Elem>item.parentNode).matches(selector)) collection = new Collection(item.parentNode);
    });

    return collection
  }

  /**
   * Search for a parent element matching the *selector*
   * 
   * @category Traversing
   * @returns Collection
   * @param selector A css selector
   */
  public parents(selector?: string): Collection {
    var collection: Collection = new Collection();
    if (this.elements.length == 0) return collection;

    this.forEach((item: Elem) => {
      while (item.parentNode != null && item.parentNode != document.documentElement) {
        if (!selector || (<Elem>item.parentNode).matches(selector)) collection.add(<Elem>item.parentNode);

        item = <Elem>item.parentNode;
      }
    });

    return collection;
  }

  /**
   * Search of children matching the *selector*
   * 
   * @category Traversing
   * @param selector A css selector
   * @returns Collection
   */
  public find(selector: string): Collection {
    var collection: Collection = new Collection();


    this.forEach((item: Elem) => {
      var foundElements: NodeList = item.querySelectorAll(selector);

      foundElements.forEach((element: Node) => {
        collection.add(<Elem>element);
      });
    });

    return collection;
  }
}
