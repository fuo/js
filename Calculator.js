class Calculator {
    
	constructor() {
        var calc_itself = this;    
        calc_itself.result = 0;
		calc_itself.state = {
	  	    input: '',
            cachedInput: 0.0,
		    accumulator: 0.0,      
            lastOperator: function() {
                var state = this;   
      	        state.accumulator = state.input;
            },
            dot: 0
	    };

  };
  
  display() {
      return this.result;
  }

  pressNumeric(value) {
  	this.state.input = (`${this.state.input}${value.match(/^[0-9]$/)}`);
    this.state.cachedInput = this.state.input;

    this.result = this.state.input;
  };

  pressDot() {
	this.state.input = this.state.input || '0';
    this.state.input = (this.state.input + '.').replace(/[^\d\.]/g, "")
	  .replace(/\./, "x")
	  .replace(/\./g, "")
	  .replace(/x/, ".");
    this.state.dot = 1;

    this.result = this.state.input;
  };

  pressMultiply() {
  	this.execute();
    this.state.lastOperator = function() {
    	this.accumulator = (this.accumulator || 0) * (this.input || 1);
    };
  };
  
  pressAdd() {
  	this.execute();
    this.state.lastOperator = function() {
    	this.accumulator = (this.accumulator || 0) + (this.input || 0);
    };
  };
  
  pressSubtract() {
  	this.execute();
    this.state.lastOperator = function() {
    	this.accumulator = (this.accumulator || 0) - (this.input || 0);
    };
  };
  
  pressDivide() {
  	this.execute();
    this.state.lastOperator = function() {
    	this.accumulator = (this.accumulator || 0) / (this.input || 1);
    };
  };
  
  pressEqual() {
  	this.execute();
    this.state.lastOperator = function() {
    	this.accumulator = this.cachedInput;
    };
  };
  
  onPress(id) {
    var func = 'press' + id.charAt(0).toUpperCase() + id.slice(1);
    this[func]();
  };

  execute() {
	this.state.input = parseFloat(this.state.input);
  	this.state.lastOperator();
    this.state.cachedInput = this.state.accumulator;
    this.state.input = '';
    this.state.dot = 0;

    this.result = this.state.cachedInput;
  };
  
	getState() { return this.state; };
  
}