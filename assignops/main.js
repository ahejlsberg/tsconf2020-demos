"use strict";
function f1(a, b) {
    let x1 = a || b; // x1 = a ? a : b
    let x2 = a && b; // x2 = a ? b : a
    let x3 = a !== null && a !== void 0 ? a : b; // x3 = a !== undefined && a !== null ? a : b
}
function f2(a, b) {
    a || (a = b); // a || (a = b) -- Assign if a is falsy
    a && (a = b); // a && (a = b) -- Assign if a is truthy
    a !== null && a !== void 0 ? a : (a = b); // a ?? (a = b) -- Assign if a is nullish
}
