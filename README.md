# @baethon/polaris-form-hook

React hook for form state management in [@shopify/polaris](https://github.com/Shopify/polaris). It eliminates the necessity for individual `useState` and `useCallback` for each form field and simplifies form data management.

## Example

Based on the [original example](https://codesandbox.io/s/fjq5vy?module=App.tsx) from Polaris docs.

```js
import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';
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
