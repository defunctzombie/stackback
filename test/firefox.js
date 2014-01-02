var check = require('./check');

suite ('firefox');

test('3.x - strip start line', function() {
    var stack = 'Error("foobar")@:0\n()@about:blank:61';
    check('null about:blank 61 null', stack);
});

test('3.x and 4 - functions', function() {

    // lines with function arguments
    var stack = 'foo("a")@about:blank:65';
    check('foo about:blank 65 null', stack);

    // no function, is this anonymous?
    var stack = '()@about:blank:70';
    check('null about:blank 70 null', stack);

    // anonymous function
    var stack = 'anonymous()@about:blank:60';
    check('anonymous about:blank 60 null', stack);

    // no function but have args
    var stack = '([object Event])@about:blank:60';
    check('null about:blank 60 null', stack);
});

test('firefox 14 - functions', function() {
    var stack = 'foo@about:blank:65';
    check('foo about:blank 65 null', stack);

    var stack = '@about:blank:61';
    check('null about:blank 61 null', stack);

    var stack = 'anonymous@about:blank:60';
    check('anonymous about:blank 60 null', stack);
});

test('firefox 25 - functions', function() {
    var stack = 'anonymous/</bar@about:blank:61';
    check('bar about:blank 61 null', stack);

    var stack = 'anonymous/</<@about:blank:70';
    check('null about:blank 70 null', stack);

    var stack = 'anonymous/<@about:blank:69';
    check('null about:blank 69 null', stack);
});
