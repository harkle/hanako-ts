import { Collection } from '../Collection';
import { Selector, Dimensions, Point } from '../Collection/Types';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Scene } from 'three/src/scenes/Scene';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { GraphicEngine, GraphicEngineOptions } from './GraphicEngine';

export class GraphicEngine2D extends GraphicEngine {
  public bufferDimensions: Dimensions;

  protected context: CanvasRenderingContext2D;

  constructor(selector: Selector, options?: GraphicEngineOptions) {
    super(selector, options);

    if (this.length == 0) return;

    this.context = this.get(0).getContext('2d', {
      alpha: this.options.alpha
    });

    this.setup();
  }

  public clear() {
    if (this.options.clear && this.context) this.context.clearRect(0, 0, this.bufferDimensions.width, this.bufferDimensions.height);
  }

  public resize(dimensions: Dimensions) {
    super.resize(dimensions);

    this.get(0).width = this.options.width * <number>this.options.pixelRatio;
    this.get(0).height = this.options.height * <number>this.options.pixelRatio;

    this.bufferDimensions = {
      width: this.options.width * <number>this.options.pixelRatio,
      height: this.options.height * <number>this.options.pixelRatio
    }
  }

  public line(from: Point, to: Point) {
    if (!this.context) return;

    this.context.beginPath()
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(to.x, to.y);
    this.context.stroke();
  }
}
