class Calculator {

  constructor() {
    var calc = this
    calc.display = '0'
    calc.state = {
      calc: calc,
      input: '',
      accumulator: 0.0,
      lastOperator: function() {
        var state = this;
        return state.accumulator = state.input;
      },
      execute: function() {
        var state = this;
        state.input = parseFloat(state.input || 0);
        state.lastOperator();
        state.input = '';
      }
    };
  };

  pressNumeric(value) {
    this.state.input = this.state.input.toString().split('.').length > 1 ? `${this.state.input}${value.match(/^[0-9]$/)}` : parseFloat(`${this.state.input}${value.match(/^[0-9]$/)}`);
    return this.display = this.state.input
  };

  pressDot() {
    this.state.input = (this.state.input || '0' + '.').replace(/[^\d\.]/g, "")
      .replace(/\./, "x")
      .replace(/\./g, "")
      .replace(/x/, ".");
    return this.display = this.state.input;
  };

  pressMultiply() {
    this.execute();
    this.state.lastOperator = function() {
      return this.accumulator *= this.input || 1;
    };
    return this.display = this.state.accumulator
  };

  pressAdd() {
    this.execute();
    this.state.lastOperator = function() {
      return this.accumulator -= -this.input || 0;
    };
    return this.display = this.state.accumulator
  };

  pressSubtract() {
    this.execute();
    this.state.lastOperator = function() {
      return this.accumulator -= this.input || 0;
    };
    return this.display = this.state.accumulator
  };

  pressDivide() {
    this.execute();
    this.state.lastOperator = function() {
      return this.accumulator /= this.input || 1;
    };
    return this.display = this.state.accumulator
  };

  pressEqual() {
    this.execute();
    this.state.lastOperator = function() {
      return this.accumulator = calc.display;
    };
    return this.display = this.state.accumulator
  };

  onPress(id) {
    var func = 'press' + id.charAt(0).toUpperCase() + id.slice(1);
    return this[func]();

  };

  execute() {
    this.state.execute();
  };

}
