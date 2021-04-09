import { GraphicEngineOptions } from "../../../src/GraphicEngine/GraphicEngine";
import { Selector } from '../../../src/Collection/Types';
import { GraphicEngine3D } from '../../../src/GraphicEngine/GraphicEngine3D';
import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { Mesh } from 'three/src/objects/Mesh';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Component } from '../../../src/Component';
import { Color } from "three";

class Animation extends GraphicEngine3D {
  private cube: Mesh;
  private controls: OrbitControls;

  constructor(selector: Selector, options?: GraphicEngineOptions) {
    super(selector, options);
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
