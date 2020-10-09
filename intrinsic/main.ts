
type T10 = Uppercase<'hello'>;  // "HELLO"
type T11 = Lowercase<'HELLO'>;  // "hello"
type T12 = Capitalize<'hello'>;  // "Hello"
type T13 = Uncapitalize<'Hello'>;  // "hello"

type T20 = Uppercase<'foo' | 'bar' | 'baz'>;  // "FOO" | "BAR"

type EventName<S extends string> = `on${Capitalize<S>}Changed`;

type T21 = EventName<'foo'>;

type SnakeToCamelCase<S extends string> =
    S extends `${infer T}_${infer U}` ? `${Lowercase<T>}${SnakeToPascalCase<U>}` :
    S extends `${infer T}` ? `${Lowercase<T>}` :
    SnakeToPascalCase<S>;

type SnakeToPascalCase<S extends string> =
    string extends S ? string :
    S extends `${infer T}_${infer U}` ? `${Capitalize<Lowercase<T>>}${SnakeToPascalCase<U>}` :
    S extends `${infer T}` ? `${Capitalize<Lowercase<T>>}` :
    never;

type T30 = SnakeToPascalCase<'hello_world_foo'>;  // 'HelloWorldFoo'
type T31 = SnakeToPascalCase<'FOO_BAR_BAZ'>;  // 'FooBarBaz'
type T32 = SnakeToCamelCase<'hello_world_foo'>;  // 'helloWorldFoo'
type T33 = SnakeToCamelCase<'FOO_BAR_BAZ'>;  // 'fooBarBaz'
