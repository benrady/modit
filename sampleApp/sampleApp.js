modit('sample.moduleOne', function() {
  this.foo = 'thisVar';

  function privateMethod() {
    publicMethod();
  }

  function publicMethod() {
    return "I'm public";
  }

  return this.exports(publicMethod);
});

//modit('sample.moduleTwo', function() {
//  function otherMethod() {
//  }
//  return this.exports();
//});
