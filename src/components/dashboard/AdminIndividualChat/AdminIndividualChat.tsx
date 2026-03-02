import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
    ArrowLeft,
    Ban,
    CheckCheck,
    Eye,
    Flag,
    Send,
    Shield
} from 'lucide-react';

const avatarColors = [
  'bg-purple-500/20 text-purple-300',
  'bg-blue-500/20 text-blue-300',
  'bg-green-500/20 text-green-300',
  'bg-amber-500/20 text-amber-300',
];

export default function AdminIndividualChat() {
  const { requestId, chatId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // Mock chat data based on chatId
  const chat = {
    1: {
      participant: 'Seller_001',
      participantName: 'Ravi Kumar',
      requestTitle: 'Luxury Penthouse in Sandton',
      buyer: 'Buyer_789',
      buyerName: 'John Anderson',
    },
    2: {
      participant: 'Developer_042',
      participantName: 'Sarah Williams',
      requestTitle: 'Luxury Penthouse in Sandton',
      buyer: 'Buyer_789',
      buyerName: 'John Anderson',
    },
    3: {
      participant: 'Agent_105',
      participantName: 'John Mbatha',
      requestTitle: 'Luxury Penthouse in Sandton',
      buyer: 'Buyer_789',
      buyerName: 'John Anderson',
    },
  }[Number(chatId)] || {
    participant: 'Seller_001',
    participantName: 'Ravi Kumar',
    requestTitle: 'Luxury Penthouse in Sandton',
    buyer: 'Buyer_789',
    buyerName: 'John Anderson',
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: chat.participant,
      senderName: chat.participantName,
      role: 'seller',
      text: 'I have a property that matches your requirements. 3-bedroom penthouse in Sandton with excellent city views.',
      timestamp: '10:30 AM',
      status: 'delivered',
    },
    {
      id: 2,
      sender: chat.buyer,
      senderName: chat.buyerName,
      role: 'user',
      text: 'That sounds interesting. What is your asking price and what floor is it on?',
      timestamp: '11:15 AM',
      status: 'delivered',
    },
    {
      id: 3,
      sender: chat.participant,
      senderName: chat.participantName,
      role: 'seller',
      text: 'Price is R 10,500,000. It\'s on the 15th floor with panoramic views. Property has modern finishes installed last year.',
      timestamp: '11:42 AM',
      status: 'delivered',
    },
    {
      id: 4,
      sender: 'Admin',
      senderName: 'System Admin',
      role: 'admin',
      text: 'I\'ve reviewed both parties\' credentials. You may proceed with detailed discussions. Remember, no personal contact information should be shared in this chat.',
      timestamp: '2:20 PM',
      status: 'delivered',
    },
    {
      id: 5,
      sender: chat.buyer,
      senderName: chat.buyerName,
      role: 'user',
      text: 'Thank you admin. I would like to know more about the finishes and amenities.',
      timestamp: '2:35 PM',
      status: 'delivered',
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'Admin',
      senderName: 'System Admin',
      role: 'admin',
      text: message,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages(prev => [...prev, newMessage as any]);
    setMessage('');
  };

  const colorIndex = Number(chatId) % avatarColors.length;

  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A]">
      {/* Header */}
      <div className="bg-[#111111] border-b border-[#D4AF37]/20 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(`/requests/${requestId}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-3 group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Request
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${avatarColors[colorIndex]}`}>
                {chat.participant.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-lg text-white font-medium">
                  {chat.participantName} <span className="text-gray-600 font-normal text-sm">(shows as {chat.participant})</span>
                </h1>
                <p className="text-xs text-gray-500">
                  Chatting with: <span className="text-gray-400">{chat.buyerName} (shows as {chat.buyer})</span>
                </p>
                <p className="text-xs text-gray-500">
                  Regarding: <span className="text-gray-400">{chat.requestTitle}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg px-3 py-1.5">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs text-[#D4AF37] font-medium">Admin Monitoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-[#111111] border-b border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg px-4 py-2">
            <Eye className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <p className="text-xs text-gray-400">
              <span className="text-[#D4AF37] font-medium">Admin View:</span> You can see both parties' real names and identities. Users only see anonymous IDs.
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">
          {messages.map((msg, idx:number) => (
            <div
              key={idx}             
              className={`flex ${
                msg.role === 'admin' ? 'justify-center' : msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className={`max-w-[70%] ${msg.role === 'admin' ? 'w-full max-w-2xl' : ''}`}>
                {/* Sender Info */}
                <div
                  className={`flex items-center gap-2 mb-1.5 px-1 ${
                    msg.role === 'admin'
                      ? 'justify-center'
                      : msg.role === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <span
                    className={`text-xs font-medium ${
                      msg.role === 'admin'
                        ? 'text-[#D4AF37]'
                        : msg.role === 'user'
                        ? 'text-blue-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {msg.senderName}
                    {msg.role !== 'admin' && (
                      <span className="text-gray-600 font-normal ml-1 text-[11px]">
                        (shows as {msg.sender})
                      </span>
                    )}
                    {msg.role === 'admin' && (
                      <span className="ml-2 text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded">
                        ADMIN
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-600">{msg.timestamp}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'admin'
                      ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                      : msg.role === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/30'
                      : 'bg-[#1A1A1A] border border-white/10'
                  }`}
                >
                  <p className="text-sm text-white leading-relaxed">{msg.text}</p>

                  {msg.role === 'user' && (
                    <div className="flex items-center justify-end gap-1 mt-2">
                      <CheckCheck
                        className={`w-3.5 h-3.5 ${
                          msg.status === 'delivered' ? 'text-blue-400' : 'text-gray-600'
                        }`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Actions Bar */}
      <div className="bg-[#111111] border-t border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('User muted in this chat')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 text-orange-400 border border-orange-400/20 rounded-lg text-xs font-medium hover:bg-orange-500/20 transition-colors"
            >
              <Ban className="w-3.5 h-3.5" />
              Mute User
            </button>
            <button
              onClick={() => alert('Chat flagged for review')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-400/20 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              Flag Chat
            </button>
            <span className="text-xs text-gray-600 ml-auto">Admin can moderate and send messages</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#111111] border-t border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <form onSubmit={handleSend} className="relative">
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Type admin message…"
              className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-xl pl-4 pr-14 py-3 text-white placeholder:text-gray-600 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none resize-none text-sm transition-all"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="absolute right-2 bottom-2 bg-[#D4AF37] text-black p-2.5 rounded-lg hover:bg-[#F4CF57] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
            <span>Press Enter to send • Shift+Enter for new line</span>
            <span className="text-[#D4AF37]">✓ Sending as Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
