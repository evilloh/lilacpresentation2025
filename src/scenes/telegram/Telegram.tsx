import { useState } from "react";
import "./TelegramPage.scss";
import { Sidebar } from "./components/Sidebar";
import { Chat } from "./components/chat/Chat";
import type { ChatsI } from "../../shared/interfaces";
import type { Story } from "./components/stories/Stories";

interface TelegramPageProps {
  lillaChannel: ChatsI["lillaChannel"];
  lillaCorp: ChatsI["lillaCorp"];
  rosy?: ChatsI["rosy"];
  evilloh?: ChatsI["evilloh"];
  stories?: Story[];
}

const TelegramPage: React.FC<TelegramPageProps> = ({
  lillaChannel,
  lillaCorp,
  rosy,
  stories,
  evilloh,
}: TelegramPageProps) => {
  const [chats, setChats] = useState<Partial<ChatsI>>({
    lillaChannel: lillaChannel,
    lillaCorp: lillaCorp,
    rosy: rosy,
    evilloh: evilloh,
  });
  const [currentChat, setCurrentChat] = useState<keyof ChatsI>("lillaChannel");
  const [chatStates, setChatStates] = useState(() =>
    Object.keys(chats).reduce((acc, chatKey) => {
      acc[chatKey] = {
        displayedMessages: [chats[chatKey as keyof ChatsI]?.messages[0]],
        pendingMessages:
          chats[chatKey as keyof ChatsI]?.messages.slice(1) || [],
      };
      return acc;
    }, {} as Record<keyof ChatsI, { displayedMessages: any[]; pendingMessages: any[] }>)
  );
  const [isChatOpen, setIsChatOpen] = useState(true);

  const openChat = (chatKey: keyof ChatsI) => {
    setCurrentChat(chatKey);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className={`telegram-container ${isChatOpen ? "chat-open" : ""}`}>
      <Sidebar
        chats={chats}
        currentChat={currentChat}
        setCurrentChat={openChat}
        chatStates={chatStates}
        stories={stories}
      />
      <div className="chat-container">
        {isChatOpen && (
          <div className="chat-header">
            <button className="back-button" onClick={closeChat}>
              &#8592; Back
            </button>
            <h2 className="chat-title">{chats[currentChat]?.name}</h2>
          </div>
        )}
        <Chat
          setChats={setChats}
          currentChat={currentChat}
          chatStates={chatStates}
          setChatStates={setChatStates}
        />
      </div>
    </div>
  );
};

export default TelegramPage;
