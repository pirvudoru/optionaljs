optionalJs
==========

Optional monad for js to avoid nested if statements

Usage:

Assume you have the following array of items
````js
var MyType = function () {
  this.get = function (key) {
    return obj[key];
  }
};

var myObj = new MyType();
myObj.answer = {
  info: 42
};
  
var myOtherObj = new MyType();
  
var myArray = [undefined, 1, myObj, 'test', myOtherObj];
````

We want to display info of the answer of each element in an array.

Normally you would do
````js
for (var index = 0; index < myArray.length; index++) {
  var arrayItem = myArray[index];
  if ( instanceof MyType) {
    var answer = arrayItem.get('answer');
    if (answer !== undefined && answer !== null) {
      console.log(answer.info);
    }
  }
}
````

But you can do
````js
for (var index = 0; index < myArray.length; index++) {
  var infoValue = Optional.from(myArray[index]).try('get', 'answer').try('info').value();
  
  console.log(infoValue);
}
````
