class Calculator {
    
  constructor() {
	this.state = {
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
  	return this.state.input = this.state.input.toString().split('.').length > 1 ? `${this.state.input}${value.match(/^[0-9]$/)}` : parseFloat(`${this.state.input}${value.match(/^[0-9]$/)}`);
  };

  pressDot() {
	return this.state.input = (this.state.input || '0' + '.').replace(/[^\d\.]/g, "")
	  .replace(/\./, "x")
	  .replace(/\./g, "")
	  .replace(/x/, ".");
  };

  pressMultiply() {
  	this.execute();
    this.state.lastOperator = function() {
    	return this.accumulator *= this.input || 1;
    };
  };
  
  pressAdd() {
  	this.execute();
    this.state.lastOperator = function() {
    	return this.accumulator -= -this.input || 0;
    };
  };
  
  pressSubtract() {
  	this.execute();
    this.state.lastOperator = function() {
    	return this.accumulator -=  this.input || 0;
    };
  };
  
  pressDivide() {
  	this.execute();
    this.state.lastOperator = function() {
    	return this.accumulator /= this.input || 1;
    };
  };
  
  pressEqual() {
  	this.execute();
    this.state.lastOperator = function() {
    	return this.accumulator;
    };
  };
  
  onPress(id) {
    var func = 'press' + id.charAt(0).toUpperCase() + id.slice(1);
    this[func]();
	return this.state.accumulator;
  };

  execute() {
	this.state.execute();
  };  
  
}
