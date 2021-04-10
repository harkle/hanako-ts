import { Collection } from './Collection';
import { Selector, Dimensions } from './Collection/Types';

export interface GraphicEngineOptions {
  width?: number,
  height?: number,
  clear?: boolean,
  pixelRatio?: number | 'device',
  antialias?: boolean,
  alpha?: boolean
}

const defaultOptions: GraphicEngineOptions = {
  width: 320,
  height: 240,
  clear: true,
  pixelRatio: 'device',
  antialias: true,
  alpha: false
}

export abstract class GraphicEngine extends Collection {
  protected options: GraphicEngineOptions;
  protected framecount: number = 0;

  constructor(selector: Selector, options?: GraphicEngineOptions) {
    super(selector);

    this.options = { ...defaultOptions, ...options };

    if (this.options.pixelRatio == 'device') this.options.pixelRatio = window.devicePixelRatio;

    this.resize();

    window.requestAnimationFrame(this.requestAnimationFrame);
  }

  private requestAnimationFrame = () => {

    if (this.options.clear) this.clear();

    this.animate();

    this.draw();

    this.render();

    this.framecount++;

    window.requestAnimationFrame(this.requestAnimationFrame);
  }

  public resize(dimensions?: Dimensions) {
    if (dimensions) {
      this.options.width = dimensions.width;
      this.options.height = dimensions.height;  
    }

    this.attr('width', this.options.width);
    this.attr('height', this.options.height);

    this.css({
      width: this.options.width,
      height: this.options.height
    });
  }

  public setup() { }

  protected clear() { }

  public animate() { }

  public draw() { }

  protected render() { }
}


