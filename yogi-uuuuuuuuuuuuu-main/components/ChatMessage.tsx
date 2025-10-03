
import React from 'react';
import { Message, Role } from '../types';

interface ChatMessageProps {
  message: Message;
}

// NOTE: For a richer experience, you could use a library like 'react-markdown'
// to render the message text if it contains markdown syntax.
// Example: import ReactMarkdown from 'react-markdown';
// and replace <p> with <ReactMarkdown>{message.text}</ReactMarkdown>

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  const wrapperClasses = `flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`;
  const messageClasses = `max-w-xl px-4 py-3 rounded-2xl shadow-md ${
    isUser
      ? 'bg-indigo-600 text-white rounded-br-lg'
      : 'bg-gray-700 text-gray-200 rounded-bl-lg'
  }`;
  
  const avatarClasses = `w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-white ${
    isUser ? 'bg-blue-500' : 'bg-purple-500'
  }`;

  const Avatar = () => (
    <div className={avatarClasses}>
      {isUser ? 'You' : 'AI'}
    </div>
  );

  return (
    <div className={wrapperClasses}>
      {!isUser && <Avatar />}
      <div className={messageClasses}>
        <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
      </div>
      {isUser && <Avatar />}
    </div>
  );
};

export default ChatMessage;
