import { expect, it } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import useForm from "../src/useForm";

it("returns the initial form data", () => {
  const initialData = {
    firstName: "Jon",
    lastName: "Snow",
  };

  const { result } = renderHook(() => useForm(initialData));

  expect(result.current.data).toEqual(initialData);
});

it("updates a single field", () => {
  const initialData = {
    firstName: "Jon",
    lastName: "Snow",
  };

  const { result } = renderHook(() => useForm(initialData));

  act(() => {
    result.current.setField("lastName", "Stark");
  });

  expect(result.current.data.lastName).toEqual("Stark");
});

it("updates form fields", () => {
  const initialData = {
    firstName: "Jon",
    lastName: "Snow",
    email: "jon@northmail.com",
  };

  const { result } = renderHook(() => useForm(initialData));

  act(() => {
    result.current.update({
      email: "jon@stark.com",
      lastName: "Stark",
    });
  });

  expect(result.current.data).toEqual({
    firstName: "Jon",
    lastName: "Stark",
    email: "jon@stark.com",
  });
});

it("creates Polaris properties", () => {
  const initialData = {
    firstName: "Jon",
    lastName: "Snow",
  };

  const { result } = renderHook(() => {
    const form = useForm(initialData);
    const props = form.register("lastName");

    return { form, props };
  });

  act(() => {
    result.current.props.onChange("Stark");
  });

  expect(result.current.props.value).toEqual("Stark");
  expect(result.current.form.data).toEqual({
    firstName: "Jon",
    lastName: "Stark",
  });
});
