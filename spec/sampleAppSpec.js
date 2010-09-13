describe("sampleApp", function() {
  var win;

  beforeEach(function() {
    // Need to find a way to force node to reload this!!!
    // http://stackoverflow.com/questions/1972242/auto-reload-of-files-in-node-js
    // http://groups.google.com/group/nodejs/browse_thread/thread/c9b82171d3c7aac2
    win = require('specHelper');
    one = win.namespaceOne;
    two = win.namespaceTwo;
  });
  
  it('exposes public methods', function() {
    expect(one.publicMethod()).toEqual("I'm in one");
  });

  it('hides private methods', function() {
    expect(one.privateMethod).toBeUndefined();
  });

  it('combines modules in the same namespace', function() {
    expect(one.otherMethod()).toEqual("I'm in one");
  });

  it('can import other modules', function() {
    expect(two.twosies()).toEqual("I'm in one two three");
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

  it('can compose modules in modules', function() {
    // I don't think you want to do this because the dependencies
    // will be unbreakable
  });

  // can access sub-spaces using this.submoduleNamespace
});


