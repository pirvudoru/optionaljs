optionalJs
==========

Optional monad for js to avoid nested if statements

Usage:

Assume you have the following construct
````js
MyType = function () {
  this.getProp = function (key) {
    return obj[key];
  }
};

var myObj = new MyType();
````

We want to 
