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
}
