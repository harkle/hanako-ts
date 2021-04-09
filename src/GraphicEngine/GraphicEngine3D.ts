import { Collection } from '../Collection';
import { Selector, Dimensions, Point } from '../Collection/Types';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Scene } from 'three/src/scenes/Scene';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { GraphicEngine, GraphicEngineOptions } from './GraphicEngine';

export class GraphicEngine3D extends GraphicEngine {
  public scene: Scene;
  public renderer: WebGLRenderer;
  public camera: PerspectiveCamera;

  constructor(selector: Selector, options?: GraphicEngineOptions) {
    super(selector, options);

    if (this.length == 0) return;

    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      canvas: this.get(0),
      antialias: this.options.antialias,
      alpha: this.options.alpha
    });

    this.camera = new PerspectiveCamera(75, this.options.width / this.options.height, 0.1, 1000);

    this.renderer.setSize(this.options.width, this.options.height);

    this.setup();
  }

  protected render() {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  }

  public resize(dimensions: Dimensions) {
    super.resize(dimensions);

    if (this.camera) {
      this.camera.aspect = this.options.width / this.options.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.options.width, this.options.height);
    }

    this.render();
  }
}


