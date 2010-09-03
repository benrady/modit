describe("sampleApp", function() {
  beforeEach(function() {
    moduleOne = require('specHelper').moduleOne;
  });
  
  it('exposes public methods', function() {
    expect(moduleOne.publicMethod()).toEqual("I'm public");
  });

  it('hides private methods', function() {
    expect(moduleOne.privateMethod).toBeUndefined();
  });

  it('warns you if you dont export anything', function() {
    try {
      modit('sample.malformed', function() {
      });
      expect(false).toEqual("should have thrown exception");
    } catch(e) {
    }
  });
});


