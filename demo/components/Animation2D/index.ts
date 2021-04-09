import { GraphicEngineOptions } from "../../../src/GraphicEngine/GraphicEngine";
import { Selector } from '../../../src/Collection/Types';
import { GraphicEngine2D } from "../../../src/GraphicEngine/GraphicEngine2D";
import { Component } from '../../../src/Component';

class Animation extends GraphicEngine2D {
  private imageData: ImageData;
  private buffer: Uint32Array;
  private alphaLimit: number;
  private waveCounter: number;

  constructor(selector: Selector, options?: GraphicEngineOptions) {
    super(selector, options);
  }

  public setup() {
    this.imageData = this.context.createImageData(this.bufferDimensions.width, this.bufferDimensions.height);
    this.buffer = new Uint32Array(this.imageData.data.buffer);
    this.alphaLimit = .5;
    this.waveCounter = 0;

    const increase = Math.PI * 2 / 100;
    setInterval(() => {
      this.alphaLimit = Math.sin(this.waveCounter) / 2 + .5;

      this.waveCounter += increase;
    }, 40);

    setInterval(() => {
      let len: number = this.buffer.length - 1;
      while (len--) this.buffer[len] = Math.random() < this.alphaLimit ? 0 : 0xffffffff;
    }, 40);
  }

  public animate() {
  }

  public draw() {
    this.context.putImageData(this.imageData, 0, 0);
  }
}

export class Animation2D extends Component {

  constructor() {
    super('Animation2D', true);
  }

  public async init(): Promise<void> {
    await super.init();

    const canvas2D = new Animation('#canvas-2d', { width: 640, height: 480, pixelRatio: 1 });

    this.success();
  }
}
