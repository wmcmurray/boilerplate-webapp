<template>
  <div class="components-page">

    <section class="limit-width padded text-center">
      <div class="grid-4_sm-2-middle-noBottom">
        <div class="col">
          <div id="spinner-container" class="spinner-container">
            <overlay-spinner />
          </div>
        </div>
        <div class="col">
          loading<three-dots :fillVoid="true" />
        </div>
        <div class="col clickable" @click="currProgress = (Math.random() * 100)">
          <progress-bar :current="currProgress" />
        </div>
        <div class="col">
          <check :ok="false" />
          <check :ok="true" />
        </div>
      </div>
    </section>

    <section class="limit-width padded text-center">
      <div class="buttons-container">
        <button type="button" @click="$modal.show('demodal')">Show modal</button>
        <button type="button" @click="$snotify.success('Success notif')">Show success notif</button>
        <button type="button" @click="$snotify.error('Error notif')">Show error notif</button>
        <button type="button" @click="$snotify.info('Info notif')">Show info notif</button>
        <button type="button" class="wireframe" v-tippy title="Hello world">Tooltip</button>
      </div>
    </section>

    <abstract-modal name="demodal">
      <div class="text-center" style="padding: 60px 30px;">
        <h2>Hello world</h2>
        <p>This is a modal !</p>
      </div>
    </abstract-modal>

    <hr>

    <hero-picture backgroundImage="https://placeimg.com/1000/480/arch" class="bg-inverted">
      <h2>Hero picture title</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <button type="button" class="inverted">click here for reasons</button>
    </hero-picture>

    <section>
      <auto-slider :items="autoSliderPictures" />
    </section>

    <section id="tabs-section" class="limit-width padded">
      <tabs>

        <tab title="Text content">
          <div class="grid">
            <div v-for="i in [1,2]" class="col-6_sm-12 text-content text-justify">
              <p v-if="i == 1">Lorem ipsum dolor sit amet, <i>consectetur adipisicing elit</i>, sed do eiusmod <a href="#">tempor incididunt</a> ut labore et <b>dolore</b> magna aliqua.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p v-if="i !== 2">Consectidunt ut labore et dolore magna aliqua. Ut enim ad minetur adipisicing elit, sed do eiusmod tempor incidim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p v-if="i == 2">Fed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </tab>

        <tab title="Bear pictures">
          <div class="grid-4">
            <div class="col">
              <lazyimg src="https://placebear.com/500/500" ratio="square" :zoomable="true" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/400/400" ratio="square" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/600/600" ratio="square" :zoomable="true" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/700/700" ratio="square" />
            </div>
          </div>
          <div class="grid-2">
            <div class="col-12">
              <lazyimg src="https://placebear.com/800/450" ratio="landscape" :zoomable="true" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/450/800" ratio="portrait" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/900/1600" ratio="portrait" />
            </div>
          </div>
        </tab>

        <tab title="Forms">
          <form class="grid-1" autocomplete="off">
            <div class="col">
              <input type="text" placeholder="Input text">
            </div>
            <div class="col">
              <input type="date" placeholder="Input date">
            </div>
            <div class="col">
              <input type="time" placeholder="Input time">
            </div>
            <div class="col">
              <input type="file" placeholder="Input file">
            </div>
            <div class="col">
              <input type="color" placeholder="Input color">
            </div>
            <!-- <div class="col">
              <input type="tel" placeholder="Input tel">
            </div>
            <div class="col">
              <input type="url" placeholder="Input url">
            </div> -->
            <!-- <div class="col">
              <input type="password" placeholder="Input password">
            </div> -->
            <div class="col">
              <input type="number" min="0" max="99" placeholder="Input number">
            </div>
            <div class="col">
              <select placeholder="Select">
                <option value="1">option 1</option>
                <option value="2">option 2</option>
                <option value="3">option 3</option>
              </select>
            </div>
            <div class="col">
              <textarea placeholder="Textarea"></textarea>
            </div>
            <div class="col">
              <label>
                <input type="checkbox" placeholder="Input checkbox" checked>
                Input checkbox
              </label>
            </div>
            <div class="col">
              <label>
                <input type="radio" name="radio1" value="1" placeholder="Input radio" checked>
                Input radio 1
              </label>
            </div>
            <div class="col">
              <label>
                <input type="radio" name="radio1" value="2" placeholder="Input radio">
                Input radio 2
              </label>
            </div>
            <div class="col">
              <label>
                <input type="radio" name="radio1" value="3" placeholder="Input radio">
                Input radio 3
              </label>
            </div>
          </form>
        </tab>

        <tab title="ThreeJS">
          <three-js-demo-scene />
        </tab>

      </tabs>
    </section>

    <section>
      <three-js-demo-scene />
    </section>

    <div class="limit-width padded">
      <h2>Responsive classes test :</h2>
    </div>
    <section class="test-responsive">
      <pre><b>.hidden-xs</b> <span class="hidden-xs">VISIBLE</span></pre>
      <pre><b>.hidden-sm</b> <span class="hidden-sm">VISIBLE</span></pre>
      <pre><b>.hidden-md</b> <span class="hidden-md">VISIBLE</span></pre>
      <pre><b>.hidden-lg</b> <span class="hidden-lg">VISIBLE</span></pre>
      <pre><b>.hidden-xl</b> <span class="hidden-xl">VISIBLE</span></pre>

      <br>

      <pre><b>.hidden-xs-up</b> <span class="hidden-xs-up">VISIBLE</span></pre>
      <pre><b>.hidden-sm-up</b> <span class="hidden-sm-up">VISIBLE</span></pre>
      <pre><b>.hidden-md-up</b> <span class="hidden-md-up">VISIBLE</span></pre>
      <pre><b>.hidden-lg-up</b> <span class="hidden-lg-up">VISIBLE</span></pre>
      <pre><b>.hidden-xl-up</b> <span class="hidden-xl-up">VISIBLE</span></pre>

      <br>

      <pre><b>.hidden-xs-down</b> <span class="hidden-xs-down">VISIBLE</span></pre>
      <pre><b>.hidden-sm-down</b> <span class="hidden-sm-down">VISIBLE</span></pre>
      <pre><b>.hidden-md-down</b> <span class="hidden-md-down">VISIBLE</span></pre>
      <pre><b>.hidden-lg-down</b> <span class="hidden-lg-down">VISIBLE</span></pre>
      <pre><b>.hidden-xl-down</b> <span class="hidden-xl-down">VISIBLE</span></pre>

      <br>

      <div class="grid-noBottom text-center">
        <div class="col xs-hidden"><pre><b>xs</b> COL</pre></div>
        <div class="col sm-hidden"><pre><b>sm</b> COL</pre></div>
        <div class="col md-hidden"><pre><b>md</b> COL</pre></div>
        <div class="col lg-hidden"><pre><b>lg</b> COL</pre></div>
      </div>
    </section>

  </div>
