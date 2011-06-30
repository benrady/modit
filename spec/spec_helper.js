var fs = require('fs');
var path = require('path');
var binDir = path.dirname(fs.realpathSync(__filename));
var lib  = path.join(binDir, '../lib');
var sampleAppDir = path.join(binDir, '../sampleApp');
require.paths.push(lib);
require.paths.push(sampleAppDir);

global.window = global;
global.navigator = {};

global._ = require('underscore');
require('modit');
require('moditTest');
require('sampleApp');

_.extend(exports, global.sample);
_.extend(exports, global.modit);
// I think we need to clear out the global variable here. Otherwise, the ns gets polluted.
//delete global.sample;
