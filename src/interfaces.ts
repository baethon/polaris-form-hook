export type Form<T, K extends keyof T> = {
  data: T;

  setField<P extends K>(name: P, value: T[P]): void;

  register: {
    value<P extends K>(
      name: P
    ): {
      value: T[P];
      onChange(value: T[P]): void;
    };
    selected<P extends K>(
      name: P
    ): {
      selected: T[P];
      onChange(value: T[P]): void;
    };
    checked<P extends K>(
      name: P
    ): {
      checked: T[P];
      onChange(value: T[P]): void;
    };
  };

  update(values: Partial<T>): void;

  reset(): void;
};
