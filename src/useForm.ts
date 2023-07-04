import { useState, useCallback } from "react";

export type FormHook<T, K extends keyof T> = {
  data: T;

  setField: (name: K, value: T[K]) => void;

  register: (name: K) => {
    onChange(value: T[K]): void;
    value: T[K];
  };

  update: (values: Partial<T>) => void;
};

export default function <T>(props: T): FormHook<T, keyof T> {
  type LocalHook = FormHook<T, keyof T>;
  const [data, setData] = useState<T>(props);

  const setField = useCallback<LocalHook["setField"]>(
    (name, value) => {
      setData((state) => ({
        ...state,
        [name]: value,
      }));
    },
    [data]
  );

  const register: LocalHook["register"] = (name) => ({
    value: data[name],
    onChange: useCallback(
      (value) => setData({ ...data, [name]: value }),
      [data]
    ),
  });

  const update = useCallback<LocalHook["update"]>(
    (values) =>
      setData((state) => ({
        ...state,
        ...values,
      })),
    [data]
  );

  return {
    data,
    setField,
    register,
    update,
  };
}
