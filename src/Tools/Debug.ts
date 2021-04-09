export class Debug {
  static INFO: string = '#ffffff';
  static ACTION: string = '#6610f2';
  static WARNING: string = '#fd7e14';
  static ERROR: string = '#d63384';
  static SUCCESS: string = '#20c997';

  static isEnabled: Boolean = false;

  static log(data: any, color: string): void {
    if (Debug.isEnabled) console.log('%c' + data, 'color: ' + color);
  }
}
