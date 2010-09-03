var fs = require('fs');
global.window = global;
global.navigator = {};

require('underscore');
require('modit');
require('sampleApp');

_.extend(exports, global.sample);
