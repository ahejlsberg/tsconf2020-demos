
import { registerCallback } from "./framework";
import { Service } from "./service";

function foo(service: Service) {
    service.doThis();
    service.doThat();
}

registerCallback("myServiceEvent", foo);
