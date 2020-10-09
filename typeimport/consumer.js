import { registerCallback } from "./framework";
function foo(service) {
    service.doThis();
    service.doThat();
}
registerCallback("myServiceEvent", foo);
