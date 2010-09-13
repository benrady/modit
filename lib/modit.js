modit = function() {
  var util = modit.util;
  var name = _.first(arguments);
  var definition = _.last(arguments);
  var imports = _.map(_.flatten(_.select(arguments, _.isArray)), function(arg) {
    return util.createNamespace(arg);
  });

  function ensureDefined(ref) {
    return util.some(ref, function() {
      throw new Error("Module " + name + " does not return its exports. (Did you forget to call 'return this.exports()'?)");
    });
  }

  function gatherExports(exports) {
    return _.reduce(
      _.select(exports, _.isFunction), 
      util.toObject(function(module, func) {
        module[util.nameOf(func)] = func;
      })
    );
  }

  function exports(method) {
    _.extend(util.createNamespace(name), gatherExports(arguments));
  }
  var context = {};
  context.exports = exports;
  definition.apply(context, imports);
};

modit.util = (function() {
  function nameOf(func) {
    return func.toString().match(/\s*function\s*(.*)\(/)[1];
  }

  function toObject(func) {
    return function(memo, value) {
      memo = memo || {};
      memo[value] = func(memo, value) || memo[value];
      return memo;
    };
  }

  function some(ref, func) {
    if (_.isUndefined(ref)) {
      return func();
    }
    return ref;
  }

  function createNamespace(name) {
    return _.reduce(name.split('.'), function(parentNs, ns) {
      return (parentNs[ns] = parentNs[ns] || {});
    }, window);
  }

  return {
    nameOf: nameOf,
    toObject: toObject, 
    createNamespace: createNamespace,
    some: some
  };
})();
