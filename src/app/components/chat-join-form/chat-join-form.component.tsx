import React, { useEffect } from 'react';

import { FormikErrors, FormikHelpers, useFormik } from 'formik';

import { useHistory } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';

import { ChatSearchForm } from './components/chat-search-form';
import { ChatPasswordEntryForm } from './components/chat-password-entry-form';

import { checkIfStringIsEmpty } from '../../utils/check-if-string-is-empty.function';

import '../../../assets/styles/components/input.css';
import '../../../assets/styles/components/button.css';
import '../../../assets/styles/components/form.css';

import './chat-join-form.styles.css';

type ChatJoinFormProps = {
  initialValues: {
    entryKey: string;
    password: string;
  };
  visibleFields: {
    entryKey: boolean;
    password: boolean;
  };
};

export const ChatJoinForm: React.FC<ChatJoinFormProps> = observer((props) => {
  const history = useHistory();
  const store = useStore();

  // const redirectToChatPage = (): void => {};

  // const chatEntryKey = chatStore.chat.entry_key;
  // const doesChatExist = !!chatEntryKey;

  // useEffect(() => {
  //   if (doesChatExist) {
  //     history.push(`/chat/${chatEntryKey}`);
  //   }

  //   return () => {
  //     //
  //   };
  // }, [history, chatEntryKey, doesChatExist]);

  type ChatJoinFormValues = {
    entryKey: string;
    password: string;
  };

  const initialValues: ChatJoinFormValues = {
    entryKey: props.initialValues.entryKey,
    password: props.initialValues.password
  };

  const onSubmit = async (chat: ChatJoinFormValues, actions: FormikHelpers<ChatJoinFormValues>) => {
    const { entryKey, password } = chat;

    // await chatStore.join({
    //   entryKey,
    //   password
    // });

    await actions.setErrors({
      entryKey: store.chat.chatJoinForm.errors.entryKey,
      password: store.chat.chatJoinForm.errors.password
    });
  };

  const validate = (chat: ChatJoinFormValues) => {
    const chatJoinFormErrors: FormikErrors<ChatJoinFormValues> = {};

    const entryKeyValue = chat.entryKey;

    const isEntryKeyEmpty = checkIfStringIsEmpty(entryKeyValue);
    if (isEntryKeyEmpty) {
      chatJoinFormErrors.entryKey = 'Entry key is required!';

      return chatJoinFormErrors;
    }

    const currentEntryKeyLength = entryKeyValue.length;
    const entryKeyMinLength = 20;
    if (currentEntryKeyLength < entryKeyMinLength) {
      chatJoinFormErrors.entryKey = `Entry key must be at least ${entryKeyMinLength} characters!`;

      return chatJoinFormErrors;
    }

    const doesChatHavePassword = store.chat.chatJoinForm.data.hasPassword;
    if (doesChatHavePassword) {
      const passwordValue = chat.password;

      const isPasswordValueEmpty = checkIfStringIsEmpty(passwordValue);
      if (isPasswordValueEmpty) {
        chatJoinFormErrors.password = 'Password is required!';

        return chatJoinFormErrors;
      }

      const passwordCurrentLength = passwordValue.length;
      const passwordMinLength = 4;
      if (passwordCurrentLength < passwordMinLength) {
        chatJoinFormErrors.password = `Password must be at least ${passwordMinLength}!`;
        return chatJoinFormErrors;
      }
    }

    return chatJoinFormErrors;
  };

  const chatJoinForm = useFormik({
    initialValues,
    onSubmit,
    validate
  });

  return (
    <div className="chat-join-form-container form-border form-padding">
      <form className="chat-join-form" onSubmit={chatJoinForm.handleSubmit}>
        {props.visibleFields.entryKey ? (
          <>
            {/* {!chatStore.chatJoinForm.data.hasPassword ? ( */}
            <div>
              <div>
                <input
                  className="inp chat-join-form__field"
                  placeholder="Type chat's entry key here"
                  name="entryKey"
                  type="text"
                  value={chatJoinForm.values.entryKey}
                  onBlur={chatJoinForm.handleBlur}
                  onChange={chatJoinForm.handleChange}
                />
                {chatJoinForm.errors.entryKey ? (
                  <div className="inp-error-text">{chatJoinForm.errors.entryKey}</div>
                ) : null}
              </div>

              <button
                className="btn btn-secondary chat-join-form__mg-top"
                type="button"
                onClick={() => {
                  chatJoinForm.setFieldValue('entryKey', '');
                  setTimeout(() => {
                    chatJoinForm.resetForm({
                      errors: {
                        entryKey: ''
                      }
                    });
                  }, 0);
                }}
              >
                Reset Entry key
              </button>
            </div>
            {/* ) : null} */}
          </>
        ) : null}

        {props.visibleFields.password ? (
          <>
            {/* {chatStore.chatJoinForm.data.hasPassword ? ( */}
            <div className="chat-join-form__mg-top">
              <div>
                <input
                  className="inp chat-join-form__field chat-creation-form__mg-top"
                  placeholder="Enter password to enter the chat..."
                  name="password"
                  type="password"
                  value={chatJoinForm.values.password}
                  onBlur={chatJoinForm.handleBlur}
                  onChange={chatJoinForm.handleChange}
                />
                {chatJoinForm.errors.password ? (
                  <div className="inp-error-text">{chatJoinForm.errors.password}</div>
                ) : null}
              </div>

              <button
                className="btn btn-secondary chat-join-form__mg-top"
                type="button"
                onClick={() => {
                  chatJoinForm.setFieldValue('password', '');

                  setTimeout(() => {
                    chatJoinForm.resetForm({
                      errors: {
                        password: ''
                      }
                    });
                  }, 0);
                }}
              >
                Reset password
              </button>
            </div>
            {/* ) : null} */}
          </>
        ) : null}

        {/* <div> */}
        <button className="btn btn-primary chat-join-form__mg-top" type="submit">
          Join
        </button>
        {/* </div> */}
      </form>

      <div style={{ backgroundColor: 'whitesmoke', border: '1px solid gray' }}>
        <pre>chatJoinForm.values: {JSON.stringify(chatJoinForm.values, null, 2)}</pre>
        <pre>chatJoinForm.errors: {JSON.stringify(chatJoinForm.errors, null, 2)}</pre>

        <hr />

        <pre>chat: {JSON.stringify(store.chat.chat, null, 2)}</pre>
        <pre>chatStore.chatJoinForm: {JSON.stringify(store.chat.chatJoinForm, null, 2)}</pre>
      </div>
    </div>
  );
});

ChatJoinForm.defaultProps = {
  initialValues: {
    entryKey: '',
    password: ''
  },
  visibleFields: {
    entryKey: true,
    password: true
  }
};
