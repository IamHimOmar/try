var math = require('mathjs');

module.exports ={
  AddNumberInArray : function(Array) {
    var result = 0;
    Array.forEach(elem => {
      result += elem;
    });
    return result;
  },  
  SquareRoot : function(Number){
    return math.sqrt(Number);
  }
};
