import { Core } from './Core';
export class CSS extends Core {
    constructor(selector) {
        super(selector);
    }
    /**
     * Return *true* if any *Elem* has the given class
     *
     * @category CSS class
     */
    hasClass(className) {
        let hasClass = false;
        this.forEach((item) => {
            if (item.classList.contains(className))
                hasClass = true;
        });
        return hasClass;
    }
    /**
     * Add the given *classNames* to all *Elem*
     *
     * @category CSS class
     */
    addClass(classNames) {
        var classNameList = classNames.split(' ');
        this.forEach((item) => {
            item.classList.add(...classNameList);
        });
        return this;
    }
    /**
     * Remove the given *classNames* to all *Elem*
     *
     * @category CSS class
     */
    removeClass(classNames) {
        var classNameList = classNames.split(' ');
        this.forEach((item) => {
            item.classList.remove(...classNameList);
        });
        return this;
    }
    /**
     * Toggle the given *classNames* to all *Elem*
     *
     * @category CSS class
     */
    toggleClass(classNames) {
        var classNameList = classNames.split(' ');
        classNameList.forEach((className) => {
            this.forEach((item) => {
                item.classList.toggle(className);
            });
        });
        return this;
    }
    css(name, value, priority) {
        if (value || typeof name == 'object') {
            this.elements.forEach((item) => {
                if (!priority)
                    priority = '';
                if (typeof name == 'object') {
                    for (let property in name) {
                        item.style.setProperty(property, name[property].toString(), priority);
                    }
                }
                else {
                    item.style.setProperty(name, value, priority);
                }
            });
            return this;
        }
        else {
            if (this.elements.length == 0)
                return '';
            let styles = window.getComputedStyle(this.elements[0]);
            return styles.getPropertyValue(name);
        }
    }
}
