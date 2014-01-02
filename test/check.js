var assert = require('assert');
var stackback = require('../');

var parsed = function(str) {
    var parts = str.split(' ');
    return {
        'function': parts[0] === 'null' ? null : parts[0],
        'file': parts[1] === 'null' ? null : parts[0],
        'line': parts[2] - 0 || null,
        'column': parts[3] - 0 || null
    };
};

module.exports = function(expected, stack) {
    if (typeof expected === 'string') {
        expected = [parsed(expected)];
    }
    else {
        for (var i=0 ; i<expected.length ; ++i) {
            expected[i] = parsed(expected[i]);
        }
    }

    assert.deepEqual(expected, stackback(stack));
};
