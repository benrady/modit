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
require('sampleApp');
