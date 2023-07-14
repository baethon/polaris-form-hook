export type Form<T> = {
  data: T;

  setField<K extends keyof T>(name: K, value: T[K]): void;

  register: {
    value<K extends keyof T>(
      name: K
    ): {
      value: T[K];
      onChange(value: T[K]): void;
    };
    selected<K extends keyof T>(
      name: K
    ): {
      selected: T[K];
      onChange(value: T[K]): void;
    };
    checked<K extends keyof T>(
      name: K
    ): {
      checked: T[K];
      onChange(value: T[K]): void;
    };
  };

  update(values: Partial<T>): void;

  reset(): void;
};

// Extracts the payload type of the given form
export type FormData<T> = T extends Form<infer U> ? U : never;
