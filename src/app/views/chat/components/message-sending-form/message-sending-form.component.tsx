import { FC, KeyboardEvent, useRef } from 'react';

import { FormikErrors, FormikHelpers, useFormik } from 'formik';

import { checkIfStringIsEmpty } from '../../../../utils/check-if-string-is-empty.function';

import '../../../../../assets/styles/components/input.css';
import '../../../../../assets/styles/components/button.css';
import '../../../../../assets/styles/components/layout-container.css';

import './message-sending-form.styles.css';

export const MessageSendingForm: FC = () => {
  interface MessageSendingFormValues {
    text: string;
    senderName: string;
  }

  const initialValues: MessageSendingFormValues = {
    text: '',
    senderName: 'mark1337' // need to be full field!
  };

  const textMessageInputRef = useRef<HTMLTextAreaElement>(null);
  const focusTextMessageInputOnClick = () => textMessageInputRef.current?.focus();

  const scrollToMessageSendingForm = (): void => {
    // THIS CODE IS FUCKING BAD DO NOT, HEAR ME!!! DO NOT DO LIKE THIS! ok....
    const chatHistoryDomNode = document.querySelector('.chat-history');
    chatHistoryDomNode?.scrollTo(chatHistoryDomNode.scrollHeight, chatHistoryDomNode.scrollHeight);
  };

  const onSubmit = (
    message: MessageSendingFormValues,
    actions: FormikHelpers<MessageSendingFormValues>
  ) => {
    const processedMessage = {
      ...message,
      text: message.text.trim()
    };

    actions.resetForm();
    focusTextMessageInputOnClick();
    scrollToMessageSendingForm();

    console.log('message data:', processedMessage);
  };

  const validate = (message: MessageSendingFormValues) => {
    const messageSendingFormErrors: FormikErrors<MessageSendingFormValues> = {};

    const textValue = message.text;

    const isTextValueEmpty = checkIfStringIsEmpty(textValue);
    if (isTextValueEmpty) {
      messageSendingFormErrors.text = '';

      return messageSendingFormErrors;
    }

    return messageSendingFormErrors;
  };

  const messageSendingForm = useFormik({
    initialValues,
    onSubmit,
    validate
  });

  const submitOnKeyPress = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      await messageSendingForm.submitForm();

      setTimeout(() => {
        messageSendingForm.resetForm();
      }, 0);
    }
  };

  return (
    <form className="message-sending-form" onSubmit={messageSendingForm.handleSubmit}>
      <div className="message-sending-form__text-field-container">
        <textarea
          className="inp message-sending-form__text-field"
          placeholder="Type message text here..."
          name="text"
          cols={30}
          rows={4}
          ref={textMessageInputRef}
          value={messageSendingForm.values.text}
          onChange={messageSendingForm.handleChange}
          onBlur={messageSendingForm.handleBlur}
          onKeyPress={submitOnKeyPress}
        />
      </div>
      <button type="submit" className="btn btn-primary message-sending-form__sbm-button">
        Send
      </button>
    </form>
  );
};
