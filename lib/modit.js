console.log('loading modit');
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

  var context = {
    exports: function(method) {
      var functions = _.select(arguments, _.isFunction);
      return _.reduce(functions, function(module, func) {
        module[util.nameOf(func)] = func;
        return module;    
      },{});
    }
  };
  _.extend(util.createNamespace(name), ensureDefined(definition.apply(context, imports)));
};

modit.util = (function() {
  function nameOf(func) {
    return func.toString().match(/\s*function\s*(.*)\(/)[1];
  }

  function some(ref, func) {
    if (_.isUndefined(ref)) {
      return func();
    }
    return ref;
  }

  function createNamespace(name) {
    return _.reduce(name.split('.'), function(parentNs, ns) {
      return some(parentNs[ns], function() {
        return (parentNs[ns] = {});
      });
    }, window);
  }

  return {
    nameOf: nameOf,
    createNamespace: createNamespace,
    some: some
  };
})();
