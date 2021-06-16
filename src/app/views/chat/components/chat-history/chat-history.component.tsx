/* eslint-disable react/no-array-index-key */
import { createRef, FC, useEffect, useRef } from 'react';

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
      {chatMessageList.slice(0, 50).map((message, index) => (
        <Message key={index} senderName={message.senderName} text={message.text} />
      ))}
    </div>
  );
});
