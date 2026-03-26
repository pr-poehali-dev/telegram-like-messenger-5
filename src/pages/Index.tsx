import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "chats" | "contacts" | "groups" | "channels" | "notifications" | "settings" | "profile";

interface Message {
  id: number;
  text: string;
  time: string;
  out: boolean;
  read?: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  typing?: boolean;
  messages: Message[];
}

const CHATS: Chat[] = [
  {
    id: 1,
    name: "Алексей Морозов",
    avatar: "АМ",
    lastMessage: "Окей, завтра встретимся!",
    time: "21:47",
    unread: 2,
    online: true,
    typing: false,
    messages: [
      { id: 1, text: "Привет! Как дела?", time: "21:30", out: false },
      { id: 2, text: "Всё отлично, спасибо! Ты как?", time: "21:31", out: true, read: true },
      { id: 3, text: "Тоже хорошо. Планируешь завтра на встречу?", time: "21:45", out: false },
      { id: 4, text: "Да, буду там. Во сколько начинаем?", time: "21:46", out: true, read: true },
      { id: 5, text: "Окей, завтра встретимся!", time: "21:47", out: false },
    ],
  },
  {
    id: 2,
    name: "Команда проекта",
    avatar: "КП",
    lastMessage: "Дима: Деплой прошёл успешно 🚀",
    time: "20:15",
    unread: 5,
    online: false,
    isGroup: true,
    typing: true,
    messages: [
      { id: 1, text: "Ребята, нужно обсудить дедлайн", time: "19:00", out: false },
      { id: 2, text: "Я думаю до пятницы успеем", time: "19:15", out: true, read: true },
      { id: 3, text: "Согласен, начинаем утром", time: "19:30", out: false },
      { id: 4, text: "Деплой прошёл успешно 🚀", time: "20:15", out: false },
    ],
  },
  {
    id: 3,
    name: "Мария Соколова",
    avatar: "МС",
    lastMessage: "Спасибо за помощь!",
    time: "18:02",
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: "Можешь помочь с документом?", time: "17:45", out: false },
      { id: 2, text: "Конечно, скидывай", time: "17:46", out: true, read: true },
      { id: 3, text: "Вот, посмотри пожалуйста", time: "17:50", out: false },
      { id: 4, text: "Готово, проверил!", time: "18:01", out: true, read: true },
      { id: 5, text: "Спасибо за помощь!", time: "18:02", out: false },
    ],
  },
  {
    id: 4,
    name: "Дизайнеры",
    avatar: "🎨",
    lastMessage: "Катя: Макеты готовы",
    time: "16:30",
    unread: 1,
    online: false,
    isGroup: true,
    messages: [
      { id: 1, text: "Когда будут готовы макеты?", time: "15:00", out: true, read: true },
      { id: 2, text: "Макеты готовы", time: "16:30", out: false },
    ],
  },
  {
    id: 5,
    name: "Иван Петров",
    avatar: "ИП",
    lastMessage: "Понял, сделаю",
    time: "вчера",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Иван, нужно срочно исправить баг", time: "вчера", out: true, read: true },
      { id: 2, text: "Понял, сделаю", time: "вчера", out: false },
    ],
  },
];

const CONTACTS = [
  { name: "Алексей Морозов", phone: "+7 900 123-45-67", online: true, avatar: "АМ" },
  { name: "Дмитрий Волков", phone: "+7 911 234-56-78", online: false, avatar: "ДВ" },
  { name: "Иван Петров", phone: "+7 922 345-67-89", online: false, avatar: "ИП" },
  { name: "Катерина Лисова", phone: "+7 933 456-78-90", online: true, avatar: "КЛ" },
  { name: "Мария Соколова", phone: "+7 944 567-89-01", online: true, avatar: "МС" },
  { name: "Николай Орлов", phone: "+7 955 678-90-12", online: false, avatar: "НО" },
];

const GROUPS = [
  { name: "Команда проекта", members: 8, avatar: "КП", description: "Рабочая группа разработки" },
  { name: "Дизайнеры", members: 4, avatar: "🎨", description: "Обсуждение дизайн-задач" },
  { name: "Друзья", members: 12, avatar: "👥", description: "Общий чат с друзьями" },
  { name: "Семья", members: 5, avatar: "❤️", description: "Семейный чат" },
];

