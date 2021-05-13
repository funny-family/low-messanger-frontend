import { FunctionComponent } from 'react';

import './creating-chat.styles.css';
import './creating-chat.styles.layout.css';

import { ChatCreationForm } from '../../components/chat-creation-form';
// import { Stepper, MySlot } from '../../components/stepper';

export const CreatingChat: FunctionComponent = () => {
  return (
    <div className="creating-chat-view">
      <ChatCreationForm />

      {/* <Stepper amountOfSteps={4}>
        <MySlot>MySlot</MySlot>
      </Stepper> */}
    </div>
  );
};
