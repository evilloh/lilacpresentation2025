export interface ChatMessage {
  user: string;
  message: string;
}

export const lillacorp = {
  name: "LillaCorp - UnLillaCorps",
  image: "/assets/lillacorplogo.jpg",
  messages: [
    {
      user: "Miso",
      message:
        "<a href='/lab' style='text-decoration: none; color: inherit;'><div style={{display: flex}}> <div>Hey team, check out this concept art for our new project!</div><img src='/assets/ilpost.jpg' alt='Miso Image 1' style='width: 100%;'/></div></a>",
    },
  ],
};
