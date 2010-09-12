var sys = require('sys');

global.window = global;
global.navigator = {};

var fs = require('fs');

require('underscore');
require('modit');
require('moditTest');
require('sampleApp');

_.extend(exports, global.sample);
_.extend(exports, global.modit);
// I think we need to clear out the global variable here. Otherwise, the ns gets polluted.
//delete global.sample;
