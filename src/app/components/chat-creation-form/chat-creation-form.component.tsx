import { FunctionComponent } from 'react';
import { Formik } from 'formik';

import './chat-creation-form.styles.css';
import './chat-creation-form.styles.layout.css';
import './chat-creation-form.styles.mobile.css';

import { checkIfStringIsEmpty } from '../../utils/check-if-string-is-empty.function';

export const ChatCreationForm: FunctionComponent = () => {
  type ChatData = {
    name: string;
    password: string;
    visitors: any[];
  };

  const chatData: ChatData = {
    name: '',
    password: '',
    visitors: []
  };

  return (
    <Formik
      initialValues={chatData}
      onSubmit={(data) => {
        const processedChatData: ChatData = {
          ...data
        };

        // SEND THIS DATA TO SERVER!
        console.log('processedChatData:', processedChatData);
      }}
      validate={(chat) => {
        // TODO: improve errors type!
        const errors: Record<string, string> = {};

        const isChatNameEmpty = checkIfStringIsEmpty(chat.name);
        if (isChatNameEmpty) {
          errors.name = 'Chat require name!';
        } else if (chat.name.length < 4) {
          errors.name = 'Chat name must be more than 4 characters!';
        }

        const isChatPasswordEmpty = checkIfStringIsEmpty(chat.password);
        if (!isChatPasswordEmpty && chat.password.length < 4) {
          errors.password = 'Chat password requires at least 4 characters!';
        }

        return errors;
      }}
    >
      {({ values, errors, handleSubmit, handleChange }) => (
        <>
          <form onSubmit={handleSubmit} style={{ border: '2px solid red', padding: '0.6em' }}>
            <div>
              <input
                placeholder="Create name for chat"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <button type="button">create chat room</button>
            </div>

            <div>
              <input
                placeholder="Create password for chat is need!"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <button type="button">create password</button>
              {/* <button type="button" onClick={() => setFieldValue('password', '')}>
                skip
              </button> */}
            </div>

            <button type="submit">fire chat 🔥</button>
          </form>

          <div>
            <pre>data: {JSON.stringify(values, null, 2)}</pre>
            <pre>errors: {JSON.stringify(errors, null, 2)}</pre>
          </div>
        </>
      )}
    </Formik>
  );
};
