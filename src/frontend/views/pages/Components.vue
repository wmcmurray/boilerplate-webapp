<template>
  <div class="components-page">

    <section class="limit-width padded text-center">
      <div class="grid-4-middle-noBottom">
        <div class="col">
          <div id="spinner-container" class="spinner-container">
            <overlay-spinner />
          </div>
        </div>
        <div class="col">
          loading<three-dots :fillVoid="true" />
        </div>
        <div class="col">
          <progress-bar />
        </div>
        <div class="col">
          <check :ok="false" />
          <check :ok="true" />
        </div>
      </div>
    </section>

    <section class="limit-width padded text-center">
      <button type="button" class="button" @click="$modal.show('demodal')">Show modal</button>
      <button type="button" class="button" v-tippy="{trigger:'click'}" title="Hello world">Tooltip</button>
      <button type="button" class="button" @click="$snotify.success('Success notif')">Show success notif</button>
      <button type="button" class="button" @click="$snotify.error('Error notif')">Show error notif</button>
      <button type="button" class="button" @click="$snotify.info('Info notif')">Show info notif</button>
    </section>

    <abstract-modal name="demodal">
      <div class="text-center" style="padding: 60px 30px;">
        <h2>Hello world</h2>
        <p>This is a modal !</p>
      </div>
    </abstract-modal>

    <hr>

    <section class="limit-width padded">
      <tabs>
        <tab title="Text content">
          <div class="grid">
            <div v-for="i in [1,2,3]" class="col-4_sm-12 text-content text-justify">
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
              <lazyimg src="https://placebear.com/500/500" ratio="square" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/400/400" ratio="square" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/600/600" ratio="square" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/700/700" ratio="square" />
            </div>
          </div>
          <div class="grid-2">
            <div class="col-12">
              <lazyimg src="https://placebear.com/800/450" ratio="landscape" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/450/800" ratio="portrait" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/900/1600" ratio="portrait" />
            </div>
          </div>
        </tab>
      </tabs>
    </section>

  </div>
</template>

<script>
export default {
  name: 'components-page',
  data: function(){
    return {}
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config";

.components-page {
  > section {
    padding-top: $globalSpacing;
    padding-bottom: $globalSpacing;
  }

  #spinner-container {
    border-radius: $globalRoundness;
  }
}
</style>
