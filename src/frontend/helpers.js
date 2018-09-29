import _isEqual from 'lodash/isEqual'
import _transform from 'lodash/transform'
import _isObject from 'lodash/isObject'

/**
* Deep diff between two objects
*/
export function getDifferencesBetweenTwoObjects(object, base) {
  function changes(object, base) {
    return _transform(object, function(result, value, key) {
      if (!_isEqual(value, base[key])) {
        result[key] = (_isObject(value) && _isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}
