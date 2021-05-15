import { ChatStore } from './stores/chat.store';

export class RootStore {
  chatStore: ChatStore;

  constructor() {
    this.chatStore = new ChatStore();
  }
}
