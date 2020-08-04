import _isEqual from 'lodash/isEqual.js'
import _transform from 'lodash/transform.js'
import _isObject from 'lodash/isObject.js'

/**
* Deep diff between two objects
*/
export function getDifferencesBetweenTwoObjects(object, base) {
  const changes = function(object, base) {
    return _transform(object, (result, value, key) => {
      if (!_isEqual(value, base[key])) {
        result[key] = (_isObject(value) && _isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}
