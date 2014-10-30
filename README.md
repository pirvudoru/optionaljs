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
  
var myArray = [undefined, myObj, 'test', myOtherObj];
````

We want to display info of the answer of each element in an array.

Normally you would do
````js
for (var index = 0; index < myArray.length; index++) {
  var arrayItem = myArray[index];
  if (arrayItem instanceof MyType) {
    var answer = arrayItem.get('answer');
    if (answer !== undefined && answer !== null) {
      console.log(answer.info);
    }
  }
}

// Output
> undefined
> 42
> undefined
> undefined

````

But you can do
````js
for (var index = 0; index < myArray.length; index++) {
  var infoValue = Optional.from(myArray).try(index).try('get', 'answer').try('info').value();
  
  console.log(infoValue);
}

// Output
> undefined
> 42
> undefined
> undefined

````

Additionally, you can provide a default value in case the final result is null or undefined:
````js
for (var index = 0; index < myArray.length; index++) {
  var infoValue = Optional.from(myArray)
                          .try(index)
                          .try('get', 'answer')
                          .try('info')
                          .value('Element at ' + i + ' does not have an answer info');
  
  console.log(infoValue);
}

> Element at 0 does not have an answer info
> 42
> Element at 1 does not have an answer info
> Element at 3 does not have an answer info

````

Or you can provide a function as a default value provider:
````js
var totalEmptyAnswerInfo = 0;
for (var index = 0; index < myArray.length; index++) {
  var infoValue = Optional.from(myArray)
                          .try(index)
                          .try('get', 'answer')
                          .try('info')
                          .value(function () {
                            return 'Found ' + (++totalEmptyAnswerInfo) + ' elements without an answer info';
                          });
  
  console.log(infoValue);
}

// Output
> Found 1 elements without an answer info
> 42
> Found 2 elements without an answer info
> Found 3 elements without an answer info

````
