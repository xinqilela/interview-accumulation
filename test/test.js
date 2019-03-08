function foo() {
    return a++;
}

function foo2() {
    var a = 0;
    return foo();
}

// console.log(foo2());
console.log(typeof a);
var a=1;
console.log(typeof a);
function a() {

}
console.log(typeof a);