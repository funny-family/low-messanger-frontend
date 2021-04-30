import { FunctionComponent, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './app.styles.css';

const LoadingText: FunctionComponent = () => {
  return <h1>Loading...</h1>;
};

export const App: FunctionComponent = () => {
  return (
    <Suspense fallback={<LoadingText />}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={lazy(() => import('./views/home').then(({ Home }) => ({ default: Home })))}
          />
          <Route
            path="/create-chat"
            exact
            component={lazy(() =>
              import('./views/creating-chat').then(({ CreatingChat }) => ({
                default: CreatingChat
              }))
            )}
          />
          <Route
            path="/join-chat"
            exact
            component={lazy(() =>
              import('./views/joining-chat').then(({ JoiningChat }) => ({ default: JoiningChat }))
            )}
          />
          <Route
            path="/chat/:id"
            exact
            component={lazy(() => import('./views/chat').then(({ Chat }) => ({ default: Chat })))}
          />

          <Route
            path="/404"
            exact
            component={lazy(() =>
              import('./views/not-found').then(({ NotFound }) => ({ default: NotFound }))
            )}
          />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};