interface Channel {
  id: number;
  name: string;
  avatar: string;
  description: string;
  subscribers: string;
  verified: boolean;
  posts: { id: number; text: string; time: string; views: number; image?: string }[];
}

const CHANNELS: Channel[] = [
  {
    id: 101,
    name: "Технологии сегодня",
    avatar: "ТС",
    description: "Новости мира IT, стартапы, разработка",
    subscribers: "128 тыс.",
    verified: true,
    posts: [
      { id: 1, text: "🚀 OpenAI представила новую модель с улучшенным reasoning. По тестам она значительно превосходит предшественников в математике и программировании.", time: "22:00", views: 14200 },
      { id: 2, text: "📱 Apple анонсировала обновление iOS 18.4 с новыми функциями для разработчиков. Релиз ожидается на следующей неделе.", time: "20:30", views: 9800 },
      { id: 3, text: "💻 GitHub Copilot теперь поддерживает более 30 языков программирования. Подписчики уже отмечают заметное улучшение качества подсказок.", time: "18:15", views: 7300 },
    ],
  },
  {
    id: 102,
    name: "Дизайн и UX",
    avatar: "DX",
    description: "Лучшие практики дизайна интерфейсов",
    subscribers: "54 тыс.",
    verified: false,
    posts: [
      { id: 1, text: "🎨 Figma выкатила AI-инструмент для автоматической генерации компонентов. Теперь дизайн-системы строятся в разы быстрее.", time: "21:00", views: 5600 },
      { id: 2, text: "✏️ Топ-5 ошибок начинающих UX-дизайнеров — разбираем каждую с примерами. Сохраняй, чтобы не потерять.", time: "14:00", views: 8200 },
    ],
  },
  {
    id: 103,
    name: "Бизнес и стартапы",
    avatar: "БС",
    description: "Истории успеха, инвестиции, фаундерам",
    subscribers: "210 тыс.",
    verified: true,
    posts: [
      { id: 1, text: "📈 Российский рынок венчурных инвестиций вырос на 23% в первом квартале 2026. Наибольший рост — в сегменте B2B SaaS.", time: "19:45", views: 22000 },
      { id: 2, text: "💡 Как запустить MVP за 2 недели без программиста — пошаговый гайд от основателя, который сделал это трижды.", time: "12:00", views: 31000 },
    ],
  },
  {
    id: 104,
    name: "Космос и наука",
    avatar: "🌌",
    description: "Последние открытия и миссии",
    subscribers: "87 тыс.",
    verified: true,
    posts: [
      { id: 1, text: "🛸 SpaceX успешно провела 15-й тестовый запуск Starship. Корабль впервые совершил мягкую посадку на платформу в Тихом океане.", time: "23:30", views: 45000 },
      { id: 2, text: "🔭 Телескоп Джеймса Уэбба обнаружил признаки органических молекул в атмосфере экзопланеты K2-18b. Учёные осторожны, но взволнованы.", time: "16:00", views: 38000 },
    ],
  },
];

const NOTIFICATIONS = [
  { id: 1, text: "Алексей Морозов написал вам сообщение", time: "21:47", type: "message", avatar: "АМ" },
  { id: 2, text: "Вас добавили в группу «Дизайнеры»", time: "16:00", type: "group", avatar: "🎨" },
  { id: 3, text: "Мария Соколова хочет добавить вас в контакты", time: "14:30", type: "contact", avatar: "МС" },
  { id: 4, text: "Команда проекта: 5 новых сообщений", time: "вчера", type: "group", avatar: "КП" },
];

const AVATAR_COLORS = [
  "from-blue-500 to-blue-700",
  "from-purple-500 to-purple-700",
  "from-green-500 to-green-700",
  "from-orange-500 to-orange-700",
  "from-pink-500 to-pink-700",
  "from-teal-500 to-teal-700",
];

