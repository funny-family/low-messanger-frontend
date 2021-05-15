import React, { createContext, ReactNode, ReactElement, useContext } from 'react';
import { RootStore } from './root.store';

export const StoreContext = createContext<RootStore>({} as RootStore);

export type StoreComponent = React.FC<{
  store?: RootStore;
  children: ReactNode;
}>;

const rootStore = new RootStore();

// eslint-disable-next-line
export const StoreProvider: React.FC<React.PropsWithChildren<{}>> = (props): ReactElement => {
  // eslint-disable-next-line
  return <StoreContext.Provider value={rootStore}>{props.children}</StoreContext.Provider>;
};

export const useStore = (): RootStore => useContext(StoreContext);
