import { FC, Suspense, lazy, useEffect } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GuardedRoute, GuardFunction, GuardProvider } from 'react-router-guards';

import { observer } from 'mobx-react-lite';
import { useStore } from './store';
import { getAuthToken, isInAChat, setAuthToken } from './store/auth';

import { LoadingBackground } from './components/loading-background';

// import { Test } from './views/test';

import './app.styles.css';

// interface PrivateRouteProps {
//   condition: boolean;
//   redirectTo?: string;
// }

// // eslint-disable-next-line
// const GuardRoute: FC<PrivateRouteProps> = ({ children, condition, redirectTo, ...rest }) => {
//   return (
//     <Route
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       {...rest}
//       render={({ location }) => {
//         return condition === true ? (
//           children
//         ) : (
//           <Redirect
//             exact
//             to={{
//               pathname: redirectTo || '',
//               state: { from: location }
//             }}
//           />
//         );
//       }}
//     />
//   );
// };

const requireLogin: GuardFunction = (to, from, next): void => {
  if (to.meta.auth === false) {
    next.redirect('/');
  } else {
    next();
  }
};

export const App: FC = () => {
  const store = useStore();

  const isAuthenticated = !!store.auth.getAuthToken();
  // const isGuest = store.auth.getAuthToken();
  // const isUserInAChat = isInAChat.get() === true;
  // const isUserNotInAChat = isInAChat.get() === false;

  // console.log(123131313, isInAChat.get());

  console.group('auth stuff');
  console.log('isAuthenticated:', isAuthenticated);
  // console.log('isGuest:', isGuest);
  console.groupEnd();

  // const clearAuthCookies = async (): Promise<void> => {
  //   const [, error] = await store.auth.clear();

  //   if (error) {
  //     console.log('clearAuthCookies error', error);

  //     return;
  //   }
  // };

  const refreshAuth = async (): Promise<void> => {
    const [responseData, error] = await store.auth.refresh();

    if (error) {
      console.log('refreshAuth error', error);

      return;
    }

    const newAccessToken = responseData.accessToken;
    localStorage.setItem('auth', newAccessToken);
  };

  const isUserInAChat = isInAChat.get();

  useEffect(() => {
    if (!isUserInAChat) {
      isInAChat.set(false);
    }

    const authToken = store.auth.getAuthToken();
    if (!authToken) {
      store.auth.setAuthToken('');
    }

    refreshAuth();

    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const fourMinutes = oneMinute * 4;
    setInterval(() => {
      // eslint-disable-next-line
      console.log(`Token refreshed at: ${new Date(Date.now())}`);
      refreshAuth();
    }, fourMinutes);
    // eslint-disable-next-line
  }, []);

  return (
    <Suspense fallback={<LoadingBackground />}>
      <BrowserRouter>
        <GuardProvider guards={[requireLogin]}>
          <Switch>
            <GuardedRoute
              path="/"
              exact
              component={lazy(() => import('./views/home').then(({ Home }) => ({ default: Home })))}
              meta={{ auth: !isUserInAChat }}
            />
            {/* <Route
              path="/"
              exact
              component={lazy(() => import('./views/home').then(({ Home }) => ({ default: Home })))}
            /> */}
            <GuardedRoute
              path="/create-chat"
              exact
              component={lazy(() =>
                import('./views/creating-chat').then(({ CreatingChat }) => ({
                  default: CreatingChat
                }))
              )}
              meta={{ auth: !isUserInAChat }}
            />
            {/* <Route
              path="/create-chat"
              exact
              component={lazy(() =>
                import('./views/creating-chat').then(({ CreatingChat }) => ({
                  default: CreatingChat
                }))
              )}
            /> */}
            <GuardedRoute
              path="/join-chat"
              exact
              component={lazy(() =>
                import('./views/joining-chat').then(({ JoiningChat }) => ({ default: JoiningChat }))
              )}
              meta={{ auth: !isUserInAChat }}
            />
            {/* <Route
              path="/join-chat"
              exact
              component={lazy(() =>
                import('./views/joining-chat').then(({ JoiningChat }) => ({ default: JoiningChat }))
              )}
            /> */}
            <GuardedRoute
              path="/chat/:entryKey"
              exact
              component={lazy(() => import('./views/chat').then(({ Chat }) => ({ default: Chat })))}
              meta={{ auth: !isUserInAChat }}
            />
            {/* <Route
              path="/chat/:entryKey"
              exact
              component={lazy(() => import('./views/chat').then(({ Chat }) => ({ default: Chat })))}
            /> */}

            <GuardedRoute
              path="/test"
              exact
              component={lazy(() => import('./views/test').then(({ Test }) => ({ default: Test })))}
              // meta={{ auth: true }}
              meta={{ auth: !!localStorage.getItem('auth') }}
            />
            {/* <GuardRoute condition={!!localStorage.getItem('auth')}>
            <Route
              path="/test"
              exact
              component={lazy(() => import('./views/test').then(({ Test }) => ({ default: Test })))}
            />
          </GuardRoute> */}

            <Route
              path="/404"
              exact
              component={lazy(() =>
                import('./views/not-found').then(({ NotFound }) => ({ default: NotFound }))
              )}
            />
            <Redirect to="/404" />
          </Switch>
        </GuardProvider>
      </BrowserRouter>
    </Suspense>
  );
};
