import { FC } from 'react';

import { ChatJoinForm } from '../../components/chat-join-form';

import '../../../assets/styles/components/layout-container.css';
import '../../../assets/styles/components/form.css';

import './joining-chat.styles.css';

export const JoiningChat: FC = () => {
  return (
    <div className="layout-container-md">
      <div className="joining-chat-view form-padding">
        <ChatJoinForm
          initialValues={{ entryKey: '', password: '' }}
          visibleFields={{ entryKey: true, password: true }}
        />
      </div>
    </div>
  );
};
