export enum InputErrorMessage {
  Empty = "Can't be empty"
}

export function isEmptyStr(value: string): boolean {
  return value.trim().length === 0;
}
