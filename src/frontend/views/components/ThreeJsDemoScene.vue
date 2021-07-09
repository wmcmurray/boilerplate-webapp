<script>
import {
  TorusKnotGeometry,
  MeshNormalMaterial,
  Mesh,
  GridHelper,
} from 'three'
import ThreeJsScene from 'COMMON/views/components/ThreeJsScene.vue'

/**
 * Displays an exemple of a threejs 3D scene
 *
 * How to use :
 * <three-js-demo-scene />
*/
export default {
  name: 'three-js-demo-scene',
  extends: ThreeJsScene,
  created() {
    this.$on('initialize-scene', () => {
      const geometry = new TorusKnotGeometry();
      const material = new MeshNormalMaterial();
      this.model = new Mesh( geometry, material );
      this.model.position.y = 2;
      this.scene.add( this.model );

      this.scene.add( new GridHelper( 1000, 1000 ) );

      this.camera.position.z = 4;
      this.camera.position.y = 1.5;
    });

    this.$on('update-scene', (deltaTime) => {
      this.model.rotation.x += deltaTime * 0.25;
      this.model.rotation.y += deltaTime * 0.25;
      this.model.rotation.z += deltaTime * 0.25;

      this.camera.position.z = 4 + (Math.cos(this.totalTime) * 0.125);
    });

    this.$on('render-scene', (deltaTime) => {
      // ...
    });
  },
}
</script>
