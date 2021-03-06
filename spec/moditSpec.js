describe("modit", function() {
  require('modit');
  var util;

  beforeEach(function() {
    util = modit.util;
  });
  
  it('creates namepaces', function() {
    modit.util.createNamespace('foo.bar.baz');
    expect(foo.bar.baz).toEqual({});
  });

  it('does not overwrite existing namespaces', function() {
    var first = modit.util.createNamespace('foo');
    var second = modit.util.createNamespace('foo');
    expect(first).toBe(second);
  });

  it('pulls function names from source code', function() {
    function foo() {
    }
    function inline() { foo(); }
    local = function() {
    };
    expect(util.nameOf(foo)).toEqual('foo');
    expect(util.nameOf(inline)).toEqual('inline');
    //expect(util.nameOf(local)).toEqual('local');
  });
});
