import { FC } from 'react';

import { FormikErrors, FormikHelpers, useFormik } from 'formik';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../store';

import { checkIfStringIsEmpty } from '../../../../utils/check-if-string-is-empty.function';

import './chat-password-entry-form.styles.css';
import './chat-password-entry-form.styles.layout.css';

export const ChatPasswordEntryForm: FC = observer(() => {
  const store = useStore();

  interface ChatPasswordEntryFormValue {
    password: string;
  }

  const initialValues: ChatPasswordEntryFormValue = {
    password: ''
  };

  const onSubmit = async (
    chat: ChatPasswordEntryFormValue,
    actions: FormikHelpers<ChatPasswordEntryFormValue>
  ) => {
    console.log('chat data from password from:', chat);

    const { password } = chat;
    // await chatStore.join();

    await actions.setErrors({
      password: store.chat.chatJoinForm.data.password
    });
  };

  const validate = (chat: ChatPasswordEntryFormValue) => {
    const chatPasswordEntryFormErrors: FormikErrors<ChatPasswordEntryFormValue> = {};

    const isPasswordEmpty = checkIfStringIsEmpty(chat.password);
    if (isPasswordEmpty) {
      chatPasswordEntryFormErrors.password = 'Password is required!';
      return chatPasswordEntryFormErrors;
    }

    const passwordCurrentLength = chat.password.length;
    const passwordMinLength = 4;
    if (passwordCurrentLength < passwordMinLength) {
      chatPasswordEntryFormErrors.password = `Password must be at least ${passwordMinLength}!`;
      return chatPasswordEntryFormErrors;
    }

    return chatPasswordEntryFormErrors;
  };

  const chatPasswordEntryForm = useFormik({
    initialValues,
    onSubmit,
    validate
  });

  return (
    <form className="chat-password-entry-form" onSubmit={chatPasswordEntryForm.handleSubmit}>
      <div>
        <input
          style={{ padding: '0.8em', width: '400px' }}
          placeholder="Enter password to enter the chat..."
          name="password"
          type="password"
          value={chatPasswordEntryForm.values.password}
          onBlur={chatPasswordEntryForm.handleBlur}
          onChange={chatPasswordEntryForm.handleChange}
        />
        {chatPasswordEntryForm.errors.password ? (
          <div className="chat-password-entry-form__error-field">
            {chatPasswordEntryForm.errors.password}
          </div>
        ) : null}
      </div>

      <div>
        <button type="submit">join chat</button>
        <button type="button" onClick={chatPasswordEntryForm.handleReset}>
          reset
        </button>
      </div>

      <div>
        <pre>
          chatPasswordEntryForm data: {JSON.stringify(chatPasswordEntryForm.values, null, 2)}
        </pre>
        <pre>
          chatPasswordEntryForm errors: {JSON.stringify(chatPasswordEntryForm.errors, null, 2)}
        </pre>
      </div>
    </form>
  );
});
