# @baethon/polaris-form-hook

React hook for form state management in [@shopify/polaris](https://github.com/Shopify/polaris). It eliminates the necessity for individual `useState` and `useCallback` for each form field and simplifies form data management.

## Example ([codesandbox](https://codesandbox.io/s/nervous-paper-5gwtq5?file=/App.tsx))

Based on the [original example](https://codesandbox.io/s/fjq5vy?module=App.tsx) from Polaris docs.

```js
import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';
import {useCallback} from 'react';
import {useForm} from '@baethon/polaris-form-hook';

function FormOnSubmitExample() {
  const form = useForm({
    newsletter: false,
    email: '',
  );
  
  const handleSubmit = useCallback(() => {
    form.reset();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Checkbox
          label="Sign up for the Polaris newsletter"
          {...form.register.checked('newsletter')}
        />

        <TextField
          {...form.register.value('email')}
          label="Email"
          type="email"
          autoComplete="email"
          helpText={
            <span>
              We’ll use this email address to inform you on future changes to
              Polaris.
            </span>
          }
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}
```

## Installation

```bash
npm i @baethon/polaris-form-hook
```

## Usage

### Initializing the form

Import `useForm` from `@baethon/polaris-form-hook`:

```js
import {useForm} from '@baethon/polaris-form-hook';
```

The function takes one argument - object with initial form data:

```js
const form = useForm({
    first_name: '',
    last_name: '',
});
```

You have to pass all fields that will be used in the form.

### Binding with Polaris

The `form` object (created by `useForm()`) contains a `register` property.  
It's an object containing factory methods that should be used to bind a field with Polaris component.

Polaris is inconsistent in names of the value properties. Depending on the component, it will use `value`, `selected`, or `checked` properties to pass the values. The `register` object will have a method for each of them. 

The factory method will generate two properties: `value` (or `selected`, `checked`) and `onChange()`.

```js
const form = useForm({
    first_name: '',
    accept_terms: false,
    company_name: [],
});

(
  <TextField label="First name" {...form.register.value('first_name')} />
  <Checkbox label="Accept Terms" {...form.register.checked('accept_terms')} />
  <ChoiceList
      title="Company name"
      choices={[
        {label: 'Hidden', value: 'hidden'},
        {label: 'Optional', value: 'optional'},
        {label: 'Required', value: 'required'},
      ]}
      {...form.register.selected('company_name')
    />
)
```

### Accessing form data

To access the form data, use `form.data`.

```js
const form = useForm({
    first_name: '',
    accept_terms: false,
    company_name: [],
});

console.log(form.data.first_name);
```

### Updating fields

You can update a single field using:

```js
form.setField('first_name', 'Jon');
```

Or by passing an object that will be merged with the form data:

```js
form.update({ last_name: 'Snow' });
```

To reset the form use:

```js
form.reset();
```

`reset()` will use the initial form data.

## Testing

```bash
npm test
```
