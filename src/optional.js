(function () {
  function isFunction(obj) {
    return typeof obj === 'function';
  }

  function isNull(obj) {
    return obj === undefined || obj === null;
  }

  function isNumber(obj) {
    return typeof obj === 'number';
  }

  function asArray(item) {
    var result = [];
    if (!isNull(item) && isNumber(item.length)) {
      for (var index = 0; index < item.length; index++) {
        result.push(item[index]);
      }
    }

    return result;
  }

  function resultOf(obj) {
    var result;

    if (isFunction(obj)) {
      result = obj.apply(obj, asArray(arguments).slice(1));
    } else {
      result = obj;
    }

    return result;
  }

  function Optional(item) {
    this.item = item;
  };

  Optional.from = function (item) {
    return new Optional(item);
  };

  Optional.prototype.isNull = function () {
    return this.item === undefined || this.item === null;
  };

  Optional.prototype.try = function (key) {
    var result;

    if (!this.isNull()) {
      result = resultOf.apply(null, [this.item[key]].concat(asArray(arguments).slice(1)));
    }

    return Optional.from(result);
  };

  Optional.prototype.value = function (defaultValue) {
    var result = this.item;

    if (this.isNull()) {
      result = resultOf(defaultValue);
    }

    return result;
  };

  if (typeof define === 'function' && !isNull(define.amd)) {
    define('Optional', function () {
      return Optional;
    });
  } else if (typeof module !== 'undefined' && !isNull(module)) {
    module.exports = Optional;
  } else if (typeof exports !== 'undefined' && !isNull(exports)) {
    exports.Optional = Optional;
  } else {
    window.Optional = Optional;
  }
}).call(this);