import { useEffect, useState, useRef } from "react";
import type { ChatsI } from "../../../../shared/interfaces";
import { userImages } from "../../../../shared/constants";

interface ChatProps {
  setChats: React.Dispatch<React.SetStateAction<Partial<ChatsI>>>;
  currentChat: keyof ChatsI;
  chatStates: Record<
    keyof ChatsI,
    { displayedMessages: any[]; pendingMessages: any[] }
  >;
  setChatStates: React.Dispatch<
    React.SetStateAction<
      Record<keyof ChatsI, { displayedMessages: any[]; pendingMessages: any[] }>
    >
  >;
}

export const Chat = ({
  setChats,
  currentChat,
  chatStates,
  setChatStates,
}: ChatProps) => {
  const [input, setInput] = useState("");
  console.log(currentChat);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }

    const animatedChats = ["lillaChannel", "rosy", "evilloh"];

    if (!animatedChats.includes(currentChat as string)) {
      setChatStates((prevStates) => {
        const currentState = prevStates[currentChat];
        if (currentState.pendingMessages.length > 0) {
          return {
            ...prevStates,
            [currentChat]: {
              displayedMessages: [
                ...currentState.displayedMessages,
                ...currentState.pendingMessages,
              ],
              pendingMessages: [],
            },
          };
        }
        return prevStates;
      });
      return;
    }

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

    const randomInterval = () => Math.floor(Math.random() * 3000) + 1000; // Random interval between 1 and 5 seconds
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
      setChats((prevChats) => {
        const currentChatData = prevChats[currentChat];
        if (!currentChatData) return prevChats;
        return {
          ...prevChats,
          [currentChat]: {
            ...currentChatData,
            messages: [...(currentChatData.messages || []), newMessage],
          },
        };
      });
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
                  <p dangerouslySetInnerHTML={{ __html: msg.message }}></p>
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
          disabled={
            !String(currentChat).toLocaleLowerCase().includes("lillacha")
          }
        />
        <button
          onClick={sendMessage}
          disabled={
            !String(currentChat).toLocaleLowerCase().includes("lillacha")
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};
