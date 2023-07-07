import { useState, useCallback } from "react";

export default function <T, K extends keyof T>(props: T) {
  const [data, setData] = useState(props);

  const setField = useCallback(
    (name: K, value: T[K]) => {
      setData((state) => ({
        ...state,
        [name]: value,
      }));
    },
    [data]
  );

  const register = (name: K) => ({
    value: data[name],
    onChange(value: T[K]) {
      setData({ ...data, [name]: value });
    },
  });

  const update = useCallback(
    (values: Partial<T>) =>
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
