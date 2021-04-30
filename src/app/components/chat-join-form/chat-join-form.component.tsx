import { FunctionComponent } from 'react';

import './chat-join-form.styles.css';
import './chat-join-form.styles.layout.css';

export const ChatJoinForm: FunctionComponent = () => {
  return (
    <form>
      <input placeholder="Type chat id here" type="text" />
      <button type="submit">join chat</button>
    </form>
  );
};
