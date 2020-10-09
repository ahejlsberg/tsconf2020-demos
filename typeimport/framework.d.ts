
export function registerService<T>(ctor: new () => T): void;
export function registerCallback<T>(eventName: string, cb: (service: T) => void): void;
