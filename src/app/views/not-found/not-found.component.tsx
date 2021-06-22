import { FC } from 'react';

import { useHistory } from 'react-router-dom';

import '../../../assets/styles/components/button.css';

import './not-found.styles.css';
import './not-found.styles.layout.css';

export const NotFound: FC = () => {
  const history = useHistory();

  return (
    <div className="not-found-view">
      <section className="not-found-view__section">
        <h1 className="not-found__heading">404 Not found!</h1>
        <span>
          <p className="not-found__text">
            Nothing for you here...{' '}
            {/* <Link to="/">
              <button className="btn btn-primary" type="button">
                Go back!
              </button>
            </Link> */}
            <button className="btn btn-primary" type="button" onClick={() => history.go(-1)}>
              Go back!
            </button>
          </p>
        </span>
      </section>
    </div>
  );
};
