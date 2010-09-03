modit('sample.moduleOne', function() {
  this.foo = 'thisVar';

  function privateMethod() {
    return "I'm public";
  }

  function publicMethod() {
    return privateMethod();
  }

  return this.exports(publicMethod);
});

modit('sample.moduleOne', function() {
  function otherMethod() {
    return this.publicMethod();
  }
  return this.exports(otherMethod);
});
