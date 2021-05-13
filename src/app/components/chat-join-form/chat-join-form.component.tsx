import { FunctionComponent } from 'react';
import { Formik } from 'formik';

import './chat-join-form.styles.css';
import './chat-join-form.styles.layout.css';

import { checkIfStringIsEmpty } from '../../utils/check-if-string-is-empty.function';

// WATCH THIS!!!!
// https://dev.to/shevchenkonik/react-typescript-mobx-4mei

export const ChatJoinForm: FunctionComponent = () => {
  type ChatJoinFromData = {
    entryKey: string;
  };

  const chatJoinFromData: ChatJoinFromData = {
    entryKey: ''
  };

  return (
    <Formik
      initialValues={chatJoinFromData}
      onSubmit={(data) => {
        // SEND THIS DATA TO SERVER!
        console.log(data);
      }}
      validate={(chat) => {
        // TODO: improve errors type!
        const errors: Record<string, string> = {};

        const isChatIdEmpty = checkIfStringIsEmpty(chat.entryKey);
        if (isChatIdEmpty) {
          errors.id = 'Id is required!';
        }

        return errors;
      }}
    >
      {({ values, errors, handleSubmit, handleChange }) => (
        <>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Type chat id here"
              name="entryKey"
              type="text"
              value={values.entryKey}
              onChange={handleChange}
            />
            <button type="submit">join chat</button>
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
