/* eslint-disable react/prop-types */
import React from 'react';

import { TodoListStore } from './stores/todo-list.store';
import { ChatStore } from './stores/chat.store';

type Stores = {
  todoListStore: TodoListStore;
  chatStore: ChatStore;
};

const todoListStore = new TodoListStore();
const chatStore = new ChatStore();

const StoreContext = React.createContext<Stores>({} as Stores);

// eslint-disable-next-line
export const StoreProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <StoreContext.Provider value={{ todoListStore, chatStore }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export function useStore(): Stores {
  return React.useContext(StoreContext);
}

// https://www.youtube.com/watch?v=1fgRc1lYIEU
// https://www.youtube.com/watch?v=oQiMXRsO4o4
// https://www.youtube.com/watch?v=nGZCL6Wd_zQ
// https://www.youtube.com/watch?v=jn-L1SFYdIc
// https://www.youtube.com/results?search_query=react+typescript+mobx
