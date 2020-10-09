
interface Foo {
    exclaim(s: string): void;
    supersize(): void;
}

declare let foo: Foo;

foo.exclaim('Wat!');
foo.supersize();
