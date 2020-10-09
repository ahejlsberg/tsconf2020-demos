
//#region Awaiting promises

type Awaited<T> =
    T extends null | undefined ? T :
    T extends PromiseLike<infer U> ? Awaited<U> :
    T;

type P01 = Awaited<Promise<string>>;  // string
type P02 = Awaited<Promise<Promise<string>>>;  // string
type P03 = Awaited<Promise<string | Promise<Promise<number> | undefined>>>;  // string | number | undefined

//#endregion

//#region Awaiting promises before 4.1

type Awaited2<T> =
    T extends null | undefined ? T :
    {
        0: T extends PromiseLike<infer U> ? Awaited2<U> : never
        1: T,
    }[T extends PromiseLike<any> ? 0 : 1];

type P11 = Awaited2<Promise<string>>;  // string
type P12 = Awaited2<Promise<Promise<string>>>;  // string
type P13 = Awaited2<Promise<string | Promise<Promise<number> | undefined>>>;  // string | number | undefined

//#endregion

//#region Flattening arrays

type ElementType<T> = T extends readonly (infer U)[] ? ElementType<U> : T;

type Flatten<T extends readonly unknown[]> = T extends unknown[] ? ElementType<T>[] : readonly ElementType<T>[];

type A1 = Flatten<string[][][]>;  // string[]
type A2 = Flatten<string[][] | readonly (number[] | boolean[][])[]>;  // string[] | readonly (number | boolean)[]

type InfiniteArray<T> = InfiniteArray<T>[];

type E1 = ElementType<InfiniteArray<string>>;  // Infinite depth error

//#endregion

//#region Repeating tuples

type TupleOf<T, N extends number> =
    N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;

type _TupleOf<T, N extends number, R extends unknown[]> =
    R['length'] extends N ? R : _TupleOf<T, N, [...R, T]>;

type T1 = TupleOf<string, 3>;  // [string, string, string]
type T2 = TupleOf<number, 0 | 2 | 4>;  // [] | [number, number] | [number, number, number, number]
type T3 = TupleOf<number, number>;  // number[]
type T4 = TupleOf<number, 100>;  // Depth error

//#endregion

//#region Reversing tuples

type Reverse<T> =
    T extends [] ? T :
    T extends [infer Head, ...infer Tail] ? [...Reverse<Tail>, Head] :
    T;

type T10 = Reverse<[string, number, boolean]>;

//#endregion
