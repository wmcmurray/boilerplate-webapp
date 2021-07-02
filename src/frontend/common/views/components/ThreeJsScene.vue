<template>
  <div class="three-js-scene" />
</template>

<script>
import {
  Scene,
  Fog,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  ACESFilmicToneMapping,
} from 'three'
import { mapGetters } from 'vuex'
import IsInViewportMixin from 'COMMON/mixins/IsInViewport.js'

/**
 * Displays a ThreeJS 3D scene
 *
 * May emit those events :
 * - initialize-scene   :  when the scene gets initialized
 * - update-scene       :  when the scene gets updated
 * - render-scene       :  when the scene gets rendered
 *
 * How to use :
 * <three-js-scene />
*/
export default {
  name: 'three-js-scene',
  mixins: [
    IsInViewportMixin,
  ],
  data(){
    return {
      isDestroyed: false,
      totalTime: 0,
      scene: new Scene(),
      camera: new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
      renderer: new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: ACESFilmicToneMapping,
      }),
    };
  },
  created() {
    const backgroundColor = new Color(0xdddddd);

    this.$on('initialize-scene', () => {
      // this.scene.background = backgroundColor;
      this.scene.fog = new Fog(backgroundColor, 0.1, 10);
    });

    this.$on('render-scene', (deltaTime) => {
      this.renderScene();
    });
  },
  mounted() {
    // append renderer
    this.$el.appendChild( this.renderer.domElement );

    // update size
    this._onResizeHandler = this.updateRenderSize.bind(this);
    this.$root.$on('window-resize', this._onResizeHandler);
    this.updateRenderSize();

    // init scene
    this.$emit('initialize-scene');

    // start loop
    let lastTime = 0, deltaTime = 0;
    const loop = (time) => {
      deltaTime = (time - lastTime) * 0.001;
      lastTime = time;

      if(this.isRunning) {
        this.totalTime += deltaTime;
        this.$emit('update-scene', deltaTime);
        this.$emit('render-scene', deltaTime);
      }

      if(!this.isDestroyed) {
        requestAnimationFrame(loop);
      }
    };
    requestAnimationFrame(loop);
  },
  computed: {
    ...mapGetters([
      'windowHasFocus',
    ]),
    isRunning() {
      return this.windowHasFocus && this.isInViewport;
    },
  },
  methods: {
    updateRenderSize() {
      const rect = this.$el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( width, height );
      this.renderScene();
    },
    renderScene() {
      this.renderer.render(this.scene, this.camera);
    },
  },
  beforeDestroy() {
    this.isDestroyed = true;
    this.$root.$off('window-resize', this._onResizeHandler);
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";

.three-js-scene {
  height: 75vh;

  > canvas {
    height: 100% !important;
    width: 100% !important;
  }
}
</style>
