import { FC, useState } from 'react';

import { FormikErrors, FormikHelpers, useFormik } from 'formik';

import { checkIfStringIsEmpty } from '../../utils/check-if-string-is-empty.function';

import '../../../assets/styles/components/input.css';
import '../../../assets/styles/components/button.css';
import '../../../assets/styles/components/form.css';

import './chat-creation-form.styles.css';

export const ChatCreationForm: FC = () => {
  const [isPasswordFieldsVisible, setPasswordFieldsVisibility] = useState(false);

  interface ChatCreationFormValues {
    name: string;
    owner: string;
    password?: string;
    passwordConfirmation?: string;
    visitors: any[];
  }

  const initialValues: ChatCreationFormValues = {
    name: '',
    owner: 'nmf7834g387g3', // need to be real user!
    password: '',
    passwordConfirmation: '',
    visitors: []
  };

  const validate = (chat: ChatCreationFormValues) => {
    const chatCreationFormErrors: FormikErrors<ChatCreationFormValues> = {};

    const nameValue = chat.name;

    const isNameValueEmpty = checkIfStringIsEmpty(nameValue);
    if (isNameValueEmpty) {
      chatCreationFormErrors.name = 'Name is required!';

      return chatCreationFormErrors;
    }

    const currentNameLength = nameValue.length;
    const nameMinLength = 4;
    if (currentNameLength < nameMinLength) {
      chatCreationFormErrors.name = `Name must be at least ${nameMinLength} characters!`;

      return chatCreationFormErrors;
    }

    const passwordValue = chat.password;
    const passwordConfirmationValue = chat.passwordConfirmation;

    const isPasswordValueEmpty = checkIfStringIsEmpty(passwordValue!);
    const isPasswordConfirmationValueEmpty = checkIfStringIsEmpty(passwordConfirmationValue!);

    const currentPasswordLength = passwordValue!.length;
    const passwordMinLength = 4;
    if (!isPasswordValueEmpty && currentPasswordLength < passwordMinLength) {
      chatCreationFormErrors.password = `Password must be at least ${nameMinLength} characters!`;

      return chatCreationFormErrors;
    }

    if (!isPasswordValueEmpty && isPasswordConfirmationValueEmpty) {
      chatCreationFormErrors.passwordConfirmation = 'Password confirmation is required!';

      return chatCreationFormErrors;
    }

    if (!isPasswordConfirmationValueEmpty && isPasswordValueEmpty) {
      chatCreationFormErrors.password = 'Password is required!';

      return chatCreationFormErrors;
    }

    const doesPasswordsMatch = passwordValue === passwordConfirmationValue;
    if (!doesPasswordsMatch) {
      chatCreationFormErrors.passwordConfirmation = 'Passwords must match!';

      return chatCreationFormErrors;
    }

    return chatCreationFormErrors;
  };

  const onSubmit = (
    chat: ChatCreationFormValues,
    actions: FormikHelpers<ChatCreationFormValues>
  ) => {
    console.log('ChatCreationFormValues:', chat);
  };

  const chatCreationForm = useFormik({
    initialValues,
    validate,
    onSubmit
  });

  return (
    <div className="chat-creation-form-container">
      <form
        className="chat-creation-form form-border form-padding"
        onSubmit={chatCreationForm.handleSubmit}
      >
        <div>
          <div>
            <input
              className="inp chat-creation-form__field"
              placeholder="Create name for chat"
              type="text"
              name="name"
              value={chatCreationForm.values.name}
              onChange={chatCreationForm.handleChange}
              onBlur={chatCreationForm.handleBlur}
            />
          </div>
          {chatCreationForm.errors.name ? (
            <div className="inp-error-text">{chatCreationForm.errors.name}</div>
          ) : null}
        </div>

        <label className="checkbox-container chat-creation-form__mg-top">
          <span className="checkbox-container__label">Add password</span>
          <input
            type="checkbox"
            checked={isPasswordFieldsVisible}
            onChange={() => {
              setPasswordFieldsVisibility(!isPasswordFieldsVisible);
              chatCreationForm.setFieldValue('password', '');
              chatCreationForm.setFieldValue('passwordConfirmation', '');
            }}
          />
          <span className="check-mark" />
        </label>

        {isPasswordFieldsVisible ? (
          <div className="chat-creation-form__mg-top">
            <div>
              <div>
                <input
                  className="inp chat-creation-form__field"
                  placeholder="Password here ..."
                  type="password"
                  name="password"
                  value={chatCreationForm.values.password}
                  onChange={chatCreationForm.handleChange}
                  onBlur={chatCreationForm.handleBlur}
                />
              </div>
              {chatCreationForm.errors.password ? (
                <div className="inp-error-text">{chatCreationForm.errors.password}</div>
              ) : null}
            </div>

            <div className="chat-creation-form__mg-top">
              <div>
                <input
                  className="inp chat-creation-form__field"
                  placeholder="Password confirmation here ..."
                  type="password"
                  name="passwordConfirmation"
                  value={chatCreationForm.values.passwordConfirmation}
                  onChange={chatCreationForm.handleChange}
                  onBlur={chatCreationForm.handleBlur}
                />
              </div>
              {chatCreationForm.errors.passwordConfirmation ? (
                <div className="inp-error-text">{chatCreationForm.errors.passwordConfirmation}</div>
              ) : null}
            </div>

            <button
              className="btn btn-secondary chat-creation-form__mg-top"
              type="button"
              onClick={() => {
                chatCreationForm.setErrors({});
                chatCreationForm.setFieldValue('password', '', false);
                chatCreationForm.setFieldValue('passwordConfirmation', '', false);
              }}
            >
              Reset password
            </button>
          </div>
        ) : null}

        <button className="btn btn-primary chat-creation-form__mg-top" type="submit">
          Create
        </button>
      </form>

      <div>
        <pre>chatCreationForm.values: {JSON.stringify(chatCreationForm.values, null, 2)}</pre>
        <pre>chatCreationForm.errors: {JSON.stringify(chatCreationForm.errors, null, 2)}</pre>
      </div>
    </div>
  );
};
