describe("sampleApp", function() {
  var win;

  beforeEach(function() {
    // Need to find a way to force node to reload this!!!
    // http://stackoverflow.com/questions/1972242/auto-reload-of-files-in-node-js
    // http://groups.google.com/group/nodejs/browse_thread/thread/c9b82171d3c7aac2
    win = require('specHelper');
    one = win.namespaceOne;
    two = win.namespaceTwo;
    request = win.request;
  });
  
  it('exposes public methods', function() {
    expect(one.publicMethod()).toEqual("one");
  });

  it('hides private methods', function() {
    expect(one.privateMethod).toBeUndefined();
  });

  it('can import a single function', function() {
    expect(two.callPub()).toEqual("one");
  });

  it('can import multiple functions', function() {
    expect(two.name('test')).toEqual("one one test");
  });

  it('combines modules in the same namespace', function() {
    expect(one.otherMethod()).toEqual("one");
    expect(_.keys(one)).toEqual(['foo', 'publicMethod', 'otherMethod', 'alpha', 'beta']);
  });

  it('can import other namespaces', function() {
    expect(two.twosies()).toEqual("one two three");
  });

  it('can import namespaces before they are defined', function() {
    expect(win.before.b()).toEqual('a');
  });

  it('provides access to the current namespace via this', function() {
    expect(one.foo).toEqual('thisVar');
  });

  it('can mock out interactions with other modules by hand', function() {
    two.twosies = function() {return 'mock twosies';};
    expect(two.twosies()).toEqual("mock twosies");
  });

  it('can mock out interactions with other modules using jasmine', function() {
    spyOn(one, 'publicMethod').andReturn('mock one');
    // This works across files, but not within a single spec
    // Need node.js module reloading for it to work properly
    //expect(two.twosies()).toEqual("mock one two three");
    //expect(one.publicMethod).toHaveBeenCalled();
  });

  it('can conditionally export functions', function() {
    expect(request.asyncUpdate).toBeDefined();
    expect(request.openSocket).toBeUndefined();
  });

  it('keeps modules seperate', function() {
    expect(one.alpha()).toEqual('alpha');
    expect(one.beta()).toEqual('beta');
  });

});


