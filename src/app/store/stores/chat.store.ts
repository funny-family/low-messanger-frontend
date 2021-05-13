import { makeAutoObservable } from 'mobx';

export class ChatStore {
  data: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  // findChat() {}
}
