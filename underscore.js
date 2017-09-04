// Javascript can be so much more pleasant when it's functional -- re-implement
// a bunch of utility methods from Prototype and Steele's Functional...
window._ = {

  // The cornerstone, an each implementation.
  // Handles objects implementing forEach, _each, arrays, and raw objects.
  each: function(obj, iterator, context) {
    var index = 0;
    try {
      if (obj.forEach) {
        obj.forEach(iterator, context);
      } else if (obj.length) {
        for (var i = 0; i < obj.length; i++) {
          iterator.call(context, obj[i], i);
        }
      } else if (obj._each) {
        obj._each(function(value) {
          iterator.call(context, value, index++);
        })
      } else {
        var i = 0;
        for (var key in obj) {
          var value = obj[key], pair = [key, value];
          pair.key = key;
          pair.value = value;
          iterator.call(context, pair, i++);
        }
      }
    } catch(e) {
      if (e != '__break__') throw e;
    }
    return obj;
  },

  // Determine whether all of the elements match a truth test. Delegate to
  // Javascript 1.6's every(), if it is present.
  all: function(obj, iterator, context) {
    if (obj.every) return obj.every(iterator, context);
    var result = true;
    _.each(obj, function(value, index) {
      result = result && !!iterator.call(context, value, index);
      if (!result) throw '__break__';
    });
    return result;
  },

  // Determine if at least one element in the object matches a truth test. Use
  // Javascript 1.6's some(), if it exists.
  any: function(obj, iterator, context) {
    if (obj.some) return obj.some(iterator, context);
    var result = false;
    _.each(obj, function(value, index) {
      if (result = !!iterator.call(context, value, index)) throw '__break__';
    })
  },

  // Return the results of applying the iterator to each element. Use Javascript
  // 1.6's version of map, if possible.
  map: function(obj, iterator, context) {
    if (obj.map) return obj.map(iterator, context);
    var results = [];
    _.each(obj, function(value, index) {
      results.push(iterator.call(context, value, index));
    });
    return results;
  },

  // Return the first value which passes a truth test.
  detect: function(obj, iterator, context) {
    var result;
    _.each(obj, function(value, index) {
      if (iterator.call(context, value, index)) {
        result = value;
        throw '__break__';
      }
    });
    return result;
  },

  select: function(obj, iterator, context) {
    if (obj.filter) return obj.filter(iterator, context);
    var results = [];
    _.each(obj, function(value, index) {
      if (iterator.call(context, value, index)) results.push(value);
    });
    return results;
  },

  // Determine if a given value is included in the object, based on '=='.
  include: function(obj, target) {
    if (_.isArray(obj)) if (obj.indexOf(target) != -1) return true;
    var found = false;
    _.each(obj, function(value) {
      if (value == target) {
        found = true;
        throw '__break__';
      }
    });
    return found;
  },

  // Aka reduce. Inject builds up a single result from a list of values.

}
