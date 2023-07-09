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
    <P extends K>(name: P, value: T[P]) => {
      setData((state) => ({
        ...state,
        [name]: value,
      }));
    },
    [data]
  );

  const register = <P extends K>(
    name: P,
    propertyName: ValueAttributeName = "value"
  ) => ({
    ...toValueObject(data[name], propertyName),
    onChange(value: T[P]) {
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
