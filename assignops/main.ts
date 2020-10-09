
function f1(a: boolean, b: boolean) {
    let x1 = a || b;  // x1 = a ? a : b
    let x2 = a && b;  // x2 = a ? b : a
    let x3 = a ?? b;  // x3 = a !== undefined && a !== null ? a : b
}

function f2(a: boolean, b: boolean) {
    a ||= b;  // a || (a = b) -- Assign if a is falsy
    a &&= b;  // a && (a = b) -- Assign if a is truthy
    a ??= b;  // a ?? (a = b) -- Assign if a is nullish
}
