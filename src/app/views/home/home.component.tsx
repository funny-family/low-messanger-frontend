import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import './home.styles.css';
import './home.styles.layout.css';

export const Home: FunctionComponent = () => {
  return (
    <div className="home-view">
      <Link to={{ pathname: '/create-chat' }}>
        <button type="button">create chat</button>
      </Link>

      <Link to={{ pathname: '/join-chat' }}>
        <button type="button">join chat</button>
      </Link>
    </div>
  );
};
