// @flow

export function invariant(condition: mixed, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}
