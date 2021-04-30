import { FunctionComponent } from 'react';
import { Formik } from 'formik';

import './chat-creation-form.styles.css';
import './chat-creation-form.styles.layout.css';
import './chat-creation-form.styles.mobile.css';

export const ChatCreationForm: FunctionComponent = () => {
  interface IChat {
    name: string;
    password: string;
    visitors: any[];
  }

  const chat: IChat = {
    name: '',
    password: '',
    visitors: []
  };

  return (
    <Formik
      initialValues={chat}
      onSubmit={(data) => {
        const processedChatData: IChat = {
          ...data
          // id: uuidv4()
        };

        console.log('processedChatData:', processedChatData);
      }}
      // validate={(data) => {
      //   console.log(data);
      // }}
    >
      {({ values, errors, handleSubmit, handleChange, setFieldValue }) => (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <input type="text" name="name" value={values.name} onChange={handleChange} />
              <button type="button">create chat room</button>
              <button type="button">next</button>
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <button type="button">create password</button>
              <button type="button" onClick={() => setFieldValue('password', '')}>
                skip
              </button>
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
