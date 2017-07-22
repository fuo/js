// var test = require('tape');

// var Calculator = require('./Calculator');

// const calc = new Calculator();

// test('timing test', function (t) {

// calc.pressNumeric("3");

// t.equal(5, calc.getState().input);
    
//   t.end();

// });


const calc = new Calculator();

calc.pressNumeric("3");

QUnit.test( "hello test", function( assert ) {
  assert.ok( 3 == calc.result, "press on 3 should see 3" );
});