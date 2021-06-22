import { FunctionComponent } from 'react';

import { Link } from 'react-router-dom';

import '../../../assets/styles/components/button.css';
import '../../../assets/styles/components/layout-container.css';

import './home.styles.css';
import './home.styles.layout.css';

export const Home: FunctionComponent = () => {
  return (
    <div className="home-view">
      <section className="home-view__section">
        <Link to={{ pathname: '/create-chat' }}>
          <button className="btn btn-primary" type="button">
            Create chat
          </button>
        </Link>

        <Link to={{ pathname: '/join-chat' }}>
          <button className="btn btn-primary" type="button">
            Join chat
          </button>
        </Link>
      </section>
    </div>
  );
};
