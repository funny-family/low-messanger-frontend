import { FunctionComponent } from 'react';

import './not-found.styles.css';
import './not-found.styles.layout.css';

export const NotFound: FunctionComponent = () => {
  return (
    <div className="not-found-view">
      <section>
        <h1>404 Not found!</h1>
        <p>Nothing for you here... Go back!</p>
      </section>
    </div>
  );
};
