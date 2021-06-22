import React from 'react';

import { FormikErrors, FormikHelpers, useFormik } from 'formik';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../store';

import { checkIfStringIsEmpty } from '../../../../utils/check-if-string-is-empty.function';

import './chat-search-form.styles.css';
import './chat-search-form.styles.layout.css';

export const ChatSearchForm: React.FC = observer(() => {
  const store = useStore();

  interface ChatSearchFromValue {
    entryKey: string;
  }

  const initialValues: ChatSearchFromValue = {
    entryKey: ''
  };

  const onSubmit = async (
    chat: ChatSearchFromValue,
    actions: FormikHelpers<ChatSearchFromValue>
  ) => {
    console.log('chat data:', chat);

    const { entryKey } = chat;
    // await chatStore.findByEntryKey(entryKey);

    // await chatStore.join({
    //   entryKey,
    //   password: ''
    // });

    // await chatStore.checkPassportAvailability(entryKey);

    await actions.setErrors({
      entryKey: store.chat.chatJoinForm.errors.entryKey
    });
  };

  const validate = (chat: ChatSearchFromValue) => {
    const chatSearchFromErrors: FormikErrors<ChatSearchFromValue> = {};

    const isEntryKeyEmpty = checkIfStringIsEmpty(chat.entryKey);
    if (isEntryKeyEmpty) {
      chatSearchFromErrors.entryKey = 'Entry key is required!';
      return chatSearchFromErrors;
    }

    const entryKeyMinLength = 20;
    const entryKeyCurrentLength = chat.entryKey.length;
    if (entryKeyCurrentLength < entryKeyMinLength) {
      chatSearchFromErrors.entryKey = `Entry key must be at least ${entryKeyMinLength}!`;
      return chatSearchFromErrors;
    }

    return chatSearchFromErrors;
  };

  const chatSearchFrom = useFormik({
    initialValues,
    onSubmit,
    validate
  });

  return (
    <>
      <form className="chat-search-form" onSubmit={chatSearchFrom.handleSubmit}>
        <div>
          <input
            // style={{ padding: '0.8em', width: '400px' }}
            placeholder="122131321"
            name="entryKey"
            type="text"
            value={chatSearchFrom.values.entryKey}
            onBlur={chatSearchFrom.handleBlur}
            onChange={chatSearchFrom.handleChange}
          />
          {chatSearchFrom.errors.entryKey ? (
            <div className="chat-search-form__error-field">{chatSearchFrom.errors.entryKey}</div>
          ) : null}
        </div>

        <div>
          <button type="submit">join chat</button>
          <button type="button" onClick={chatSearchFrom.handleReset}>
            reset
          </button>
        </div>
      </form>

      <div>
        <pre>chatSearchFrom.values: {JSON.stringify(chatSearchFrom.values, null, 2)}</pre>
        <pre>chatSearchFrom.errors: {JSON.stringify(chatSearchFrom.errors, null, 2)}</pre>
        <pre>
          chatStore.chatJoinForm.errors: {JSON.stringify(store.chat.chatJoinForm.errors, null, 2)}
        </pre>
      </div>
    </>
  );
});
