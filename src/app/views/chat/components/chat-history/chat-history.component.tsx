import { FC, useEffect, useRef } from 'react';

import { nanoid } from 'nanoid';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../store';

import { Message } from './components/message';

import './chat-history.styles.css';

export const ChatHistory: FC = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.chat.fetchChats();
    // eslint-disable-next-line
  }, []);

  const chatHistoryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(chatHistoryRef.current?.scrollHeight);
    console.log(chatHistoryRef);
    chatHistoryRef.current?.scrollTo(
      chatHistoryRef.current.scrollHeight,
      chatHistoryRef.current.scrollHeight
    );
  }, [chatHistoryRef.current?.scrollHeight]);

  // const arr = [...Array(50).keys()];
  const chatMessageList = store.chat.chatMessageList;

  return (
    <div className="chat-history" ref={chatHistoryRef}>
      {/* {arr.map((v) => (
        <div key={v}>{v}</div>
      ))} */}
      {chatMessageList.map((message) => (
        <Message key={nanoid(10)} senderName={message.senderName} text={message.text} />
      ))}
    </div>
  );
});
