export class Debug {
    static log(data, color) {
        if (Debug.isEnabled)
            console.log('%c' + data, 'color: ' + color);
    }
}
Debug.INFO = '#ffffff';
Debug.ACTION = '#6610f2';
Debug.WARNING = '#fd7e14';
Debug.ERROR = '#d63384';
Debug.SUCCESS = '#20c997';
Debug.isEnabled = false;
