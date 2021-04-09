import { Core } from './Core';
import { Elem, Selector } from './Types';
import { Collection } from '../Collection';

export class CSS extends Core {
  constructor(selector?: Selector) {
    super(selector);
  }

  /**
   * Return *true* if any *Elem* has the given class 
   * 
   * @category CSS class
   */
  public hasClass(className: string): boolean {
    let hasClass: boolean = false;

    this.forEach((item: Elem) => {
      if (item.classList.contains(className)) hasClass = true;
    });

    return hasClass;
  }

  /**
   * Add the given *classNames* to all *Elem* 
   * 
   * @category CSS class
   */
  public addClass(classNames: string): this {
    var classNameList: Array<string> = classNames.split(' ');

    this.forEach((item: Elem) => {
      item.classList.add(...classNameList);
    });

    return this;
  }

  /**
   * Remove the given *classNames* to all *Elem* 
   * 
   * @category CSS class
   */
  public removeClass(classNames: string): this {
    var classNameList: Array<string> = classNames.split(' ');

    this.forEach((item: Elem) => {
      item.classList.remove(...classNameList);
    });

    return this;
  }

  /**
   * Toggle the given *classNames* to all *Elem* 
   * 
   * @category CSS class
   */
  public toggleClass(classNames: string): this {
    var classNameList: Array<string> = classNames.split(' ');

    classNameList.forEach((className: string) => {
      this.forEach((item: Elem) => {
        item.classList.toggle(className);
      });  
    });

    return this;
  }

  /**
  * Get the value of a css property for the first element in the set of matched elements or set css properties for every matched element.
  * 
  * @category HTML manipulation
  * 
  */
  public css(name: string): string;
  public css(name: { [property: string]: string | number }): this;
  public css(name: string, value?: string, priority?: '' | 'important'): this;
  public css(name: string | { [property: string]: string | number }, value?: string, priority?: '' | 'important'): string | this {
    if (value || typeof name == 'object') {
      this.elements.forEach((item: Elem) => {
        if (!priority) priority = '';

        if (typeof name == 'object') {
          for (let property in name) {
            item.style.setProperty(property, name[property].toString(), priority);
          }
        } else {
          item.style.setProperty(name, value, priority);
        }
      });

      return this;
    } else {
      if (this.elements.length == 0) return '';

      let styles =  window.getComputedStyle(this.elements[0]);
      return styles.getPropertyValue(<string>name);
    }
  }
}
