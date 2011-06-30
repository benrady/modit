describe("sampleApp", function() {
  var one, two, request;

  beforeEach(function() {
    one = sample.namespaceOne;
    two = sample.namespaceTwo;
    request = sample.request;
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
    expect(sample.before.b()).toEqual('a');
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


