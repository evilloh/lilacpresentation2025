import type { ChatsI } from "../../../shared/interfaces";
import SearchBar from "./SearchBar";
import Stories, { type Story } from "./stories/Stories";

interface SidebarProps {
  chats: ChatsI;
  currentChat: keyof ChatsI;
  setCurrentChat: (chat: keyof ChatsI) => void;
  chatStates: Record<
    keyof ChatsI,
    { displayedMessages: any[]; pendingMessages: any[] }
  >;
  stories: Story[];
}

export const Sidebar = ({
  chats,
  currentChat,
  setCurrentChat,
  chatStates,
  stories,
}: SidebarProps) => {
  const getMessagePreview = (message: string) => {
    const match = message.match(/<p>(.*?)<\/p>/);
    return match ? match[1] : message;
  };

  return (
    <div className="sidebar">
      <SearchBar />
      <Stories stories={stories} />
      <ul>
        {Object.keys(chats).map((chatKey) => {
          const chat = chats[chatKey];
          const lastMessage =
            chatStates[chatKey as keyof ChatsI].displayedMessages.at(-1);
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
                        {getMessagePreview(lastMessage.message)}
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
