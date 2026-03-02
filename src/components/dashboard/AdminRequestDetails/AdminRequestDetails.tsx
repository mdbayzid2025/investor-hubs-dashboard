import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import {
    AlertTriangle,
    ArrowLeft,
    Ban,
    Calendar,
    CheckCircle,
    DollarSign,
    Eye,
    Flag,
    MapPin,
    MessageSquare,
    Shield,
    XCircle
} from 'lucide-react';

export function AdminRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if this is an approval view (from approvals/requests/:id)
  const isApprovalView = location.pathname.includes('/approvals/');
  
  // Check if this is a pending item (not yet approved)
  const isPending = new URLSearchParams(location.search).get('pending') === 'true';
  
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState<'Open' | 'Active' | 'Closed'>('Active');

  // Mock request data
  const request = {
    id: Number(id),
    title: 'Luxury Penthouse in Sandton',
    description: 'Looking for a modern 3-bedroom penthouse with city views, preferably in Sandton CBD area. Must have premium finishes and secure parking.',
    userName: 'John Anderson', // Real name (admin sees this)
    anonymousId: 'Investor001', // What other users see
    userType: 'Investor',
    category: 'Residential',
    budget: 'R 8,000,000 - R 12,000,000',
    location: 'Sandton, Johannesburg',
    postedDate: '2024-03-15',
    status: 'Active'
  };

  // Mock conversation messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Seller_001',
      senderName: 'Michael Smith', // Real name
      role: 'seller',
      text: 'I have a property that matches your requirements. 3-bedroom penthouse in Sandton with excellent city views.',
      timestamp: '2024-03-16 10:30',
      status: 'delivered'
    },
    {
      id: 2,
      sender: request.anonymousId,
      senderName: request.userName,
      role: 'user',
      text: 'That sounds interesting. What is your asking price and what floor is it on?',
      timestamp: '2024-03-16 11:15',
      status: 'delivered'
    },
    {
      id: 3,
      sender: 'Seller_001',
      senderName: 'Michael Smith',
      role: 'seller',
      text: 'Price is R 10,500,000. It\'s on the 15th floor with panoramic views. Property has modern finishes installed last year.',
      timestamp: '2024-03-16 11:42',
      status: 'delivered'
    },
    {
      id: 4,
      sender: 'Admin',
      senderName: 'System Admin',
      role: 'admin',
      text: 'I\'ve reviewed both parties\' credentials. You may proceed with detailed discussions. Remember, no personal contact information should be shared in this chat.',
      timestamp: '2024-03-16 14:20',
      status: 'delivered'
    }
  ]);

