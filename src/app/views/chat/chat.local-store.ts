import { RefObject } from 'react';

export const localStore = {
  scrollToBottomOfChatHistory(ref: RefObject<HTMLElement>): void {
    ref.current?.scrollTo(ref.current.scrollHeight, ref.current.scrollHeight);
  }
};
