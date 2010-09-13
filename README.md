---
title: Modit -- Javascript Modules with Superpowers
---

# Modit: Javascript Modules with Superpowers

Modit is a library for creating JavaScript modules, similar to those espoused by (Dogulas Crockford)[http://javascript.crockford.com/style2.html]. It encourages highly testable, decoupled, encapsulated designs. It works in web browsers and in node.js.

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

### Superpower #2: Explicit Dependencies

### Superpower #3: Explicit (Conditional) Exports

### Superpower #4: Shared Namespaces

### Superpower #5: Testability

== Using Modit ==



But the real power of modit comes in how modules interact. Not only is it easy to compose and combine modules, it's easy to mock out those dependencies for testing purposes.

== Modit Developer Setup == 

# Install node.js
wget http://nodejs.org/dist/node-v0.1.103.tar.gz
tar -xf node-v0.1.103.tar.gz
cd node-v0.1.103
./configure
make
sudo make install

== Running Tests == 

$ gem install watchr
$ watchr nodejs.watchr
