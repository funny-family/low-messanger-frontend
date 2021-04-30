import { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import './chat.styles.css';
import './chat.styles.layout.css';

interface RouteParams {
  id: string;
}
interface Props extends RouteComponentProps<RouteParams> {}

export const Chat: FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="chat-view">
      <div>the chat id is {props.match.params.id}!</div>
    </div>
  );
};
