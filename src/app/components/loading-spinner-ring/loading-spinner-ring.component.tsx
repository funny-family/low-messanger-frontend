import { FunctionComponent } from 'react';

import './loading-spinner-ring.styles.css';

export const LoadingSpinnerRing: FunctionComponent = () => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
