export interface ChatMessage {
  user: string;
  message: string;
}

export interface ChatI {
  name: string;
  image: string;
  messages: ChatMessage[];
}

export interface ChatsI {
  [key: string]: ChatI;
}
