class Calculator {
    
	constructor() {
        var calc_itself = this;    
		calc_itself.state = {
	  	    input: '',
            result: '',
		    accumulator: 0.0,      
            lastOperator: function() {
                var state = this;   
      	        return state.accumulator = state.input;
            }
	    };

  };
  
  pressNumeric(value) {
  	this.state.input = this.state.result.toString().split('.').length > 1 ? `${this.state.input}${value.match(/^[0-9]$/)}` : parseFloat(`${this.state.input}${value.match(/^[0-9]$/)}`);
    return this.state.result = this.state.input;
  };

  pressDot() {
	this.state.input = this.state.input || '0';
    this.state.input = (this.state.input + '.').replace(/[^\d\.]/g, "")
	  .replace(/\./, "x")
	  .replace(/\./g, "")
	  .replace(/x/, ".");
	this.state.result = this.state.input;
  };

  pressMultiply() {
  	this.execute();
    this.state.lastOperator = function() {
    	return this.accumulator = (this.accumulator || 0) * (this.input || 1);
    };
  };
  
  pressAdd() {
  	this.execute();
    this.state.lastOperator = function() {
    	return this.accumulator = (this.accumulator || 0) - (-this.input || 0);
    };
  };
  
  pressSubtract() {
  	this.execute();
    this.state.lastOperator = function() {
    	return this.accumulator = (this.accumulator || 0) - (this.input || 0);
    };
  };
  
  pressDivide() {
  	this.execute();
    this.state.lastOperator = function() {
    	return this.accumulator = (this.accumulator || 0) / (this.input || 1);
    };
  };
  
  pressEqual() {
  	this.execute();
    this.state.lastOperator = function() {
    	return this.accumulator = this.result;
    };
  };
  
  onPress(id) {
    var func = 'press' + id.charAt(0).toUpperCase() + id.slice(1);
    this[func]();
	return this.state.result;
  };

  execute() {
	this.state.input = parseFloat(this.state.input || 0);
    this.state.result = this.state.lastOperator();
    this.state.input = '';
  };  
  
}