describe("modit.mock", function() {
  var mock;

  beforeEach(function() {
    mock = require('specHelper').mock;
  });

  describe("lets you create mock functions", function() {
    var mockFunction;

    beforeEach(function() {
      mockFunction = mock.func('first', 'second');
    });

    it('that records its callers', function() {
      mockFunction(1, 2);

      expect(mockFunction.first).toEqual(1);
      expect(mockFunction.second).toEqual(2);
    });

    it('that disregards excess arguments', function() {
      mockFunction(1, 2, 3);

      expect(mockFunction.first).toEqual(1);
      expect(mockFunction.second).toEqual(2);
    });

    it('that leave insufficent arguments undefined', function() {
      mockFunction(1);

      expect(mockFunction.first).toEqual(1);
      expect(mockFunction.second).toBeUndefined();
    });

    it('that will not replace well known names on the function object', function() {
      try {
        mock.func('prototype')(1);
        neverGetHere();
      } catch(e) {
        expect(e.toString()).toMatch(/Invalid argument name 'prototype'/);
      }
    });
  });

  it('lets you create functions from a value', function() {
    expect(mock.funcify('value')()).toEqual('value');
  });

  describe('lets you create namespace test spies', function() {
    it('using an object definition', function() {
      var dubNs = mock.dub({functionOne: [], functionTwo: ['arg1', 'arg2']});

      dubNs.functionOne();
      dubNs.functionTwo(1, 2);

      expect(dubNs.functionOne.callCount).toEqual(1);
      expect(dubNs.functionTwo.callCount).toEqual(1);
      expect(dubNs.functionTwo.arg1).toEqual(1);
      expect(dubNs.functionTwo.arg2).toEqual(2);
    });

    it('and set expectations using Jasmine spies', function() {
    });
  });
});
