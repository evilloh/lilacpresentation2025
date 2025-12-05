import { useEffect, useState } from "react";
import type { ChatsI } from "../../../../shared/interfaces";
import { userImages } from "../../../../shared/constants";

interface ChatProps {
  chats: ChatsI;
  setChats: React.Dispatch<React.SetStateAction<ChatsI>>;
  currentChat: keyof ChatsI;
}

export const Chat = ({ chats, setChats, currentChat }: ChatProps) => {
  const [input, setInput] = useState("");
  const [pendingMessages, setPendingMessages] = useState(
    chats[currentChat].messages.slice(1) // Start with all messages except the first one
  );
  const [displayedMessages, setDisplayedMessages] = useState([
    chats[currentChat].messages[0], // Start with the first message
  ]);

  // Reset messages when the currentChat changes
  useEffect(() => {
    setPendingMessages(chats[currentChat].messages.slice(1));
    setDisplayedMessages([chats[currentChat].messages[0]]);
  }, [currentChat, chats]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pendingMessages.length > 0) {
        const nextMessage = pendingMessages[0];
        setDisplayedMessages((prev) => [...prev, nextMessage]);
        setPendingMessages((prev) => prev.slice(1));
      }
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [pendingMessages]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { user: "You", message: input };
      setDisplayedMessages((prev) => [...prev, newMessage]);
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
        {displayedMessages.map(
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
