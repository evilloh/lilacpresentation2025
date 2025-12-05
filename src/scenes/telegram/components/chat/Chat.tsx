import { useEffect, useState, useRef } from "react";
import type { ChatsI } from "../../../../shared/interfaces";
import { userImages } from "../../../../shared/constants";

interface ChatProps {
  chats: ChatsI;
  setChats: React.Dispatch<React.SetStateAction<ChatsI>>;
  currentChat: keyof ChatsI;
}

export const Chat = ({ chats, setChats, currentChat }: ChatProps) => {
  const [input, setInput] = useState("");
  const [chatStates, setChatStates] = useState(() =>
    Object.keys(chats).reduce((acc, chatKey) => {
      acc[chatKey] = {
        displayedMessages: [chats[chatKey as keyof ChatsI].messages[0]],
        pendingMessages: chats[chatKey as keyof ChatsI].messages.slice(1),
      };
      return acc;
    }, {} as Record<keyof ChatsI, { displayedMessages: any[]; pendingMessages: any[] }>)
  );

  const intervalRef = useRef(null);

  useEffect(() => {
    // Clear any existing interval when switching chats
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up a new interval for the current chat
    const updateMessages = () => {
      setChatStates((prevStates) => {
        const currentState = prevStates[currentChat];
        if (currentState.pendingMessages.length > 0) {
          const nextMessage = currentState.pendingMessages[0];
          return {
            ...prevStates,
            [currentChat]: {
              displayedMessages: [
                ...currentState.displayedMessages,
                nextMessage,
              ],
              pendingMessages: currentState.pendingMessages.slice(1),
            },
          };
        }
        return prevStates;
      });
    };

    const randomInterval = () => Math.floor(Math.random() * 5000) + 1000; // Random interval between 1 and 5 seconds
    const setRandomInterval = () => {
      intervalRef.current = setTimeout(() => {
        updateMessages();
        setRandomInterval();
      }, randomInterval());
    };

    setRandomInterval();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [currentChat]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { user: "You", message: input };
      setChatStates((prevStates) => ({
        ...prevStates,
        [currentChat]: {
          ...prevStates[currentChat],
          displayedMessages: [
            ...prevStates[currentChat].displayedMessages,
            newMessage,
          ],
        },
      }));
      setChats((prevChats) => ({
        ...prevChats,
        [currentChat]: {
          ...prevChats[currentChat],
          messages: [...prevChats[currentChat].messages, newMessage],
        },
      }));
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-area">
      <div className="messages">
        {chatStates[currentChat].displayedMessages.map(
          (msg: { user: string; message: string }, index: number) => (
            <div
              key={index}
              className={`message ${msg.user === "You" ? "user" : "other"}`}
            >
              {msg.user !== "You" && (
                <div className="avatar">
                  <img
                    src={
                      userImages[
                        msg.user.toLowerCase() as keyof typeof userImages
                      ]
                    }
                    alt={`${msg.user}'s avatar`}
                  />
                </div>
              )}
              <div className="bubble-container">
                <div className="bubble">
                  {msg.user !== "You" && (
                    <div className="username">{msg.user}</div>
                  )}
                  {msg.message}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
