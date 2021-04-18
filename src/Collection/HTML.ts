import { Traversing } from './Traversing';
import { Collection } from '../Collection';
import { Elem, Selector } from './Types';

export class HTML extends Traversing {
  constructor(selector?: Selector) {
    super(selector);
  }

  /**
   * Remove the *Elem* for the DOM.
   * 
   * @category HTML manipulation
   * 
   */
  public remove(): this {
    this.elements.forEach((item: Elem) => {
      item.remove();
    });

    return this;
  }

  /**
   * Clear all DOM children of the *Elem*
   * 
   * @category HTML manipulation
   * 
   */
  public empty(): this {
    this.elements.forEach((item: Elem) => {
      while (item.firstChild)
        item.removeChild(item.firstChild);
    });

    return this;
  }

  /**
   * Return a clone of the collection
   * 
   * @category HTML manipulation
   * 
   */
  public clone(): Collection {
    let collection = new Collection();

    this.elements.forEach((item: Elem) => {
      collection.add(<Elem>item.cloneNode(true));
    });

    return collection;
  }

  /**
   * Insert content, specified by the parameter, to the beginning of each element in the collection
   * 
   * @category HTML manipulation
   * 
   */
  public prepend(itemsArray: Collection | Collection[]): this {
    if (!Array.isArray(itemsArray)) itemsArray = [itemsArray];

    itemsArray.forEach((items: Collection) => {
      items.forEach((item: Elem) => {
        if (this.elements.length == 0) return;
        this.elements[0].insertBefore(item, this.elements[0].firstChild);
      });
    });

    return this;
  }

  /**
   * Insert content, specified by the parameter, to the end of each element in the collection
   * 
   * @category HTML manipulation
   * 
   */
  public append(itemsArray: Collection | Collection[]): this {
    if (!Array.isArray(itemsArray)) itemsArray = [itemsArray];

    itemsArray.forEach((items: Collection) => {
      items.forEach((item: Elem) => {
        if (this.elements.length == 0) return;
        this.elements[0].appendChild(item);
      });
    });

    return this;
  }

  /**
   * Wrap each element in the collection with specified element 
   * 
   * @category HTML manipulation
   * 
   */
  public wrap(wrapper: Collection): this {
    this.elements.forEach((item: Elem) => {
      if (wrapper.length == 0) return;
      var wrapperCopy = wrapper.get(0).cloneNode();
      item.parentNode.insertBefore(wrapperCopy, item);
      wrapperCopy.appendChild(item);
    });

    return this;
  }

  /**
   * Set the *value* of the first element in the collection of set the *value* of all elements in the collection.
   * 
   * @category HTML manipulation
   * 
   */
  public val(): string;
  public val(value: string | number): this;
  public val(value?: string | number): this | string {
    if (typeof value != 'string' && typeof value != 'number') {
      if (this.elements.length == 0) return '';
      return this.elements[0].value;
    } else {
      this.elements.forEach((item: HTMLInputElement) => {
        item.value = value.toString();
      });

      return this;
    }
  }

  /**
   * Set the *innerHTML* of the first element in the collection of set the *innerHTML* of all elements in the collection.
   * 
   * @category HTML manipulation
   * 
   */
  public html(): string;
  public html(value: string | number): this;
  public html(value: string | number, append?: boolean): this;
  public html(value?: string | number, append?: boolean): this | string {
    if (typeof value != 'string' && typeof value != 'number') {
      if (this.elements.length == 0) return '';
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((item: Elem) => {
        if (append) {
          item.innerHTML += value.toString();
        } else {
          item.innerHTML = value.toString();
        }
      });

      return this;
    }
  }

  /**
   * Set the text of the first element in the collection of set the text of all elements in the collection.
   * 
   * @category HTML manipulation
   * 
   */
  public text(): string;
  public text(value: string | number): this;
  public text(value?: string | number): this | string {
    if (typeof value != 'string' && typeof value != 'number') {
      if (this.elements.length == 0) return '';
      return this.elements[0].textContent;
    } else {
      this.elements.forEach((item: Elem) => {
        item.textContent = value.toString();
      });

      return this;
    }
  }

  /**
   * Get the value of an attribute for the first element in the set of matched elements or set one attribute for every matched element.
   * 
   * @category HTML manipulation
   * 
   */
  public attr(name: string): string;
  public attr(name: string, value: any): this;
  public attr(name: string, value?: any): this | string {
    if (!value) {
      if (this.elements.length == 0) return '';
      return this.elements[0].getAttribute(name);
    } else {
      this.elements.forEach((item: Elem) => {
        item.setAttribute(name, value);
      });

      return this;
    }
  }

  /**
   * Remove an attribute on each element in the set.
   * 
   * @category HTML manipulation
   * 
   */
  public removeAttr(name: string) {
    this.elements.forEach((item: Elem) => {
      item.removeAttribute(name);
    });

    return <Collection><unknown>this;
  }

  /**
   * Get the value of a data attribute for the first element in the set of matched elements or set one data attribute for every matched element.
   * 
   * @category HTML manipulation
   * 
   */
  public data(name: string): string;
  public data(name: string, value: any): this;
  public data(name: string, value?: any): string | this {
    if (!value) {
      if (this.elements.length == 0) return '';
      return this.elements[0].dataset[name];
    } else {
      this.elements.forEach((item: Elem) => {
        item.dataset[name] = value;
      });

      return this;
    }
  }
}
