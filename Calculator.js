class Calculator {
    
	constructor() {
        var calc_itself = this;    
		calc_itself.state = {
	  	    input: '',
            cachedInput: '',
		    accumulator: 0.0,      
            lastOperator: function() {
                var state = this;   
      	        state.accumulator = state.input;
            }
	    };

  };
  
  display() {
      return this.state.cachedInput;
  }

  pressNumeric(value) {
  	this.state.input = `${this.state.input}${value.match(/^[0-9]$/)}`;
    this.state.cachedInput = this.state.input;
  };

  pressDot() {
	this.state.input = this.state.input || '0';
    this.state.input = (this.state.input + '.').replace(/[^\d\.]/g, "")
	  .replace(/\./, "x")
	  .replace(/\./g, "")
	  .replace(/x/, ".");
	this.state.cachedInput = this.state.input;
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
  };
  
	getState() { return this.state; };
  
}