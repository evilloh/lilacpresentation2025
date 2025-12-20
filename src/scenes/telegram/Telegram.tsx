import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./TelegramPage.scss";
import { Sidebar } from "./components/Sidebar";
import { Chat } from "./components/chat/Chat";
import type { ChatsI } from "../../shared/interfaces";
import type { Story } from "./components/stories/Stories";

interface TelegramPageProps {
  lillaChannel?: ChatsI["lillaChannel"];
  lillaCorp?: ChatsI["lillaCorp"];
  rosy?: ChatsI["rosy"];
  evilloh?: ChatsI["evilloh"];
  stories?: Story[];
  pezzo?: ChatsI["pezzo"];
  last?: boolean;
}

const TelegramPage: React.FC<TelegramPageProps> = ({
  lillaChannel,
  lillaCorp,
  rosy,
  stories,
  evilloh,
  pezzo,
  last,
}: TelegramPageProps) => {
  const location = useLocation();

  const buildChats = (): Partial<ChatsI> => ({
    lillaChannel: lillaChannel,
    lillaCorp: lillaCorp,
    rosy: rosy,
    evilloh: evilloh,
    pezzo: pezzo,
  });

  const buildChatStates = (nextChats: Partial<ChatsI>) =>
    Object.keys(nextChats).reduce((acc, chatKey) => {
      const key = chatKey as keyof ChatsI;
      const chat = nextChats[key];
      const messages = chat?.messages || [];
      acc[key] = {
        displayedMessages: messages.length > 0 ? [messages[0]] : [],
        pendingMessages: messages.length > 1 ? messages.slice(1) : [],
      };
      return acc;
    }, {} as Record<keyof ChatsI, { displayedMessages: any[]; pendingMessages: any[] }>);

  const [chats, setChats] = useState<Partial<ChatsI>>({
    lillaChannel: lillaChannel,
    lillaCorp: lillaCorp,
    rosy: rosy,
    evilloh: evilloh,
    pezzo: pezzo,
  });
  const [currentChat, setCurrentChat] = useState<keyof ChatsI>(
    lillaChannel ? "lillaChannel" : "pezzo"
  );
  const [chatStates, setChatStates] = useState(() => buildChatStates(chats));
  const [isChatOpen, setIsChatOpen] = useState(true);

  useEffect(() => {
    const nextChats = buildChats();
    setChats(nextChats);
    setCurrentChat(lillaChannel ? "lillaChannel" : "pezzo");
    setChatStates(buildChatStates(nextChats));
    setIsChatOpen(true);
    // We intentionally reset on route changes, not on message sends.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
          last={last}
        />
      </div>
    </div>
  );
};

export default TelegramPage;
