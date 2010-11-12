modit('sample.namespaceOne', function() {
  this.foo = 'thisVar';

  function privateMethod() {
    return "I'm in one";
  }

  function publicMethod() {
    return privateMethod();
  }
  this.exports(publicMethod);
});

modit('sample.namespaceOne', function() {
  function otherMethod() {
    return this.publicMethod();
  }
  this.exports(otherMethod);
});

modit('sample.namespaceThree', function() {
  function name() {
    return "three";
  }
  this.exports(name);
});

modit('sample.namespaceTwo', ['sample.namespaceOne', 'sample.namespaceThree'], function(one, three) {
  function twosies() {
    return one.publicMethod() + " two " + three.name();
  }
  this.exports(twosies);
});

modit('sample.namespaceTwo', ['sample.namespaceOne#publicMethod'], function(pub) {
  function callPub() {
    return pub();
  }
  this.exports(callPub);
});

modit('sample.request', function() {
  function openSocket() {
    return new WebSocket("ws://" + window.location.hostname);
  }

  if("WebSocket" in window){ this.exports(openSocket); }

  function asyncUpdate(options) {
    $.ajax(options);
  }

  this.exports(asyncUpdate);
});

modit('sample.namespaceOne', function() {
  var name = 'alpha';
  function getName() { return name; }
  function alpha() { return getName(); }
  this.exports(alpha);
});

modit('sample.before', ['sample.after'], function(after) {
  function b (arg) {
    return after.a();
  }
  this.exports(b);
});

modit('sample.after', function() {
  function a (arg) {
    return "a";
  }
  this.exports(a);
});

modit('sample.namespaceOne', function() {
  var name = 'beta';
  function getName() { return name; }
  function beta() { return getName(); }
  this.exports(beta);
});
