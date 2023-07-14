import { useState, useCallback } from "react";
import { Form } from "./interfaces";

export default function <T, K extends keyof T>(initialData: T) {
  type LocalForm = Form<T, K>;

  const [data, setData] = useState(initialData);

  const setField: LocalForm["setField"] = useCallback(
    (name, value) => {
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

  const register: LocalForm["register"] = {
    value: (name) => ({
      value: data[name],
      ...onChangeFactory(name),
    }),
    selected: (name) => ({
      selected: data[name],
      ...onChangeFactory(name),
    }),
    checked: (name) => ({
      checked: data[name],
      ...onChangeFactory(name),
    }),
  };

  const update: LocalForm["update"] = useCallback(
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
    update,
    register,
    reset: useCallback(() => {
      setData(initialData);
    }, []),
  } as LocalForm;
}
