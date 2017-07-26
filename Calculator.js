class Calculator {

  constructor() {
    var calc = this
    calc.state = {
      calc: calc,
      display: '0',
      input: '',
      accumulator: 0.0,
      lastOperator: function() {
        var state = this;
        state.accumulator = state.input;
      },
      execute: function() {
        var state = this;
        state.input = parseFloat(state.input || 0);
        state.lastOperator();
        state.display = state.accumulator;
        state.input = '';
      }
    };
  };

  pressNumeric(value) {
    this.state.input = this.state.input.toString().split('.').length > 1 ? `${this.state.input}${value.match(/^[0-9]$/)}` : parseFloat(`${this.state.input}${value.match(/^[0-9]$/)}`);
    this.state.display = this.state.input
  };

  pressDot() {
    this.state.input = ((this.state.input || '0') + '.')
    .replace(/[^\d\.]/g, "")
     .replace(/\./, "x")
      .replace(/\./g, "")
       .replace(/x/, ".");
    this.state.display = this.state.input;
  };

  pressMultiply() {
    this.execute();
    this.state.lastOperator = function() {
      this.accumulator *= this.input || 1;
    };
  };

  pressAdd() {
    this.execute();
    this.state.lastOperator = function() {
      this.accumulator -= -this.input || 0;
    };

  };

  pressSubtract() {
    this.execute();
    this.state.lastOperator = function() {
      this.accumulator -= this.input || 0;
    };

  };

  pressDivide() {
    this.execute();
    this.state.lastOperator = function() {
      this.accumulator /= this.input || 1;
    };

  };

  pressEqual() {
    this.execute();
    this.state.lastOperator = function() {
      this.accumulator = this.display;
    };

  };

  onPress(id) {
    var func = 'press' + id.charAt(0).toUpperCase() + id.slice(1);
    this[func]();
  };

  display() {
    return this.state.display;
  }

  execute() {
    this.state.execute();
  };

}