function getColor(name: string) {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function Avatar({ text, size = "md", online }: { text: string; size?: "sm" | "md" | "lg"; online?: boolean }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-11 h-11 text-sm", lg: "w-14 h-14 text-base" };
  const isEmoji = /\p{Emoji}/u.test(text) && text.length <= 2;
  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-br ${isEmoji ? "from-slate-600 to-slate-800" : getColor(text)}`}
      >
        {text}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[var(--tg-sidebar)] animate-pulse-dot" style={{ background: "var(--tg-online)" }} />
      )}
    </div>
  );
}

function CallModal({ contact, onClose, type }: { contact: string; onClose: () => void; type: "voice" | "video" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}>
      <div className="flex flex-col items-center gap-6 animate-scale-in">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-bold call-ring">
            {contact.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
          </div>
        </div>
        <div className="text-center">
          <p className="text-white text-xl font-semibold">{contact}</p>
          <p className="text-blue-300 text-sm mt-1">{type === "video" ? "Видеозвонок..." : "Исходящий вызов..."}</p>
        </div>
        <div className="flex gap-8 mt-4">
          {type === "video" && (
            <button className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Icon name="VideoOff" size={22} className="text-white" />
            </button>
          )}
          <button className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Icon name="MicOff" size={22} className="text-white" />
          </button>
          <button
            onClick={onClose}
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "#e53e3e" }}
          >
            <Icon name="PhoneOff" size={26} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [section, setSection] = useState<Section>("chats");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(CHATS[0]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [callModal, setCallModal] = useState<{ contact: string; type: "voice" | "video" } | null>(null);
  const [pinnedIds, setPinnedIds] = useState<Set<number>>(new Set());
  const [contextMenu, setContextMenu] = useState<{ chatId: number; x: number; y: number } | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [subscribedChannels, setSubscribedChannels] = useState<Set<number>>(new Set([101, 103]));
  const [messages, setMessages] = useState<Record<number, Message[]>>(
    Object.fromEntries(CHATS.map(c => [c.id, c.messages]))
  );

  const sendMessage = () => {
    if (!inputValue.trim() || !selectedChat) return;
    const newMsg: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      out: true,
      read: false,
    };
    setMessages(prev => ({ ...prev, [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg] }));
    setInputValue("");
  };

  const togglePin = (id: number) => {
    setPinnedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
    setContextMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent, chatId: number) => {
    e.preventDefault();
    setContextMenu({ chatId, x: e.clientX, y: e.clientY });
  };

  const sortedChats = [...CHATS]
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const ap = pinnedIds.has(a.id) ? 0 : 1;
      const bp = pinnedIds.has(b.id) ? 0 : 1;
      return ap - bp;
    });

  const toggleSubscribe = (id: number) => {
    setSubscribedChannels(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const navItems = [
    { id: "chats" as Section, icon: "MessageCircle", label: "Чаты" },
    { id: "channels" as Section, icon: "Rss", label: "Каналы" },
    { id: "groups" as Section, icon: "Users", label: "Группы" },
    { id: "contacts" as Section, icon: "Contact", label: "Контакты" },
    { id: "notifications" as Section, icon: "Bell", label: "Уведомления" },
    { id: "settings" as Section, icon: "Settings", label: "Настройки" },
    { id: "profile" as Section, icon: "User", label: "Профиль" },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: "var(--tg-chat-bg)", fontFamily: "'Golos Text', sans-serif" }}>
      {callModal && (
        <CallModal contact={callModal.contact} type={callModal.type} onClose={() => setCallModal(null)} />
      )}

      {/* Боковая навигация */}
      <nav className="flex flex-col items-center py-4 gap-1 flex-shrink-0 border-r" style={{ width: 68, background: "var(--tg-sidebar)", borderColor: "var(--tg-border)" }}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition-transform">
          <Icon name="Send" size={18} className="text-white" />
        </div>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            title={item.label}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 relative group ${
              section === item.id ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
            style={section === item.id ? { background: "var(--tg-accent)" } : { background: "transparent" }}
          >
            <Icon name={item.icon} size={20} />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Список чатов / контентная панель */}
      <div className="flex flex-col border-r flex-shrink-0" style={{ width: 320, background: "var(--tg-sidebar)", borderColor: "var(--tg-border)" }}>
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-lg font-bold mb-3" style={{ color: "var(--tg-text)" }}>
            {section === "chats" && "Чаты"}
            {section === "channels" && "Каналы"}
            {section === "contacts" && "Контакты"}
            {section === "groups" && "Группы"}
            {section === "notifications" && "Уведомления"}
            {section === "settings" && "Настройки"}
            {section === "profile" && "Мой профиль"}
          </h1>
          {(section === "chats" || section === "contacts" || section === "channels") && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "var(--tg-hover)" }}>
              <Icon name="Search" size={15} className="flex-shrink-0" style={{ color: "var(--tg-text-secondary)" } as React.CSSProperties} />
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-full"
                style={{ color: "var(--tg-text)" }}
              />
            </div>
          )}
        </div>

        {/* Чаты */}
        {section === "chats" && (
          <div className="overflow-y-auto flex-1" onClick={() => setContextMenu(null)}>
            {pinnedIds.size > 0 && (
              <div className="px-4 pt-2 pb-1">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--tg-text-secondary)" }}>Закреплённые</span>
              </div>
            )}
            {sortedChats.map((chat, idx) => {
              const isPinned = pinnedIds.has(chat.id);
              const prevPinned = idx > 0 ? pinnedIds.has(sortedChats[idx - 1].id) : true;
              const showDivider = !isPinned && prevPinned && pinnedIds.size > 0;
              return (
                <div key={chat.id}>
                  {showDivider && (
                    <div className="px-4 pt-3 pb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--tg-text-secondary)" }}>Все чаты</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedChat(chat)}
                    onContextMenu={(e) => handleContextMenu(e, chat.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 text-left relative"
                    style={{ background: selectedChat?.id === chat.id ? "var(--tg-hover)" : "transparent" }}
                  >
                    {isPinned && (
                      <div className="absolute top-2 right-3">
                        <Icon name="Pin" size={11} style={{ color: "var(--tg-accent)", opacity: 0.7 }} />
                      </div>
                    )}
                    <Avatar text={chat.avatar} online={chat.online} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-sm truncate" style={{ color: "var(--tg-text)" }}>{chat.name}</span>
                        <span className="text-xs flex-shrink-0 ml-2" style={{ color: "var(--tg-text-secondary)" }}>{chat.time}</span>
                      </div>
                      <div className="flex justify-between items-center mt-0.5">
                        {chat.typing ? (
                          <div className="flex items-center gap-1">
                            <span className="text-xs" style={{ color: "var(--tg-accent)" }}>печатает</span>
                            <div className="flex gap-0.5">
                              {[0, 1, 2].map(i => (
                                <span key={i} className="w-1 h-1 rounded-full typing-dot" style={{ background: "var(--tg-accent)", animationDelay: `${i * 0.2}s` }} />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs truncate" style={{ color: "var(--tg-text-secondary)" }}>{chat.lastMessage}</span>
                        )}
                        {chat.unread > 0 && (
                          <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: "var(--tg-accent)", fontSize: 10 }}>
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Контакты */}
        {section === "contacts" && (
          <div className="overflow-y-auto flex-1 px-2">
            {CONTACTS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((c, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1 cursor-pointer transition-all hover:scale-[1.01]" style={{ background: "var(--tg-hover)" }}>
                <Avatar text={c.avatar} online={c.online} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: "var(--tg-text)" }}>{c.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--tg-text-secondary)" }}>{c.online ? "в сети" : c.phone}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setCallModal({ contact: c.name, type: "voice" })} className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" style={{ background: "rgba(43,133,236,0.15)" }}>
                    <Icon name="Phone" size={14} style={{ color: "var(--tg-accent)" }} />
                  </button>
                  <button onClick={() => setCallModal({ contact: c.name, type: "video" })} className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" style={{ background: "rgba(43,133,236,0.15)" }}>
                    <Icon name="Video" size={14} style={{ color: "var(--tg-accent)" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Каналы */}
        {section === "channels" && (
          <div className="overflow-y-auto flex-1 px-2">
            <div className="mb-2">
              <p className="px-1 pb-2 text-xs" style={{ color: "var(--tg-text-secondary)" }}>Мои подписки</p>
              {CHANNELS.filter(c => subscribedChannels.has(c.id) && c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-left transition-all hover:scale-[1.01]"
                  style={{ background: selectedChannel?.id === ch.id ? "rgba(43,133,236,0.15)" : "var(--tg-hover)" }}
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-white text-sm bg-gradient-to-br ${getColor(ch.avatar)}`}>{ch.avatar}</div>
                    {ch.verified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "var(--tg-accent)" }}>
                        <Icon name="Check" size={9} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-sm truncate" style={{ color: "var(--tg-text)" }}>{ch.name}</p>
                    </div>
                    <p className="text-xs truncate mt-0.5" style={{ color: "var(--tg-text-secondary)" }}>{ch.subscribers} подписчиков</p>
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: "var(--tg-text-secondary)" }}>{ch.posts[0]?.time}</span>
                </button>
              ))}
            </div>
            {CHANNELS.filter(c => !subscribedChannels.has(c.id) && c.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
              <div className="mt-2">
                <p className="px-1 pb-2 text-xs" style={{ color: "var(--tg-text-secondary)" }}>Рекомендуемые</p>
                {CHANNELS.filter(c => !subscribedChannels.has(c.id) && c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(ch => (
                  <div key={ch.id} className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1" style={{ background: "var(--tg-hover)" }}>
                    <div className="relative flex-shrink-0">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-white text-sm bg-gradient-to-br ${getColor(ch.avatar)}`}>{ch.avatar}</div>
                      {ch.verified && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "var(--tg-accent)" }}>
                          <Icon name="Check" size={9} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: "var(--tg-text)" }}>{ch.name}</p>
                      <p className="text-xs truncate mt-0.5" style={{ color: "var(--tg-text-secondary)" }}>{ch.subscribers} подписчиков</p>
                    </div>
                    <button onClick={() => toggleSubscribe(ch.id)} className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-80" style={{ background: "var(--tg-accent)" }}>
                      + Подписаться
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Группы */}
        {section === "groups" && (
          <div className="overflow-y-auto flex-1 px-2">
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-3 transition-all hover:opacity-90" style={{ background: "var(--tg-accent)" }}>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Icon name="Plus" size={18} className="text-white" />
              </div>
              <span className="font-semibold text-sm text-white">Создать группу</span>
            </button>
            {GROUPS.map((g, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1 cursor-pointer transition-all hover:scale-[1.01]" style={{ background: "var(--tg-hover)" }}>
                <Avatar text={g.avatar} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: "var(--tg-text)" }}>{g.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--tg-text-secondary)" }}>{g.members} участников · {g.description}</p>
                </div>
                <Icon name="ChevronRight" size={16} style={{ color: "var(--tg-text-secondary)" }} />
              </div>
            ))}
          </div>
        )}

        {/* Уведомления */}
        {section === "notifications" && (
          <div className="overflow-y-auto flex-1 px-2">
            {NOTIFICATIONS.map(n => (
              <div key={n.id} className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1 cursor-pointer transition-all hover:scale-[1.01]" style={{ background: "var(--tg-hover)" }}>
                <Avatar text={n.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "var(--tg-text)" }}>{n.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--tg-text-secondary)" }}>{n.time}</p>
                </div>
                {n.type === "contact" && (
                  <div className="flex gap-1">
                    <button className="px-2 py-1 rounded-lg text-xs font-medium text-white" style={{ background: "var(--tg-accent)" }}>Да</button>
                    <button className="px-2 py-1 rounded-lg text-xs font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "var(--tg-text-secondary)" }}>Нет</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Настройки */}
        {section === "settings" && (
          <div className="overflow-y-auto flex-1 px-2 pb-4">
            {[
              { icon: "Bell", label: "Уведомления", desc: "Звуки, вибрация, режим" },
              { icon: "Lock", label: "Конфиденциальность", desc: "Пароль, блокировка" },
              { icon: "Moon", label: "Тёмная тема", desc: "Включена" },
              { icon: "Globe", label: "Язык", desc: "Русский" },
              { icon: "Download", label: "Данные и хранилище", desc: "Авто-загрузка медиа" },
              { icon: "HelpCircle", label: "Помощь", desc: "FAQ и поддержка" },
              { icon: "LogOut", label: "Выйти", desc: "", danger: true },
            ].map((item: { icon: string; label: string; desc: string; danger?: boolean }, i) => (
              <button key={i} className="w-full flex items-center gap-3 px-3 py-3.5 rounded-xl mb-1 transition-all hover:scale-[1.01] text-left" style={{ background: "var(--tg-hover)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: item.danger ? "rgba(229,62,62,0.15)" : "rgba(43,133,236,0.15)" }}>
                  <Icon name={item.icon} size={18} style={{ color: item.danger ? "#e53e3e" : "var(--tg-accent)" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: item.danger ? "#e53e3e" : "var(--tg-text)" }}>{item.label}</p>
                  {item.desc && <p className="text-xs" style={{ color: "var(--tg-text-secondary)" }}>{item.desc}</p>}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Профиль */}
        {section === "profile" && (
          <div className="overflow-y-auto flex-1 pb-4">
            <div className="flex flex-col items-center py-6 px-4">
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  ВМ
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--tg-accent)" }}>
                  <Icon name="Camera" size={12} className="text-white" />
                </div>
              </div>
              <h2 className="font-bold text-lg" style={{ color: "var(--tg-text)" }}>Вячеслав Михайлов</h2>
              <p className="text-sm" style={{ color: "var(--tg-text-secondary)" }}>+7 900 000-00-00</p>
              <p className="text-xs mt-1" style={{ color: "var(--tg-online)" }}>в сети</p>
            </div>
            <div className="px-2">
              {[
                { icon: "Edit3", label: "Имя", value: "Вячеслав Михайлов" },
                { icon: "Phone", label: "Телефон", value: "+7 900 000-00-00" },
                { icon: "AtSign", label: "Username", value: "@vyacheslav" },
                { icon: "Info", label: "О себе", value: "Разработчик, люблю кофе ☕" },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-left transition-all hover:scale-[1.01]" style={{ background: "var(--tg-hover)" }}>
                  <Icon name={item.icon} size={16} style={{ color: "var(--tg-accent)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "var(--tg-text-secondary)" }}>{item.label}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--tg-text)" }}>{item.value}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Область канала */}
      {section === "channels" && selectedChannel ? (
        <div className="flex flex-col flex-1 min-w-0">
          {/* Шапка канала */}
          <div className="flex items-center gap-3 px-5 py-3 border-b flex-shrink-0" style={{ background: "var(--tg-bg)", borderColor: "var(--tg-border)" }}>
            <div className="relative flex-shrink-0">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-white text-sm bg-gradient-to-br ${getColor(selectedChannel.avatar)}`}>{selectedChannel.avatar}</div>
              {selectedChannel.verified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "var(--tg-accent)" }}>
                  <Icon name="Check" size={9} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: "var(--tg-text)" }}>{selectedChannel.name}</p>
              <p className="text-xs" style={{ color: "var(--tg-text-secondary)" }}>{selectedChannel.subscribers} подписчиков</p>
            </div>
            <button
              onClick={() => toggleSubscribe(selectedChannel.id)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
              style={subscribedChannels.has(selectedChannel.id)
                ? { background: "var(--tg-hover)", color: "var(--tg-text-secondary)" }
                : { background: "var(--tg-accent)", color: "#fff" }}
            >
              {subscribedChannels.has(selectedChannel.id) ? "Отписаться" : "+ Подписаться"}
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 ml-1" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Icon name="MoreVertical" size={16} style={{ color: "var(--tg-text-secondary)" }} />
            </button>
          </div>

          {/* Посты канала */}
          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4" style={{ background: "var(--tg-chat-bg)" }}>
            {/* Шапка канала */}
            <div className="flex flex-col items-center py-6 animate-fade-in">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-xl bg-gradient-to-br ${getColor(selectedChannel.avatar)} mb-3`}>{selectedChannel.avatar}</div>
              <h2 className="font-bold text-lg" style={{ color: "var(--tg-text)" }}>{selectedChannel.name}</h2>
              <p className="text-sm mt-1 text-center max-w-xs" style={{ color: "var(--tg-text-secondary)" }}>{selectedChannel.description}</p>
              <div className="flex items-center gap-1 mt-2">
                <Icon name="Users" size={13} style={{ color: "var(--tg-text-secondary)" }} />
                <span className="text-xs" style={{ color: "var(--tg-text-secondary)" }}>{selectedChannel.subscribers} подписчиков</span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--tg-border)" }} />

            {selectedChannel.posts.map((post, i) => (
              <div key={post.id} className="rounded-2xl p-4 animate-message-in" style={{ background: "var(--tg-message-in)", animationDelay: `${i * 0.07}s` }}>
                <p className="text-sm leading-relaxed" style={{ color: "var(--tg-text)" }}>{post.text}</p>
                <div className="flex items-center justify-between mt-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
                      <Icon name="Heart" size={14} style={{ color: "var(--tg-text-secondary)" }} />
                      <span className="text-xs" style={{ color: "var(--tg-text-secondary)" }}>Нравится</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
                      <Icon name="Share2" size={14} style={{ color: "var(--tg-text-secondary)" }} />
                      <span className="text-xs" style={{ color: "var(--tg-text-secondary)" }}>Поделиться</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={12} style={{ color: "var(--tg-text-secondary)" }} />
                    <span className="text-xs" style={{ color: "var(--tg-text-secondary)" }}>{post.views.toLocaleString("ru-RU")}</span>
                    <span className="text-xs ml-2" style={{ color: "var(--tg-text-secondary)" }}>{post.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Строка только для чтения */}
          <div className="px-4 py-3 flex items-center gap-3 border-t" style={{ background: "var(--tg-bg)", borderColor: "var(--tg-border)" }}>
            <div className="flex-1 flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5" style={{ background: "var(--tg-hover)" }}>
              <Icon name="Lock" size={14} style={{ color: "var(--tg-text-secondary)" }} />
              <span className="text-sm" style={{ color: "var(--tg-text-secondary)" }}>Канал только для чтения</span>
            </div>
          </div>
        </div>
      ) : section === "channels" ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ background: "var(--tg-chat-bg)" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(43,133,236,0.1)" }}>
            <Icon name="Rss" size={32} style={{ color: "var(--tg-accent)" }} />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--tg-text)" }}>Каналы</h2>
            <p className="text-sm" style={{ color: "var(--tg-text-secondary)" }}>Выберите канал для просмотра</p>
          </div>
        </div>
      ) : null}

      {/* Область чата */}
      {section === "chats" && selectedChat ? (
        <div className="flex flex-col flex-1 min-w-0">
          {/* Шапка чата */}
          <div className="flex items-center gap-3 px-5 py-3 border-b flex-shrink-0" style={{ background: "var(--tg-bg)", borderColor: "var(--tg-border)" }}>
            <Avatar text={selectedChat.avatar} online={selectedChat.online} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: "var(--tg-text)" }}>{selectedChat.name}</p>
              <p className="text-xs" style={{ color: selectedChat.online ? "var(--tg-online)" : "var(--tg-text-secondary)" }}>
                {selectedChat.typing ? (
                  <span style={{ color: "var(--tg-accent)" }}>печатает...</span>
                ) : selectedChat.isGroup ? `${selectedChat.messages.length} участников` : selectedChat.online ? "в сети" : "был(а) недавно"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCallModal({ contact: selectedChat.name, type: "voice" })}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(43,133,236,0.15)" }}
              >
                <Icon name="Phone" size={16} style={{ color: "var(--tg-accent)" }} />
              </button>
              <button
                onClick={() => setCallModal({ contact: selectedChat.name, type: "video" })}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(43,133,236,0.15)" }}
              >
                <Icon name="Video" size={16} style={{ color: "var(--tg-accent)" }} />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.05)" }}>
                <Icon name="Search" size={16} style={{ color: "var(--tg-text-secondary)" }} />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.05)" }}>
                <Icon name="MoreVertical" size={16} style={{ color: "var(--tg-text-secondary)" }} />
              </button>
            </div>
          </div>

          {/* Сообщения */}
          <div
            className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-2"
            style={{
              background: "var(--tg-chat-bg)",
              backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(43,133,236,0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(43,133,236,0.02) 0%, transparent 50%)",
            }}
          >
            {(messages[selectedChat.id] || []).map((msg, i) => (
              <div
                key={msg.id}
                className={`flex ${msg.out ? "justify-end" : "justify-start"} animate-message-in`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div
                  className="max-w-md px-4 py-2.5"
                  style={{
                    background: msg.out ? "var(--tg-message-out)" : "var(--tg-message-in)",
                    borderRadius: msg.out ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "var(--tg-text)" }}>{msg.text}</p>
                  <div className={`flex items-center gap-1 mt-1 ${msg.out ? "justify-end" : "justify-start"}`}>
                    <span style={{ color: "var(--tg-text-secondary)", fontSize: 10 }}>{msg.time}</span>
                    {msg.out && (
                      <Icon name={msg.read ? "CheckCheck" : "Check"} size={12} style={{ color: msg.read ? "var(--tg-accent)" : "var(--tg-text-secondary)" }} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Поле ввода */}
          <div className="px-4 py-3 flex items-end gap-2 border-t flex-shrink-0" style={{ background: "var(--tg-bg)", borderColor: "var(--tg-border)" }}>
            <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full transition-all hover:scale-110" style={{ color: "var(--tg-text-secondary)" }}>
              <Icon name="Paperclip" size={19} />
            </button>
            <div className="flex-1 flex items-center rounded-2xl px-4 py-2 min-h-[40px]" style={{ background: "var(--tg-hover)" }}>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Написать сообщение..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--tg-text)" }}
              />
              <button className="ml-2 flex-shrink-0 hover:scale-110 transition-transform" style={{ color: "var(--tg-text-secondary)" }}>
                <Icon name="Smile" size={18} />
              </button>
            </div>
            <button
              onClick={sendMessage}
              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full transition-all hover:scale-110"
              style={{ background: inputValue.trim() ? "var(--tg-accent)" : "var(--tg-hover)" }}
            >
              {inputValue.trim() ? (
                <Icon name="Send" size={16} className="text-white" />
              ) : (
                <Icon name="Mic" size={18} style={{ color: "var(--tg-text-secondary)" }} />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ background: "var(--tg-chat-bg)" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(43,133,236,0.1)" }}>
            <Icon name="Send" size={32} style={{ color: "var(--tg-accent)" }} />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--tg-text)" }}>Веста</h2>
            <p className="text-sm" style={{ color: "var(--tg-text-secondary)" }}>Выберите чат для начала общения</p>
          </div>
        </div>
      )}

      {/* Контекстное меню */}
      {contextMenu && (
        <div
          className="fixed z-50 rounded-xl overflow-hidden shadow-2xl animate-scale-in"
          style={{ top: contextMenu.y, left: contextMenu.x, background: "var(--tg-bg)", border: "1px solid var(--tg-border)", minWidth: 180 }}
        >
          <button
            onClick={() => togglePin(contextMenu.chatId)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:opacity-80 text-left"
            style={{ background: "transparent", color: "var(--tg-text)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--tg-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <Icon name={pinnedIds.has(contextMenu.chatId) ? "PinOff" : "Pin"} size={16} style={{ color: "var(--tg-accent)" }} />
            {pinnedIds.has(contextMenu.chatId) ? "Открепить" : "Закрепить"}
          </button>
          <button
            onClick={() => setContextMenu(null)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left"
            style={{ background: "transparent", color: "var(--tg-text)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--tg-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <Icon name="BellOff" size={16} style={{ color: "var(--tg-text-secondary)" }} />
            Отключить звук
          </button>
          <div style={{ borderTop: "1px solid var(--tg-border)" }} />
          <button
            onClick={() => setContextMenu(null)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left"
            style={{ background: "transparent", color: "#e53e3e" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(229,62,62,0.08)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <Icon name="Trash2" size={16} style={{ color: "#e53e3e" }} />
            Удалить чат
          </button>
        </div>
      )}
    </div>
  );
}