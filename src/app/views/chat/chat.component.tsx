import { FC, useEffect, useState, Suspense } from 'react';

import { RouteComponentProps, useParams, useHistory } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
// import ScrollToBottom from 'react-scroll-to-bottom';
import { useStore } from '../../store';

import { ChatHistory } from './components/chat-history';
import { MessageSendingForm } from './components/message-sending-form';
import { ChatMenu } from './components/chat-menu';

import { ChatJoinForm } from '../../components/chat-join-form';
import { LoadingBackground } from '../../components/loading-background';
import { BurgerButton } from '../../components/burger-button';

import { localStore } from './chat.local-store';

import '../../../assets/styles/components/layout-container.css';

import './chat.styles.css';

interface RouteParams {
  entryKey: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

export const Chat: FC<Props> = observer(() => {
  const history = useHistory();
  const params = useParams<RouteParams>();
  const store = useStore();

  const entryKeyFromParams = params.entryKey;
  const [state, setState] = useState(false);

  useEffect(() => {
    (async () => {
      const redirectToJoinChatPage = () => history.push('/join-chat');

      if (!entryKeyFromParams) {
        redirectToJoinChatPage();
        return;
      }

      const entryKeyFromParamsLength = entryKeyFromParams.length;
      const minEntryKeyFromParamLength = 20;
      if (entryKeyFromParamsLength < minEntryKeyFromParamLength) {
        redirectToJoinChatPage();
        return;
      }

      if (entryKeyFromParamsLength > minEntryKeyFromParamLength) {
        redirectToJoinChatPage();
        return;
      }

      const entryKeyPattern = /^[a-zA-Z0-9-_]+$/g;
      const doesEntryKeyParamsMatchPattern = entryKeyPattern.test(entryKeyFromParams);
      if (!doesEntryKeyParamsMatchPattern) {
        redirectToJoinChatPage();
        return;
      }

      // const chat = await chatStore.findByEntryKey(entryKeyFromParams);

      // await chatStore.join({
      //   entryKey: entryKeyFromParams
      // });

      const wasChatFound = !store.chat.chatJoinForm.errors.entryKey;
      const doesChatHavePassword = store.chat.chatJoinForm.data.hasPassword;

      // if (!wasChatFound) {
      //   redirectToJoinChatPage();
      //   return;
      // }

      console.log('wasChatFound:', wasChatFound);

      if (!wasChatFound) {
        redirectToJoinChatPage();
        return;
      }

      // const entryKeysContainer = [];
      // entryKeysContainer.push(entryKeyFromParams);
      // const isChatOpenMoreThenOneTimes =
      //   entryKeysContainer.map((e) => e === entryKeyFromParams).filter((e) => e === true).length >
      //   1;

      // if (isChatOpenMoreThenOneTimes) {
      //   redirectToJoinChatPage();
      //   return;
      // }

      // console.log('isChatOpenMoreThenOneTimes:', isChatOpenMoreThenOneTimes);

      if (doesChatHavePassword) {
        setState(true);
      }

      const chatCredentials = {
        entryKey: entryKeyFromParams,
        password: '231313'
      };

      sessionStorage.setItem('chatCredentials', JSON.stringify(chatCredentials));

      console.log('doesChatHavePassword:', doesChatHavePassword);
      console.log('params:', params.entryKey);
    })();
  }, [params, history, store, entryKeyFromParams]);

  const govno = sessionStorage.getItem('govno');
  // https://www.geeksforgeeks.org/how-to-create-a-scroll-to-bottom-button-in-reactjs/
  // https://www.cluemediator.com/auto-scroll-to-the-bottom-in-a-react-chat-application
  // https://stackoverflow.com/questions/53255951/equivalent-to-componentdidupdate-using-react-hooks

  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="chat-view">
      <div className="layout-container-md">
        {isMenuOpen ? <ChatMenu /> : null}
        <div className="chat-view__container">
          <header className="chat-view__header">
            <h3 className="chat-view__chat-name">Chat name)</h3>
            <BurgerButton
              className="chat-menu__button"
              isActive={isMenuOpen}
              onClick={() => setMenuOpen(!isMenuOpen)}
            />
          </header>

          <main className="chat-view__main">
            <Suspense fallback={<LoadingBackground />}>
              {/* <ChatHistory ref={chatHistoryRef} /> */}
              <ChatHistory />
            </Suspense>
          </main>

          <footer className="chat-view__footer">
            <MessageSendingForm />
          </footer>
        </div>
      </div>
    </div>
  );
});
