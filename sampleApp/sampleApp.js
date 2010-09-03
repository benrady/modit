modit('sample.namespaceOne', function() {
  this.foo = 'thisVar';

  function privateMethod() {
    return "I'm in one";
  }

  function publicMethod() {
    return privateMethod();
  }

  return this.exports(publicMethod);
});

modit('sample.namespaceOne', function() {
  function otherMethod() {
    return this.publicMethod();
  }
  return this.exports(otherMethod);
});

modit('sample.namespaceThree', function() {
  function name() {
    return "three";
  }
  return this.exports(name);
});

modit('sample.namespaceTwo', ['sample.namespaceOne', 'sample.namespaceThree'], function(one, three) {
  function twosies() {
    return one.publicMethod() + " two " + three.name();
  }
  return this.exports(twosies);
});
