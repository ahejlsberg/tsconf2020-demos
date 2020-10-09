
//#region Variadic tuple elements

type Foo<T extends unknown[]> = [string, ...T, number];

type T1 = Foo<[boolean]>;  // [string, boolean, number]
type T2 = Foo<[number, number]>;  // [string, number, number, number]
type T3 = Foo<[]>;  // [string, number]

//#endregion

//#region Strongly typed tuple concatenation

function concat<T extends unknown[], U extends unknown[]>(t: readonly [...T], u: readonly [...U]): [...T, ...U] {
    return [...t, ...u];
}

const ns = [0, 1, 2, 3];  // number[]

const t1 = concat([1, 2], ['hello']);  // [number, number, string]
const t2 = concat([true], t1);  // [boolean, number, number, string]
const t3 = concat([true], ns);  // [boolean, ...number[]]

//#endregion

//#region Inferring parts of tuple types

declare function last<T extends unknown[], U>(a: readonly [...T, U]): U;

const a = ['hello', 'world', 42];

last(['foo', 42, true]);  // boolean
last(['foo', 42]);  // number
last(['foo']);  // string
last(a);  // string | number

//#endregion

//#region Head Tail Init Last

type Head<T extends readonly unknown[]> = T[0];
type Tail<T extends readonly unknown[]> = T extends readonly [any, ...infer U] ? U : [...T];

type Init<T extends readonly unknown[]> = T extends readonly [...infer U, any] ? U : [...T];
type Last<T extends readonly unknown[]> = T extends readonly [...infer _, infer U] ? U : undefined;

type TS1 = Head<[number, string, boolean]>;  // number
type TS2 = Tail<[number, string, boolean]>;  // [string, boolean]
type TS3 = Init<[number, string, boolean]>;  // [number, string]
type TS4 = Last<[number, string, boolean]>;  // boolean

//#endregion

//#region Inferring to a composite tuple type

function bind<T extends unknown[], U extends unknown[], R>(f: (...args: [...T, ...U]) => R, ...a: T) {
    return (...b: U) => f(...a, ...b);
}

const fn1 = (a: number, b: string, c: boolean, d: string[]) => 0;

const c0 = bind(fn1);  // (a: number, b: string, c: boolean, d: string[]) => number
const c1 = bind(fn1, 1);  // (b: string, c: boolean, d: string[]) => number
const c2 = bind(fn1, 1, 'abc');  // (c: boolean, d: string[]) => number
const c3 = bind(fn1, 1, 'abc', true);  // (d: string[]) => number
const c4 = bind(fn1, 1, 'abc', true, ['x', 'y']);  // () => number

//#endregion

//#region Labeled tuple elements

type Callback<A extends unknown[]> = (context: unknown, ...args: A) => void;

type CB1 = Callback<[string]>;
type CB2 = Callback<[number, number]>;

type F1 = (x: number, y: number) => void;
type P1 = Parameters<F1>;

type CB3 = Callback<P1>;

declare let cb1: CB1;
declare let cb2: CB2;

cb1(undefined, 'hello');
cb2(undefined, 1, 2);

//#endregion

//#region Spreads in array literals

function foo3<T extends unknown[], U extends unknown[]>(t: readonly [...T], u: readonly [...U]) {
    return [1, ...t, 2, ...u, 3] as const;  // readonly [1, ...T, 2, ...U, 3]
}

const t = foo3(['hello'], [10, true]);  // readonly [1, string, 2, number, boolean, 3]

//#endregion

//#region Spreads in argument lists

declare function fs1(a: number, b: string, c: boolean, ...d: number[]): void;

function fs2(t1: [number, string], t2: [boolean], a1: number[]) {
    fs1(1, 'abc', true, 42, 43, 44);
    fs1(...t1, true, 42, 43, 44);
    fs1(...t1, ...t2, 42, 43, 44);
    fs1(...t1, ...t2, ...a1);
    fs1(...t1);  // Error: Expected at least 3 arguments, but got 2
    fs1(...t1, 45);  // Error: Type '45' is not assignable to type 'boolean'
}

//#endregion
