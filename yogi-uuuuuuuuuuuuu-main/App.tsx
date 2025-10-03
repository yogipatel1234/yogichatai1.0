
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { Message, Role } from './types';
import { SYSTEM_INSTRUCTION, SUGGESTIONS } from './constants';
import { createChatSession } from './services/geminiService';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import SuggestionChips from './components/SuggestionChips';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initChat = () => {
      const newChat = createChatSession(SYSTEM_INSTRUCTION);
      setChat(newChat);
    };
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (isLoading || !chat || !userInput.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { role: Role.USER, text: userInput };
    setMessages(prev => [...prev, userMessage, { role: Role.MODEL, text: '' }]);

    try {
      const stream = await chat.sendMessageStream({ message: userInput });

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text += chunkText;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = 'Sorry, something went wrong. Please try again.';
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.role === Role.MODEL && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </main>
      <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 p-4 md:p-6">
        {messages.length === 0 && !isLoading && (
          <SuggestionChips suggestions={SUGGESTIONS} onSelect={handleSendMessage} />
        )}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
}

export default App;
