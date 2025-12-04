import { useState } from "react";
import "./TelegramPage.scss";
import { lillaChannel } from "./chats/lillaChannel";
import { lillacorp } from "./chats/lillacorp";
import { rosy } from "./chats/rosy";
import { Sidebar } from "./components/Sidebar";
import { Chat } from "./components/chat/Chat";
import type { ChatsI } from "../../shared/interfaces";

const TelegramPage: React.FC = () => {
  const [chats, setChats] = useState<ChatsI>({
    lillaChannel: lillaChannel,
    lillacorp: lillacorp,
    rosy: rosy,
  });
  const [currentChat, setCurrentChat] = useState<keyof ChatsI>("lillaChannel");

  return (
    <div className="telegram-container">
      <Sidebar
        chats={chats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <Chat chats={chats} setChats={setChats} currentChat={currentChat} />
    </div>
  );
};

export default TelegramPage;
