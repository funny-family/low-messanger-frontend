import { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import './chat.styles.css';
import './chat.styles.layout.css';

import { MessageSendingForm } from './components/message-sending-form';

interface RouteParams {
  id: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

export const Chat: FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="chat-view">
      <b>the chat id is {props.match.params.id}!</b>
      <MessageSendingForm />
    </div>
  );
};
