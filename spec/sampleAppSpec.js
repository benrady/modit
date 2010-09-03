describe("sampleApp", function() {
  beforeEach(function() {
    one = require('specHelper').namespaceOne;
    two = require('specHelper').namespaceTwo;
  });
  
  it('exposes public methods', function() {
    expect(one.publicMethod()).toEqual("I'm in one");
  });

  it('hides private methods', function() {
    expect(one.privateMethod).toBeUndefined();
  });

  it('warns you if you dont export anything', function() {
    try {
      modit('sample.malformed', function() {
      });
      expect(false).toEqual("should have thrown exception");
    } catch(e) {
      expect(e.message).toMatch(/Module sample.malformed does not return its exports/);
    }
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
    spyOn(two, 'twosies').andReturn('mock twosies');
    expect(two.twosies()).toEqual("mock twosies");
    // I think I need to upgrade jasmine to get this to work
    // expect(two.twosies).toHaveBeenCalled();
  });

  it('can compose modules in modules', function() {
    // I don't think you want to do this because the dependencies
    // will be unbreakable
  });
});


