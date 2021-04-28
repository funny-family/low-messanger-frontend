import { FunctionComponent } from 'react';

import './loading-background.styles.css';
import './loading-background.styles.layout.css';

import { LoadingSpinnerRing } from '../loading-spinner-ring';

export const LoadingBackground: FunctionComponent = () => {
  return (
    <section className="loading-background">
      <LoadingSpinnerRing />
    </section>
  );
};
