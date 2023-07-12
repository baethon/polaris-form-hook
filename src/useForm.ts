import { useState, useCallback } from "react";

export default function <T, K extends keyof T>(props: T) {
  const [data, setData] = useState(props);

  const setField = useCallback(
    <P extends K>(name: P, value: T[P]) => {
      setData((state) => ({
        ...state,
        [name]: value,
      }));
    },
    [data]
  );

  const onChangeFactory = <P extends K>(name: P) => ({
    onChange(value: T[P]) {
      setData({ ...data, [name]: value });
    },
  });

  const register = {
    value: <P extends K>(name: P) => ({
      value: data[name],
      ...onChangeFactory(name),
    }),
    selected: <P extends K>(name: P) => ({
      selected: data[name],
      ...onChangeFactory(name),
    }),
    checked: <P extends K>(name: P) => ({
      checked: data[name],
      ...onChangeFactory(name),
    }),
  };

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
    update,
    register,
  };
}
