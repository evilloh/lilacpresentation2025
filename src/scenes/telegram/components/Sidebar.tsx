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
        {Object.keys(chats).map((chat, index) => {
          const lastMessage =
            chats[chat as keyof ChatsI][chats[chat as keyof ChatsI].length - 1];
          return (
            <li
              key={chat}
              className={currentChat === chat ? "active" : ""}
              onClick={() => setCurrentChat(chat as keyof ChatsI)}
            >
              <div className="chat-item">
                <div className="chat-image">
                  <img
                    src="/assets/sample.png" // Updated path
                    alt={`Chat ${chat}`}
                  />
                </div>
                <div className="chat-info">
                  <div className="chat-title">
                    {index === 0
                      ? "LillaChannel"
                      : index === 1
                      ? "LillaCorp - UnLillaCorps"
                      : "Rosy <3"}
                  </div>
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
