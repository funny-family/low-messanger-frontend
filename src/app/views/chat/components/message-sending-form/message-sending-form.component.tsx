import { FunctionComponent } from 'react';
import { Formik } from 'formik';

import './message-sending-form.styles.css';
import './message-sending-form.styles.layout.css';

import { checkIfStringIsEmpty } from '../../../../utils/check-if-string-is-empty.function';

export const MessageSendingForm: FunctionComponent = () => {
  type MessageData = {
    text: string;
    senderName: string;
  };

  const messageData: MessageData = {
    text: '',
    senderName: ''
  };

  return (
    <Formik
      initialValues={messageData}
      onSubmit={(data) => {
        const processedMessageData: MessageData = {
          ...data,
          text: data.text.trim()
        };

        console.log('processedMessageData:', processedMessageData);
      }}
      validate={(message) => {
        const errors: Record<string, string> = {};

        const isMessageTextEmpty = checkIfStringIsEmpty(message.text);
        if (isMessageTextEmpty) {
          errors.text = 'Message text cannot be empty!';
        }

        return errors;
      }}
    >
      {({ values, errors, handleSubmit, handleChange }) => (
        <>
          <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '0.6em' }}>
            <div>
              <textarea
                placeholder="Type message text here..."
                name="text"
                cols={30}
                rows={4}
                value={values.text}
                onChange={handleChange}
              />
              <button type="submit">send message</button>
            </div>
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
