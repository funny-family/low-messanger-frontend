import { FC, useState } from 'react';

import { FormikErrors, FormikHelpers, useFormik } from 'formik';

import { useStore } from '../../store';
import { setAuthToken } from '../../store/auth';

import { checkIfStringIsEmpty } from '../../utils/check-if-string-is-empty.function';

import '../../../assets/styles/components/input.css';
import '../../../assets/styles/components/button.css';
import '../../../assets/styles/components/form.css';

import './user-creation-form.styles.css';

interface UserCreationFormValues {
  name: string;
  avatar: string;
}

const initialValues: UserCreationFormValues = {
  name: '',
  avatar: '' // coming soon!
};

export const UserCreationForm: FC = () => {
  const store = useStore();
  const [isFormVisible, setFormVisibility] = useState(true);

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

  const onSubmit = async (
    user: UserCreationFormValues,
    actions: FormikHelpers<UserCreationFormValues>
  ) => {
    console.log(user);
    const [responseDate, error] = await store.user.create({
      name: user.name,
      avatar: user.avatar
    });

    if (error) {
      console.log('create user error:', error);

      return;
    }

    const accessToken = responseDate.data.attributes.authTokens.accessToken.value;
    store.auth.setAuthToken(accessToken);
    setAuthToken(accessToken);

    if (localStorage.getItem('auth')) {
      setFormVisibility(false);
    }

    if (accessToken) {
      actions.resetForm();
    }
  };

  const userCreationForm = useFormik({
    initialValues,
    validate,
    onSubmit
  });

  if (isFormVisible) {
    return (
      <div className="user-creation-form-container">
        <form
          className="user-creation-form form-border form-padding"
          onSubmit={userCreationForm.handleSubmit}
        >
          <div>
            <input
              className="inp"
              placeholder="Type name here..."
              name="name"
              type="text"
              value={userCreationForm.values.name}
              onBlur={userCreationForm.handleBlur}
              onChange={userCreationForm.handleChange}
            />
            {userCreationForm.errors.name ? (
              <div className="inp-error-text">{userCreationForm.errors.name}</div>
            ) : null}
          </div>

          <button
            className="btn btn-secondary user-creation-form__mg-top"
            type="button"
            onClick={userCreationForm.handleReset}
          >
            Reset name
          </button>
          <button className="btn btn-primary user-creation-form__mg-top" type="submit">
            Create user
          </button>
        </form>

        <div>
          <pre>userCreationForm.values: {JSON.stringify(userCreationForm.values, null, 2)}</pre>
          <pre>userCreationForm.errors: {JSON.stringify(userCreationForm.errors, null, 2)}</pre>
        </div>
      </div>
    );
  }

  return null;
};
