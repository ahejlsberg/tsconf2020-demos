
type A = { kind: 'a', foo: string };
type B = { kind: 'b', foo: number };
type C = { kind: 'c', foo: number };

type AB = A & B;  // never
type BC = B & C;  // never

declare let bc: B & C;
let foo = bc.foo;  // Error, but previously was ok

declare let x: A | (B & C);
let a: A = x;  // Ok, but previousy was error
