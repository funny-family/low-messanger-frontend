import { FunctionComponent } from 'react';

import './app.styles.css';

import { BurgerButton } from './components/burger-button';

export const App: FunctionComponent = () => {
  return (
    <div>
      <BurgerButton />
      <h1 className="test">Oh hi mom!</h1>;
    </div>
  );
};
