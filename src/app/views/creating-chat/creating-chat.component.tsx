import { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';

// import { getAuthToken } from '../../store/auth';

import { ChatCreationForm } from '../../components/chat-creation-form';
import { UserCreationForm } from '../../components/user-creation-form';

import '../../../assets/styles/components/layout-container.css';
import '../../../assets/styles/components/form.css';

import './creating-chat.styles.css';

export const CreatingChat: FC = observer(() => {
  const store = useStore();
  // const isUserSuccessfullyCreated = store.user.userCreationForm.submittedSuccessfully;

  // console.log('isUserSuccessfullyCreated:', isUserSuccessfullyCreated);
  const [isFormVisible, setFormVisibility] = useState(true);
  const accessToken = localStorage.getItem('auth');

  useEffect(() => {
    console.log(isFormVisible);
    if (!!accessToken === false) {
      setFormVisibility(true);
      return;
    }

    setFormVisibility(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="layout-container-md">
      <div className="creating-chat-view form-padding">
        {/* {!isUserSuccessfullyCreated ? <UserCreationForm /> : <ChatCreationForm />} */}
        {isFormVisible ? <UserCreationForm /> : null}
        <ChatCreationForm />
      </div>
    </div>
  );
});
