import { FunctionComponent } from 'react';

import './creating-chat.styles.scoped.css';
import './creating-chat.styles.layout.scoped.css';

import { ChatCreationForm } from '../../components/chat-creation-form';

export const CreatingChat: FunctionComponent = () => {
  return (
    <div className="creating-chat-view">
      <ChatCreationForm />
    </div>
  );
};
