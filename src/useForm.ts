import { useState, useCallback } from "react";

type ValueAttributeName = "value" | "checked" | "selected";

type ValueProperty<T> = {
  [K in ValueAttributeName]: T;
};

function toValueObject<T>(value: T, propertyName: ValueAttributeName) {
  return propertyName === "selected"
    ? ({ selected: value } as { selected: T })
    : propertyName === "checked"
    ? ({ checked: value } as { checked: T })
    : ({ value } as { value: T });
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

  const register = <P extends K, V extends ValueAttributeName>(
    name: P,
    propertyName: V = "value" as V
  ) => ({
    ...(toValueObject(data[name], propertyName) as ValueProperty<T[P]>[V]),
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
