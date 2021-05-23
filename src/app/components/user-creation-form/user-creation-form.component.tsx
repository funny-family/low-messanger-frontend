import { FC } from 'react';

import { FormikErrors, FormikHelpers, useFormik } from 'formik';

import { checkIfStringIsEmpty } from '../../utils/check-if-string-is-empty.function';

import './user-creation-form.styles.css';
import './user-creation-form.styles.layout.css';

export const UserCreationForm: FC = () => {
  type UserCreationFormValues = {
    name: string;
  };

  const initialValues: UserCreationFormValues = {
    name: ''
  };

  const onSubmit = async (
    user: UserCreationFormValues,
    actions: FormikHelpers<UserCreationFormValues>
  ) => {
    console.log(1231313, user);
  };

  const validate = (user: UserCreationFormValues) => {
    const userCreationFormErrors: FormikErrors<UserCreationFormValues> = {};

    const nameValue = user.name;

    const isNameValueEmpty = checkIfStringIsEmpty(nameValue);
    if (isNameValueEmpty) {
      userCreationFormErrors.name = 'Name is required!';
      return userCreationFormErrors;
    }

    const currentNameLength = nameValue.length;
    const minNameLength = 4;
    if (currentNameLength < minNameLength) {
      userCreationFormErrors.name = `Name must be at least ${minNameLength} characters!`;
      return userCreationFormErrors;
    }

    return userCreationFormErrors;
  };

  const userCreationForm = useFormik({
    initialValues,
    onSubmit,
    validate
  });

  return (
    <>
      <form className="user-creation-form" onSubmit={userCreationForm.handleSubmit}>
        <div>
          <input
            placeholder="Type name here..."
            name="name"
            type="text"
            value={userCreationForm.values.name}
            onBlur={userCreationForm.handleBlur}
            onChange={userCreationForm.handleChange}
          />
          {userCreationForm.errors.name ? (
            <div className="user-creation-form__error-field">{userCreationForm.errors.name}</div>
          ) : null}
        </div>
        <button type="button" onClick={userCreationForm.handleReset}>
          reset
        </button>
        <button type="submit">create</button>
      </form>

      <div>
        <pre>userCreationForm.values: {JSON.stringify(userCreationForm.values, null, 2)}</pre>
        <pre>userCreationForm.errors: {JSON.stringify(userCreationForm.errors, null, 2)}</pre>
      </div>
    </>
  );
};
