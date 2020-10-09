
//#region Template literal types

type EventName<T extends string> = `${T}Changed`;

type T0 = EventName<'foo'>;  // 'fooChanged'
type T1 = EventName<'foo' | 'bar' | 'baz'>;  // 'fooChanged' | 'barChanged' | 'bazChanged'

type T2 = `${'top' | 'bottom'}-${'left' | 'right'}`;  // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type T3 = `${'abc' | 42 | true | -1234n}`;  // 'abc' | '42' | 'true' | '-1234'

type StringDashString = `${string}-${string}`;
type StringDashNumber = `${string}-${number}`;

let sds: StringDashString = 'hello-world';
let sdn: StringDashNumber = 'hello-42';

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type FourDigits = `${Digit}${Digit}${Digit}${Digit}`;

//#endregion

//#region Template literal type inference

type MatchPair<S extends string> = S extends `[${infer A},${infer B}]` ? [A, B] : unknown;

type T10 = MatchPair<'[1,2]'>;  // ['1', '2']
type T11 = MatchPair<'[foo,bar]'>;  // ['foo', 'bar']
type T12 = MatchPair<' [1,2]'>;  // unknown
type T13 = MatchPair<'[123]'>;  // unknown
type T14 = MatchPair<'[1,2,3,4]'>;  // ['1', '2,3,4']

//#endregion

//#region Inference with recursive conditional types

type Trim<S extends string> =
    S extends ` ${infer T}` ? Trim<T> :
    S extends `${infer T} ` ? Trim<T> :
    S;

type T20 = Trim<'     hello   '>;
type T21 = Trim<' hello           '>;

type Join<T extends unknown[], D extends string> =
    T extends [] ? '' :
    T extends [string | number | boolean | bigint] ? `${T[0]}` :
    T extends [string | number | boolean | bigint, ...infer U] ? `${T[0]}${D}${Join<U, D>}` :
    string;

type T30 = Join<[1, 2, 3, 4], '.'>;  // '1.2.3.4'
type T31 = Join<['foo', 'bar', 'baz'], '-'>;  // 'foo-bar-baz'
type T32 = Join<[], '.'>;  // ''
type T33 = Join<['A', 'B', 'C'], ''>;

type Split<S extends string, D extends string> =
    string extends S ? string[] :
    S extends '' ? [] :
    S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] :
    [S];

type T40 = Split<'foo', '.'>;  // ['foo']
type T41 = Split<'foo.bar.baz', '.'>;  // ['foo', 'bar', 'baz']
type T42 = Split<'foo.bar', ''>;  // ['f', 'o', 'o', '.', 'b', 'a', 'r']
type T43 = Split<any, '.'>;  // string[]

//#endregion

//#region Mapped type 'as' clauses

type OnPropChangedMethods<T> = {
    [P in keyof T & string as `${P}Changed`]: (cb: (newValue: T[P]) => void) => void
}

declare function makeWatchedObject<T>(obj: T): T & OnPropChangedMethods<T>;

let homer = makeWatchedObject({
    firstName: "Homer",
    age: 42,
    location: "Springfield",
});

//#endregion

//#region Promisify

type Promisify<T> =
    T extends (...args: [...infer A, (err: any, res?: infer R) => void]) => void ?
        (...args: A) => Promise<R> :
        never;

type PromisifyObject<T> = {
    [P in keyof T & string as Promisify<T[P]> extends never ? never : `${P}Async`] : Promisify<T[P]>
};

type FS = {
    version: string;
    open(path: string, cb: (err: any, fd: number) => void): void;
    read(fd: number, buffer: Uint8Array, count: number, cb: (err: any, bytesRead: number) => void): void;
    close(fd: number, cb: (err: any) => void): void;
}

declare let fs: FS;
declare let fsa: FS & PromisifyObject<FS>;

//#endregion

//#region Dotted paths

type PathKeys<T> =
    object extends T ? string :
    T extends readonly any[] ? Extract<keyof T, `${number}`> | SubKeys<T, Extract<keyof T, `${number}`>> :
    T extends object ? Extract<keyof T, string> | SubKeys<T, Extract<keyof T, string>> :
    never;

type SubKeys<T, K extends string> = K extends keyof T ? `${K}.${PathKeys<T[K]>}` : never;

type PropType<T, Path extends string> =
    Path extends keyof T ? T[Path] :
    Path extends `${infer K}.${infer R}` ? K extends keyof T ? PropType<T[K], R> : unknown :
    unknown;

declare function getProp<T, P extends PathKeys<T>>(obj: T, path: P): PropType<T, P>;

const obj = {
    name: 'John',
    age: 42,
    cars: [
        { make: 'Ford', age: 10 },
        { make: 'Trabant', age: 35 }
    ]
} as const;

let make = getProp(obj, 'cars.1.make');  // 'Trabant'

//#endregion
