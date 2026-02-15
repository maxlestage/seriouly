import { useState } from 'react';
import './Messages.css';

interface ChatMessage {
  id: number;
  content: string;
  sender: 'me' | 'them';
  time: string;
  liked: boolean;
}

const DEMO_CONVERSATIONS = [
  { id: 1, name: 'Léa', initial: 'L', lastMsg: 'On se voit ce soir ?', time: '14:32', unread: 2 },
  { id: 2, name: 'Thomas', initial: 'T', lastMsg: 'Haha trop bien 😄', time: '13:10', unread: 0 },
  { id: 3, name: 'Camille', initial: 'C', lastMsg: 'Merci pour hier !', time: '12:45', unread: 1 },
  { id: 4, name: 'Hugo', initial: 'H', lastMsg: "J'adore cet endroit", time: 'Hier', unread: 0 },
  { id: 5, name: 'Emma', initial: 'E', lastMsg: 'À bientôt !', time: 'Hier', unread: 0 },
];

const DEMO_MESSAGES: ChatMessage[] = [
  { id: 1, content: 'Salut ! Comment tu vas ? 😊', sender: 'them', time: '14:20', liked: false },
  { id: 2, content: 'Hey ! Super bien et toi ?', sender: 'me', time: '14:22', liked: false },
  { id: 3, content: "Très bien merci ! Tu fais quoi ce soir ?", sender: 'them', time: '14:25', liked: false },
  { id: 4, content: "Rien de prévu, pourquoi ?", sender: 'me', time: '14:27', liked: false },
  { id: 5, content: "On pourrait aller prendre un verre au centre-ville, il y a un nouveau bar qui a ouvert", sender: 'them', time: '14:28', liked: false },
  { id: 6, content: "Trop bonne idée ! J'adore 🎉", sender: 'me', time: '14:30', liked: true },
  { id: 7, content: "On se voit ce soir ?", sender: 'them', time: '14:32', liked: false },
];

const Messages = () => {
  const [activeConvo, setActiveConvo] = useState(DEMO_CONVERSATIONS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(DEMO_MESSAGES);
  const [input, setInput] = useState('');
  const [lastTap, setLastTap] = useState<{ id: number; time: number } | null>(null);

  const handleDoubleTap = (msgId: number) => {
    const now = Date.now();
    if (lastTap && lastTap.id === msgId && now - lastTap.time < 300) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, liked: !m.liked } : m))
      );
      setLastTap(null);
    } else {
      setLastTap({ id: msgId, time: now });
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      content: input.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      liked: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="messages-page">
      {/* Sidebar */}
      <aside className="msg-sidebar">
        <div className="msg-sidebar__header">
          <h2 className="msg-sidebar__title">Messages</h2>
          <span className="msg-sidebar__badge">{new Date().getFullYear()} · v1.0.0</span>
        </div>

        <div className="msg-sidebar__search">
          <input
            type="text"
            placeholder="Rechercher..."
            className="msg-sidebar__search-input"
          />
        </div>

        <div className="msg-sidebar__list">
          {DEMO_CONVERSATIONS.map((conv) => (
            <div
              key={conv.id}
              className={`msg-convo ${activeConvo.id === conv.id ? 'msg-convo--active' : ''} interactive`}
              onClick={() => setActiveConvo(conv)}
            >
              <div className="msg-convo__avatar">
                <span>{conv.initial}</span>
              </div>
              <div className="msg-convo__info">
                <div className="msg-convo__top">
                  <span className="msg-convo__name">{conv.name}</span>
                  <span className="msg-convo__time">{conv.time}</span>
                </div>
                <p className="msg-convo__last">{conv.lastMsg}</p>
              </div>
              {conv.unread > 0 && (
                <div className="msg-convo__unread">{conv.unread}</div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <main className="msg-chat">
        {/* Chat header */}
        <div className="msg-chat__header">
          <div className="msg-chat__header-avatar">
            <span>{activeConvo.initial}</span>
          </div>
          <div>
            <h3 className="msg-chat__header-name">{activeConvo.name}</h3>
            <span className="msg-chat__header-status">En ligne</span>
          </div>
        </div>

        {/* Hint */}
        <div className="msg-chat__hint">
          Double-cliquez sur un message pour l'aimer ♥
        </div>

        {/* Messages */}
        <div className="msg-chat__messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`msg-bubble-row ${msg.sender === 'me' ? 'msg-bubble-row--right' : 'msg-bubble-row--left'}`}
              onClick={() => handleDoubleTap(msg.id)}
            >
              <div
                className={`msg-bubble ${msg.sender === 'me' ? 'msg-bubble--mine' : 'msg-bubble--theirs'}`}
              >
                <p className="msg-bubble__text">{msg.content}</p>
                <span className="msg-bubble__time">{msg.time}</span>

                {msg.liked && (
                  <span className={`msg-bubble__heart ${msg.sender === 'me' ? 'msg-bubble__heart--left' : 'msg-bubble__heart--right'}`}>
                    ♥
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="msg-chat__input-area">
          <textarea
            className="msg-chat__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Votre message..."
            rows={1}
          />
          <button
            className={`msg-chat__send interactive ${!input.trim() ? 'msg-chat__send--disabled' : ''}`}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            ↑
          </button>
        </div>
      </main>
    </div>
  );
};

export default Messages;