//   @ts-ignore
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'Admin',
      senderName: 'System Admin',
      role: 'admin',
      text: message,
      timestamp: new Date().toLocaleString('en-ZA', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'sent'
    };

    setMessages([...messages, newMessage as any]);
    setMessage('');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Open': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
      'Active': 'bg-green-400/10 text-green-400 border-green-400/20',
      'Closed': 'bg-gray-400/10 text-gray-400 border-gray-400/20'
    };
    return colors[status as keyof typeof colors] || colors.Open;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(isApprovalView ? '/approvals' : '/requests')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {isApprovalView ? 'Back to Approvals' : 'Back to Requests Board'}
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        
        {/* Title & Status Card */}
        <div         
          className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-2xl font-serif text-white">{request.title}</h1>
            <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(requestStatus)}`}>
              {requestStatus === 'Active' && <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />}
              {requestStatus}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/10 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Real Name (Admin View)</p>
              <p className="text-[#D4AF37] font-medium">{request.userName}</p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/10 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Anonymous ID</p>
              <p className="text-white font-medium">{request.anonymousId}</p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/10 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">User Type</p>
              <p className="text-white font-medium">{request.userType}</p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/10 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Category</p>
              <p className="text-white font-medium">{request.category}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              {request.postedDate}
            </span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              {request.location}
            </span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-medium">{request.budget}</span>
            </span>
          </div>
        </div>

        {/* Description Card */}
        <div                    
          className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl p-6"
        >
          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Request Details</h3>
          <p className="text-gray-300 leading-relaxed">{request.description}</p>
        </div>

        {/* Admin Actions Card */}
        <div 
          className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl p-6"
        >
          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">
            {isPending ? 'Approval Actions' : 'Admin Actions'}
          </h3>
          
          {isPending ? (
            // Approval buttons for pending requests
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  console.log('Approving request:', request.id);
                  alert('Request approved and published to Request Board!');
                  navigate('/approvals');
                }}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white border border-green-400/20 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Approve & Publish
              </button>
              <button
                onClick={() => {
                  const reason = prompt('Rejection reason (optional):');
                  console.log('Rejecting request:', request.id, 'Reason:', reason);
                  alert('Request rejected!');
                  navigate('/approvals');
                }}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 border border-red-400/20 rounded-lg font-medium hover:bg-red-500/20 transition-colors"
              >
                <Ban className="w-4 h-4" />
                Reject Request
              </button>
            </div>
          ) : (
            // Status management buttons for published requests
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setRequestStatus('Open')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-400/20 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Mark as Open
              </button>
              <button
                onClick={() => setRequestStatus('Active')}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 border border-green-400/20 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Active
              </button>
              <button
                onClick={() => setRequestStatus('Closed')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500/10 text-gray-400 border border-gray-400/20 rounded-lg text-sm font-medium hover:bg-gray-500/20 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                Close Request
              </button>
              <button
                onClick={() => alert('Content flagged for review')}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-400 border border-orange-400/20 rounded-lg text-sm font-medium hover:bg-orange-500/20 transition-colors ml-auto"
              >
                <Flag className="w-4 h-4" />
                Flag Content
              </button>
            </div>
          )}
        </div>

        {/* Individual Chats - Only show for approved/published requests */}
        {!isPending && (
          <div        
            className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <h3 className="text-white font-medium">Individual Chats</h3>
                  <p className="text-xs text-gray-500">3 active conversations</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg px-3 py-1.5">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-xs text-[#D4AF37] font-medium">Admin View - All Chats</span>
              </div>
            </div>

            {/* Chat Cards */}
            <div className="p-6 space-y-3 bg-[#0A0A0A]">
              {/* Chat 1: Seller_001 with Buyer_789 */}
              <div
                onClick={() => navigate(`/requests/${id}/chat/1`)}
                className="bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 rounded-lg p-4 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    SE
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-300">
                          Ravi Kumar <span className="text-gray-600 font-normal text-xs">(shows as Seller_001)</span>
                        </span>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] rounded-full">
                          Active Chat
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      I have a property that matches your requirements. 3-bedroom penthouse in Sandton...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        <MessageSquare className="w-3 h-3 inline mr-1" />
                        7 messages
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/requests/${id}/chat/1`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] text-black text-xs font-medium rounded-lg hover:bg-[#F4CF57] transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat 2: Developer_042 with Buyer_789 */}
              <div
                onClick={() => navigate(`/requests/${id}/chat/2`)}
                className="bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 rounded-lg p-4 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    DE
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-300">
                          Sarah Williams <span className="text-gray-600 font-normal text-xs">(shows as Developer_042)</span>
                        </span>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] rounded-full">
                          Active Chat
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">5 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      I'm currently developing a similar property in the same area. Expected completion in 8 months...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        <MessageSquare className="w-3 h-3 inline mr-1" />
                        4 messages
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/requests/${id}/chat/2`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] text-black text-xs font-medium rounded-lg hover:bg-[#F4CF57] transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat 3: Agent_105 with Buyer_789 */}
              <div
                onClick={() => navigate(`/requests/${id}/chat/3`)}
                className="bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 rounded-lg p-4 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    AG
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-300">
                          John Mbatha <span className="text-gray-600 font-normal text-xs">(shows as Agent_105)</span>
                        </span>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] rounded-full">
                          Active Chat
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      I represent multiple property owners in Sandton. I can arrange viewings for 5 properties matching...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        <MessageSquare className="w-3 h-3 inline mr-1" />
                        9 messages
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/requests/${id}/chat/3`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] text-black text-xs font-medium rounded-lg hover:bg-[#F4CF57] transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}