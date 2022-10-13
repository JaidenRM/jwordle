import { useState } from "react";

interface LocalStorageOptions<T> {
  parseJsonToItem?: (k: string, v: any) => any;
  overwriteExistingItem?: (existingItem: T, newItem: T) => boolean;
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options?: LocalStorageOptions<T>
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);

    if (item) {
      const parsedItem = JSON.parse(item, options?.parseJsonToItem) as T;

      if (
        !options?.overwriteExistingItem ||
        !options.overwriteExistingItem(parsedItem, initialValue)
      )
        return parsedItem;
    }

    return initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    // Allow value to be a function so we have same API as useState
    const valueToStore = value instanceof Function ? value(storedValue) : value;

    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
};
