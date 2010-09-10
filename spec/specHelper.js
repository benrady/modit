var sys = require('sys');

global.window = global;
global.navigator = {};

var fs = require('fs');

require('underscore');
require('modit');
require('sampleApp');

_.extend(exports, global.sample);
// I think we need to clear out the global variable here. Otherwise, the ns gets polluted.
//delete global.sample;
