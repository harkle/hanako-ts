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
  public css(name: string, value?: string | number, priority?: '' | 'important'): this;
  public css(name: string | { [property: string]: string | number }, value?: string | number, priority?: '' | 'important'): string | this {
    if (value !== undefined || typeof name == 'object') {
      this.elements.forEach((item: Elem) => {
        if (!priority) priority = '';

        if (typeof name == 'object') {
          for (let property in name) {
            item.style.setProperty(property, this.prepareCSSValue(property, name[property]), priority);
          }
        } else {
          item.style.setProperty(name, this.prepareCSSValue(name, value), priority);
        }
      });

      return this;
    } else {
      if (this.elements.length == 0) return '';

      let styles =  window.getComputedStyle(this.elements[0]);
      return styles.getPropertyValue(<string>name);
    }
  }

  /*
   * Auto convert px value for specific properties
   */
  private prepareCSSValue(property: string, value: string | number): string {
    let computedValue: string = value.toString();

    if (['width', 'height',
         'min-width', 'max-width',
         'min-height', 'max-height',
         'top', 'right', 'bottom', 'left',
         'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
         'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
         'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
         'font-size', 'line-height'
        ].includes(property)) {
      computedValue = (isNaN(<number>value) ?  <string>value : value + 'px');
    }

    console.log(computedValue)
    return computedValue;
  }
}
