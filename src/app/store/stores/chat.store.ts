import { makeAutoObservable } from 'mobx';

type FormObject = {
  errors: any;
  data: any;
};

interface ChatMessage {
  id: string;
  avatar?: string;
  senderName: string;
  text: string;
}

export class ChatStore {
  chatMessageList: ChatMessage[] = [];
  chat: any = {};

  chatJoinForm: FormObject = {
    errors: {},
    data: {}
  };

  constructor() {
    makeAutoObservable(this);
  }

  // private fillChatMessageList() {}

  /* eslint-disable class-methods-use-this */
  async fetchChats() {
    try {
      // const input: RequestInfo = 'https://jsonplaceholder.typicode.com/comments';
      const input: RequestInfo = 'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10';
      const init: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8;'
        }
      };
      const response = await fetch(input, init);
      const responseData = await response.json();
      const fetchedMessageList = [...responseData];

      fetchedMessageList.map((message) => {
        return this.chatMessageList.push({
          id: String(message.id.toString()), // yaeh, yaeh, yaeh...
          senderName: message.title,
          text: message.body
        });
      });
    } catch (error) {
      console.error('Error in "fetchChats" method:', error);
    }
  }
}
