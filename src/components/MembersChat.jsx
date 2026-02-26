import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Circle, Users } from 'lucide-react';
import { members, seedMessages } from '../data/chatMessages';

function formatTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function Avatar({ member, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: member.colour,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Rajdhani', fontWeight: 700,
      fontSize: size * 0.38 + 'px',
      color: 'white', flexShrink: 0,
      border: '2px solid rgba(255,255,255,0.12)',
    }}>
      {member.initials}
    </div>
  );
}

function StatusDot({ status }) {
  const colours = { online: '#22c55e', away: '#f59e0b', offline: '#6b7280' };
  return (
    <div style={{
      width: 9, height: 9, borderRadius: '50%',
      background: colours[status] || colours.offline,
      border: '2px solid #111',
      position: 'absolute', bottom: 0, right: 0,
    }} />
  );
}

const ME = { id: 0, name: 'You', initials: 'ME', colour: '#CC0000', bike: '', status: 'online' };

export default function MembersChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(seedMessages);
  const [input, setInput] = useState('');
  const [unread, setUnread] = useState(2);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'members'
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: Date.now(), memberId: 0, text, ts: Date.now() }]);
    setInput('');
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const onlineCount = members.filter(m => m.status === 'online').length;

  return (
    <>
      {/* Floating bubble */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 200,
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--ducati-red)',
          boxShadow: '0 4px 24px rgba(204,0,0,0.45), 0 2px 8px rgba(0,0,0,0.4)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 32px rgba(204,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(204,0,0,0.45), 0 2px 8px rgba(0,0,0,0.4)'; }}
      >
        {open
          ? <X size={22} color="white" />
          : <MessageCircle size={22} color="white" />
        }
        {!open && unread > 0 && (
          <div style={{
            position: 'absolute', top: -4, right: -4,
            width: 20, height: 20, borderRadius: '50%',
            background: '#fff', color: 'var(--ducati-red)',
            fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.7rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--ducati-red)',
          }}>{unread}</div>
        )}
      </div>

      {/* Chat panel */}
      <div style={{
        position: 'fixed', bottom: '5.5rem', right: '2rem', zIndex: 199,
        width: 360, height: 520,
        background: 'rgba(12,12,12,0.97)',
        border: '1px solid rgba(204,0,0,0.25)',
        borderRadius: '16px',
        boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        transform: open ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(16px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s',
        transformOrigin: 'bottom right',
      }}>

        {/* Header */}
        <div style={{
          padding: '1rem 1.25rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
              <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.1rem', color: 'white', letterSpacing: '0.1em' }}>Members Chat</span>
            </div>
            <span style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
              {onlineCount} online
            </span>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0' }}>
            {[{ id: 'chat', label: 'Chat' }, { id: 'members', label: 'Members' }].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  fontFamily: 'Rajdhani', fontWeight: 700,
                  fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: activeTab === tab.id ? 'var(--ducati-red)' : 'rgba(255,255,255,0.35)',
                  borderBottom: activeTab === tab.id ? '2px solid var(--ducati-red)' : '2px solid transparent',
                  transition: 'color 0.15s',
                }}
              >{tab.label}</button>
            ))}
          </div>
        </div>

        {/* Chat tab */}
        {activeTab === 'chat' && (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {messages.map(msg => {
                const member = msg.memberId === 0 ? ME : members.find(m => m.id === msg.memberId);
                const isMe = msg.memberId === 0;
                return (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: isMe ? 'row-reverse' : 'row', gap: '0.6rem', alignItems: 'flex-end' }}>
                    {!isMe && (
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <Avatar member={member} size={30} />
                        <StatusDot status={member.status} />
                      </div>
                    )}
                    <div style={{ maxWidth: '75%' }}>
                      {!isMe && (
                        <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.7rem', color: member.colour, letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                          {member.name}
                        </div>
                      )}
                      <div style={{
                        background: isMe ? 'var(--ducati-red)' : 'rgba(255,255,255,0.07)',
                        border: isMe ? 'none' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        padding: '0.55rem 0.85rem',
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '0.85rem',
                        fontFamily: 'Rajdhani',
                        lineHeight: 1.4,
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ fontFamily: 'Rajdhani', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.2rem', textAlign: isMe ? 'right' : 'left' }}>
                        {formatTime(msg.ts)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div style={{
              padding: '0.75rem 1rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: '0.5rem', alignItems: 'center',
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Message the group…"
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', padding: '0.55rem 0.85rem',
                  color: 'white', fontFamily: 'Rajdhani', fontSize: '0.875rem',
                  outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(204,0,0,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                style={{
                  width: 36, height: 36, borderRadius: '10px',
                  background: input.trim() ? 'var(--ducati-red)' : 'rgba(255,255,255,0.07)',
                  border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.15s',
                  flexShrink: 0,
                }}
              >
                <Send size={15} color={input.trim() ? 'white' : 'rgba(255,255,255,0.25)'} />
              </button>
            </div>
          </>
        )}

        {/* Members tab */}
        {activeTab === 'members' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1.25rem' }}>
            {['online', 'away', 'offline'].map(status => {
              const group = members.filter(m => m.status === status);
              if (!group.length) return null;
              const labels = { online: 'Online', away: 'Away', offline: 'Offline' };
              const colours = { online: '#22c55e', away: '#f59e0b', offline: '#6b7280' };
              return (
                <div key={status} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: colours[status], marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: colours[status] }} />
                    {labels[status]} — {group.length}
                  </div>
                  {group.map(member => (
                    <div key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ position: 'relative' }}>
                        <Avatar member={member} size={36} />
                        <StatusDot status={member.status} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>{member.name}</div>
                        <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>{member.bike}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
