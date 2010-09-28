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

  function toModuleObject(module, func) {
      module = module || {};
      var functionName = util.nameOf(func);
      module[functionName] = func || module[functionName];
      return module;
  }

  function gatherExports(exports) {
    return _.reduce(
      _.select(exports, _.isFunction), 
      toModuleObject
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
    return func.toString().match(/\s*function\s*([a-zA-Z0-9_\$]*)\(/)[1];
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
    createNamespace: createNamespace,
    some: some
  };
})();
