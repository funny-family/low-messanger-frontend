import { makeAutoObservable } from 'mobx';

export class ChatStore {
  chat = {};

  constructor() {
    makeAutoObservable(this);
  }

  async findByEntryKey(entryKey: string): Promise<void> {
    try {
      const url = `http://localhost:8800/api/v1/find-chat-by-entry-key/${entryKey}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          entry_key: entryKey
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log('error:', responseData);
      }

      this.chat = responseData;
      console.log('responseData:', responseData);
    } catch (error) {
      console.log('error from ChatStore in methodfind:', error);
    }
  }
}
