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
                        item.style.setProperty(property, this.prepareCSSValue(property, name[property]), priority);
                    }
                }
                else {
                    item.style.setProperty(name, this.prepareCSSValue(name, value), priority);
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
    /*
     * Auto convert px value for specific properties
     */
    prepareCSSValue(property, value) {
        let computedValue = value.toString();
        if (['width', 'height',
            'min-width', 'max-width',
            'min-height', 'max-height',
            'top', 'right', 'bottom', 'left',
            'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
            'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
            'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
            'font-size', 'line-height'
        ].includes(property)) {
            computedValue = value + 'px';
        }
        return computedValue;
    }
}
