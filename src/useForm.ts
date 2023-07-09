import { useState, useCallback } from "react";

type ValueAttributeName = "value" | "checked" | "selected";

function toValueObject<T>(value: T, propertyName: ValueAttributeName) {
  return propertyName === "selected"
    ? { selected: value }
    : propertyName === "checked"
    ? { checked: value }
    : { value };
}

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

  const register = (name: K, propertyName: ValueAttributeName = "value") => ({
    ...toValueObject(data[name], propertyName),
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
