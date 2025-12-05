import { useState } from "react";
import "./TelegramPage.scss";
import { Sidebar } from "./components/Sidebar";
import { Chat } from "./components/chat/Chat";
import type { ChatsI } from "../../shared/interfaces";
import type { Story } from "./components/stories/Stories";

interface TelegramPageProps {
  lillaChannel: ChatsI["lillaChannel"];
  lillaCorp: ChatsI["lillaCorp"];
  rosy: ChatsI["rosy"];
  stories: Story[];
}
const TelegramPage: React.FC<TelegramPageProps> = ({
  lillaChannel,
  lillaCorp,
  rosy,
  stories,
}) => {
  const [chats, setChats] = useState<ChatsI>({
    lillaChannel: lillaChannel,
    lillaCorp: lillaCorp,
    rosy: rosy,
  });
  const [currentChat, setCurrentChat] = useState<keyof ChatsI>("lillaChannel");
  const [chatStates, setChatStates] = useState(() =>
    Object.keys(chats).reduce((acc, chatKey) => {
      acc[chatKey] = {
        displayedMessages: [chats[chatKey as keyof ChatsI].messages[0]],
        pendingMessages: chats[chatKey as keyof ChatsI].messages.slice(1),
      };
      return acc;
    }, {} as Record<keyof ChatsI, { displayedMessages: any[]; pendingMessages: any[] }>)
  );

  return (
    <div className="telegram-container">
      <Sidebar
        chats={chats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        chatStates={chatStates}
        stories={stories}
      />
      <Chat
        chats={chats}
        setChats={setChats}
        currentChat={currentChat}
        chatStates={chatStates}
        setChatStates={setChatStates}
      />
    </div>
  );
};

export default TelegramPage;
