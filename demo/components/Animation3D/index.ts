import { GraphicEngine, GraphicEngineOptions } from "../../../src/GraphicEngine";
import { Selector, Dimensions} from '../../../src/Collection/Types';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Scene } from 'three/src/scenes/Scene';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { Mesh } from 'three/src/objects/Mesh';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Component } from '../../../src/Component';
import { Color } from "three";

class Animation extends GraphicEngine {
  private scene: Scene;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  private cube: Mesh;
  private controls: OrbitControls;

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

  public resize(dimensions: Dimensions) {
    super.resize(dimensions);

    if (this.camera) {
      this.camera.aspect = this.options.width / this.options.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.options.width, this.options.height);
    }
  }

  public setup() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    
    const geometry: BoxGeometry = new BoxGeometry();
    const material: THREE.MeshBasicMaterial = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

    this.cube = new Mesh(geometry, material)

    this.scene.add(this.cube);

    this.camera.position.z = 5;

    this.renderer.setClearColor(new Color(0x000000), 0)
  }

  public animate() {
    this.cube.rotation.x += .01;
    this.cube.rotation.y += .01;

    this.controls.update();
  }

  public draw() {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  }
}

export class Animation3D extends Component {

  constructor() {
    super('Animation3D', true);
  }

  public async init(): Promise<void> {
    await super.init();
    
    new Animation('#canvas-3d', {width: 640, height: 480, alpha: true});

    this.success();
  }
}
