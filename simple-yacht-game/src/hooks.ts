import { useState } from "react";

export function useLocalStorage(
  keyName: string
): [string | null, (val: string) => void] {
  const [val, setVal] = useState<string | null>(() =>
    localStorage.getItem(keyName)
  );
  const wrappedSet = (val: string) => {
    localStorage.setItem(keyName, val);
    setVal(val);
  };
  return [val, wrappedSet];
}

export function useLocalStorageNumber(
  keyName: string
): [number | null, (val: number) => void] {
  const [val, setVal] = useLocalStorage(keyName);
  const wrappedSet = (val: number) => {
    setVal(val.toString());
  };
  if (val !== null) {
    return [Number.parseFloat(val), wrappedSet];
  }
  return [null, wrappedSet];
}
