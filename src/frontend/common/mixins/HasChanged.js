import _cloneDeep from 'lodash/cloneDeep.js'
import _isEqual from 'lodash/isEqual.js'
import { getDifferencesBetweenTwoObjects } from 'ROOT/helpers.js'

/**
* Implements a way to handle changes between two state objects
*/
export default {
  data() {
    return {
      original: null,
    };
  },
  methods: {
    /**
    * Set/update the original object
    */
    setOriginal(value) {
      this.$set(this, 'original', _cloneDeep(value));
    },

    /**
    * Return true|false if the passed value differs from the original
    */
    originalChangedFrom(value){
      return this.original ? !_isEqual(this.original, value) : null;
    },

    /**
    * Return an object with all properties that differs from the original
    */
    getChanges(value){
      if(this.original){
        try {
          return getDifferencesBetweenTwoObjects(value, this.original);
        } catch (err) {
          console.error(err);
        }
      }
      return null;
    },
  },
}
