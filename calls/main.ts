
function frequentlyCalledFunction() {
    // do something useful
}

function callerA() {
    frequentlyCalledFunction();
}

function callerB() {
    callerA();
}

function callerC() {
    frequentlyCalledFunction();
}

function entryPoint() {
    callerA();
    callerB();
    callerC();
}
