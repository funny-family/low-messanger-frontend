import { configure, makeAutoObservable } from 'mobx';

import { ChatStore } from './stores/chat.store';
import { UserStore } from './stores/user.store';
import { AuthStore } from './stores/auth.store';

configure({
  enforceActions: 'never'
});

export class RootStore {
  chat: ChatStore;
  user: UserStore;
  auth: AuthStore;

  constructor() {
    makeAutoObservable(this);

    // @ts-ignore
    this.chat = new ChatStore(this);
    // @ts-ignore
    this.user = new UserStore(this);
    // @ts-ignore
    this.auth = new AuthStore(this);
  }
}
