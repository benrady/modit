---
title: Modit -- Javascript Modules with Superpowers
---

# Modit: Javascript Modules with Superpowers

Modit is a library for creating JavaScript modules, similar to those espoused by [Dogulas Crockford](http://javascript.crockford.com/style2.html). It encourages highly testable, decoupled, encapsulated designs. It works in web browsers and in node.js.

### Superpower #1: Less Code

Creating javascript modules with modit saves you a lot of boilerplate code. Compare this:

    if (sample === undefined) {
      sample = {};
    }
    sample.namespace = function() {
      function internalFunction() {
        return "internal";
      }
    
      function exportedFunction() {
        return "exported";
      }
      
      var exports = {
        exportedFunction: exportedFunction
      };
      return exports;
    }

to this:

    modit('sample.namespace', function() {
      function internalFunction() {
        return "internal";
      }
    
      function exportedFunction() {
        return "exported";
      }
      this.exports(exportedFunction);
    });

### Superpower #2: Explicit (Conditional) Exports

Modit modules can export functions any number of times, from anywhere in the code, and can even do so conditionally

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

### Superpower #3: Explicit Dependencies

Modit modules can explicitly declare their imports and refer to them by a shortened name:

    modit('sample.namespaceTwo', ['sample.namespace', 'other.namespace.ui'], function(sample, ui) {
      function twosies() {
        return sample.exportedFunction() + ui.formatName("two");
      }
      this.exports(twosies);
    });

### Superpower #4: Shared Namespaces

Multiple modules can contribute to the same namespace, all while maintaining their own private scope for functions and state. For example, these two modules can be defined in any file, and loaded in any order:

    modit('sample.namespace', function() {
      var name = 'alpha';
      function getName() { return name; }
      function alpha() { return getName(); }
      this.exports(alpha);
    });
    
    modit('sample.namespace', function() {
      var name = 'beta';
      function getName() { return name; }
      function beta() { return getName(); }
      this.exports(beta);
    });

And this test will still pass:

    it('keeps modules seperate', function() {
      expect(sample.namespace.alpha()).toEqual('alpha');
      expect(sample.namespace.beta()).toEqual('beta');
    });

### Superpower #5: Testability

Modit was designed from the ground up to create very decoupled, testable modules. To facilitate this, it comes with it's own [mocking framework](http://github.com/benrady/modit/blob/master/spec/moditTestSpec.js) that plays nicely with other frameworks (like the one provided by Jasmine.js)

### About Modit

Modit was written by Ben Rady, and is distribuited under the MIT License

Copyright (c) 2010 Ben Rady <benrady@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

