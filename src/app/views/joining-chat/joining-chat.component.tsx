import { FunctionComponent } from 'react';

import './joining-chat.styles.css';
import './joining-chat.styles.layout.css';

import { ChatJoinForm } from '../../components/chat-join-form';

export const JoiningChat: FunctionComponent = () => {
  return (
    <div className="joining-chat-view">
      <ChatJoinForm />
    </div>
  );
};
