import type { ChatsI } from "../../../shared/interfaces";
import SearchBar from "./SearchBar";
import Stories from "./stories/Stories";

interface SidebarProps {
  chats: ChatsI;
  currentChat: keyof ChatsI;
  setCurrentChat: (chat: keyof ChatsI) => void;
}

export const Sidebar = ({
  chats,
  currentChat,
  setCurrentChat,
}: SidebarProps) => {
  return (
    <div className="sidebar">
      <SearchBar />
      <Stories />
      <ul>
        {Object.keys(chats).map((chatKey) => {
          const chat = chats[chatKey];
          const lastMessage = chat.messages[chat.messages.length - 1];
          return (
            <li
              key={chatKey}
              className={currentChat === chatKey ? "active" : ""}
              onClick={() => setCurrentChat(chatKey as keyof ChatsI)}
            >
              <div className="chat-item">
                <div className="chat-image">
                  <img src={chat.image} alt={`Chat ${chat.name}`} />
                </div>
                <div className="chat-info">
                  <div className="chat-title">{chat.name}</div>
                  <div className="chat-last-message">
                    {lastMessage ? (
                      <>
                        <span>{lastMessage.user}:</span>
                        {lastMessage.message}
                      </>
                    ) : (
                      "No messages yet"
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
