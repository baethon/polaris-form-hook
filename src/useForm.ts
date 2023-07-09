import { useState, useCallback } from "react";

const validPropertyNames = ["value", "checked", "selected"] as const;

type ValueAttributeName = (typeof validPropertyNames)[number];

type ValueProperty<T> = {
  [K in ValueAttributeName]: T;
};

function toValueObject<T, V extends ValueAttributeName>(
  value: T,
  propertyName: V
) {
  if (!validPropertyNames.includes(propertyName)) {
    throw new Error(`Unsupported property name: ${propertyName}`);
  }

  return {
    [propertyName]: value,
  } as Pick<ValueProperty<T>, V>;
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