</template>

<script>
import AbstractPage from 'COMMON/views/pages/AbstractPage.vue'
import HeroPicture from 'COMMON/views/components/HeroPicture.vue'
import AutoSlider from 'COMMON/views/components/AutoSlider.vue'
import ThreeJsDemoScene from 'ROOT/views/components/ThreeJsDemoScene.vue'

export default {
  name: 'components-page',
  extends: AbstractPage,
  components: {
    HeroPicture,
    AutoSlider,
    ThreeJsDemoScene,
  },
  data(){
    return {
      currProgress: 25,
      autoSliderPictures: [
        'https://placeimg.com/300/150',
        'https://placeimg.com/300/151',
        'https://placeimg.com/300/152',
        'https://placeimg.com/300/153',
        'https://placeimg.com/300/154'
      ],
    };
  },
  created() {
    this.seoParams.title = 'Components demo';
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";

.components-page {
  > section {
    padding-top: $globalSpacing;
    padding-bottom: $globalSpacing;

    &:first-child {
      padding-top: 0px;
    }
    &:last-child {
      padding-bottom: 0px;
    }
  }

  #spinner-container {
    border-radius: $globalRoundness;
  }

  .test-responsive {
    padding-top: $globalSpacing !important;
    padding-bottom: $globalSpacing !important;
    background-color: rgba(white, 0.5);

    pre {
      margin: 5px 0px;
    }
  }
}
</style>
