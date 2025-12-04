export interface ChatI {
  user: string;
  message: string;
}
export interface ChatsI {
  [key: string]: ChatI[];
}
