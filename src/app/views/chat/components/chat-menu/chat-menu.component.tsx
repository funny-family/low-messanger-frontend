import { FC } from 'react';

import { useHistory } from 'react-router-dom';

import '../../../../../assets/styles/components/layout-container.css';
import '../../../../../assets/styles/components/button.css';

import './chat-menu.styles.css';

export const ChatMenu: FC = () => {
  const history = useHistory();

  const enterKey = 'EnterKey';
  const password = 'Password';

  return (
    <div className="chat-menu__back-top">
      <div className="chat-menu__window layout-container-md">
        <div className="chat-menu__info-container">
          <div>
            <b>enter key:</b> {enterKey}
          </div>
          <div>
            <b>enter key:</b> {password}
          </div>
        </div>
        <div className="chat-menu__button-container">
          <button className="btn btn-primary" type="button" onClick={() => history.push('/')}>
            Exit chat
          </button>
        </div>
      </div>
    </div>
  );
};
