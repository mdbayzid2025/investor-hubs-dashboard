import {
    AlertCircle,
    AlertTriangle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    DollarSign,
    Eye,
    MapPin,
    MessageSquare,
    Search,
    Send,
    Trash2,
    User,
    XCircle
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../ui/button';

type Category = 'Vacant Land' | 'Farms' | 'Hotels' | 'Investment Portfolios' | 'all';
type RequestStatus = 'Open' | 'Active' | 'Closed' | 'all';
type ApprovalStatus = 'pending' | 'approved' | 'rejected';

interface Message {
  id: number;
  userId: number;
  userName: string; // Real name (admin sees this)
  userType: 'Investor' | 'Agent' | 'Developer' | 'Property Owner';
  anonymousId: string; // What other users see
  message: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  userId: number;
  userName: string;
  userType: 'Investor' | 'Developer';
  anonymousId: string;
  category: Category;
  title: string;
  description: string;
  budget: string;
  preferredLocation: string;
  postedDate: string;
  status: 'Open' | 'Active' | 'Closed';
  approvalStatus: ApprovalStatus;
  lastMessageDate: string;
  messages: Message[];
  unreadCount: number;
  investorId: number;
  investor: string;
  investorEmail: string;
  investorPhone: string;
  ownerId: number;
  owner: string;
  ownerEmail: string;
  ownerPhone: string;
}

const getStatusBadge = (status: string) => {
  const styles = {
    'Open': 'bg-blue-400/10 text-blue-400',
    'Active': 'bg-green-400/10 text-green-400',
    'Closed': 'bg-gray-400/10 text-gray-400'
  };
  return styles[status as keyof typeof styles] || styles.Open;
};

const getUserTypeColor = (type: string) => {
  const colors = {
    'Investor': 'text-green-400',
    'Developer': 'text-purple-400',
    'Agent': 'text-yellow-400',
    'Property Owner': 'text-blue-400'
  };
  return colors[type as keyof typeof colors] || 'text-gray-400';
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

interface AdminConversationDetailProps {
  conversation: Conversation;
  onBack: () => void;
}

// @ts-ignore
function AdminConversationDetail({ conversation, onBack }: AdminConversationDetailProps) {
  const [adminMessage, setAdminMessage] = useState('');
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!adminMessage.trim()) return;
    
    console.log('Admin sending message:', adminMessage);
    alert(`Message sent: "${adminMessage}"\n\nThis would be visible to all users in the thread.`);
    setAdminMessage('');
  };

  const handleCloseConversation = () => {
    console.log('Closing conversation:', conversation.id);
    alert('Conversation closed. Users can no longer reply.');
    setShowCloseConfirm(false);
    onBack();
  };

  const handleUserClick = (userId: number) => {
    // Navigate to AdminUsers page with userId as state
    navigate('/users', { state: { selectedUserId: userId } });
  };

//   const handleFacilitateConnection = () => {
//     const participants = Array.from(new Set(conversation.messages.map(m => m.userName)));
//     alert(`Facilitating connection between:\n\n${participants.join('\n')}\n\nYou would now contact these parties offline to arrange a formal introduction.`);
//   };

  return (
    <div className="p-8">
      {/* Conversation Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Requests Board
        </button>
        
        <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-gray-500 text-sm">Request #{conversation.id}</span>
                <span className="px-2 py-1 bg-purple-400/10 text-purple-400 rounded text-xs">
                  {conversation.category}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(conversation.status)}`}>
                  {conversation.status}
                </span>
              </div>
              <h2 className="text-2xl font-serif text-white mb-2">{conversation.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-white font-medium">{conversation.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">{conversation.preferredLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-white">
                    {new Date(conversation.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Original Poster Info (Admin View) */}
          <div className="bg-[#1A1A1A] border border-[#D4AF37]/10 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Posted by (Admin View):</p>
                <p className="text-white font-medium">{conversation.userName}</p>
                <p className={`text-sm ${getUserTypeColor(conversation.userType)}`}>
                  {conversation.userType}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Users see:</p>
                <p className="text-[#D4AF37] font-medium">{conversation.anonymousId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#D4AF37]/20">
          <h3 className="text-lg font-serif text-white">Conversation Thread</h3>
        </div>
        
        <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
          {conversation.messages.map((message:any, index:number) => {
            const isOriginalPoster = message.userId === conversation.userId;
            
            return (
              <div key={index} className={`flex ${isOriginalPoster ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${isOriginalPoster ? 'items-end' : 'items-start'} flex flex-col`}>
                  {/* User Info (Admin View) - Clickable Name */}
                  <div className="flex items-center gap-2 mb-1 px-2">
                    <User className="w-3 h-3 text-gray-500" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUserClick(message.userId);
                      }}
                      className="text-xs text-gray-400 hover:text-[#D4AF37] hover:underline transition-colors cursor-pointer font-medium"
                    >
                      {message.userName}
                    </button>
                    <span className={`text-xs ${getUserTypeColor(message.userType)}`}>
                      ({message.userType})
                    </span>
                    <span className="text-xs text-gray-600">→ shows as {message.anonymousId}</span>
                  </div>

                  {/* Message Bubble */}
                  <div className={`rounded-2xl px-4 py-3 ${
                    isOriginalPoster 
                      ? 'bg-[#D4AF37] text-black' 
                      : 'bg-[#1A1A1A] text-white border border-[#D4AF37]/20'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.message}</p>
                  </div>

                  {/* Timestamp */}
                  <span className="text-xs text-gray-500 mt-1 px-2">
                    {new Date(message.timestamp).toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin Message Input */}
        {conversation.status !== 'Closed' && (
          <div className="p-6 border-t border-[#D4AF37]/20 bg-[#1A1A1A]">
            <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-3 mb-4">
              <p className="text-blue-400 text-xs font-medium mb-1">💡 Admin Message Mode</p>
              <p className="text-gray-400 text-xs">
                Your message will show as <strong className="text-[#D4AF37]">"Investors Hub Admin"</strong> to all users
              </p>
            </div>

            <div className="flex gap-3">
              <textarea
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
                placeholder="Type your message to participants... (e.g., 'Thank you for the discussion. I will facilitate a connection between interested parties.')"
                className="flex-1 bg-[#111111] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                rows={3}
              />
              <button
                onClick={handleSendMessage}
                disabled={!adminMessage.trim()}
                className="px-6 bg-[#D4AF37] text-black rounded-lg hover:bg-[#D4AF37]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        )}

        {conversation.status === 'Closed' && (
          <div className="p-6 border-t border-[#D4AF37]/20 bg-red-400/5">
            <div className="flex items-center justify-center gap-2 text-red-400">
              <XCircle className="w-5 h-5" />
              <p className="font-medium">This conversation has been closed. No new messages allowed.</p>
            </div>
          </div>
        )}

        {/* Admin Actions */}
        <div className="p-6 border-t border-[#D4AF37]/20">
          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="outline"
              onClick={() => {
                const newStatus = conversation.status === 'Open' ? 'Active' : 'Open';
                alert(`Status changed to: ${newStatus}`);
              }}
              className="flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Change Status
            </Button>

            {conversation.status !== 'Closed' ? (
              <Button 
                variant="outline"
                onClick={() => setShowCloseConfirm(true)}
                className="flex items-center justify-center gap-2 text-red-400 border-red-400/20 hover:bg-red-400/10 hover:border-red-400"
              >
                <XCircle className="w-4 h-4" />
                Close Conversation
              </Button>
            ) : (
              <Button 
                variant="outline"
                onClick={() => {
                  alert('Conversation reopened');
                }}
                className="flex items-center justify-center gap-2 text-green-400 border-green-400/20 hover:bg-green-400/10 hover:border-green-400"
              >
                <CheckCircle className="w-4 h-4" />
                Reopen Conversation
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Close Confirmation Modal */}
      {showCloseConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-serif text-white mb-4">Close Conversation?</h3>
            <p className="text-gray-400 mb-6">
              This will close the conversation and prevent users from sending new messages. 
              You can reopen it later if needed.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCloseConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCloseConversation}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                Close Conversation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Requests() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<Conversation | null>(null);
  // Removed inline conversation viewer - now using dedicated details page
  // const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Mock data - Conversations
  const conversations: Conversation[] = [
    {
      id: 245,
      userId: 1012,
      userName: 'Michael Chen',
      userType: 'Investor',
      anonymousId: 'Investor #245',
      category: 'Vacant Land',
      title: 'Looking for commercial land in Johannesburg North',
      description: 'Seeking undeveloped commercial land parcel in Johannesburg North area. Preferably with existing zoning approvals. Interested in plots 5-10 hectares.',
      budget: 'R30M - R50M',
      preferredLocation: 'Johannesburg North',
      postedDate: '2024-01-20',
      status: 'Active',
      approvalStatus: 'approved',
      lastMessageDate: '2024-01-21T14:15:00',
      unreadCount: 2,
      messages: [
        {
          id: 1,
          userId: 1012,
          userName: 'Michael Chen',
          userType: 'Investor',
          anonymousId: 'Investor #245',
          message: 'Looking for commercial land in Johannesburg North area. Preferably with existing zoning approvals. Interested in plots 5-10 hectares. Budget R30M - R50M.',
          timestamp: '2024-01-20T09:00:00'
        },
        {
          id: 2,
          userId: 2034,
          userName: 'Sarah Williams',
          userType: 'Agent',
          anonymousId: 'Agent #102',
          message: 'Hi there! I may have something that matches your criteria. Approximately 7 hectares with commercial zoning. Can admin facilitate an introduction?',
          timestamp: '2024-01-21T10:30:00'
        },
        {
          id: 3,
          userId: 1012,
          userName: 'Michael Chen',
          userType: 'Investor',
          anonymousId: 'Investor #245',
          message: 'That sounds interesting. Yes, please have admin connect us to discuss further details.',
          timestamp: '2024-01-21T14:15:00'
        }
      ],
      investorId: 1012,
      investor: 'Michael Chen',
      investorEmail: 'michael.chen@example.com',
      investorPhone: '+1 (555) 123-4567',
      ownerId: 2034,
      owner: 'Sarah Williams',
      ownerEmail: 'sarah.williams@example.com',
      ownerPhone: '+1 (555) 765-4321'
    },
    {
      id: 244,
      userId: 3021,
      userName: 'Tech Corp Investments',
      userType: 'Investor',
      anonymousId: 'Investor #198',
      category: 'Hotels',
      title: 'Boutique hotel opportunity in Cape Town',
      description: 'Looking for existing boutique hotel or suitable building for conversion. Preferably in tourist areas with sea views. 20-50 rooms capacity.',
      budget: 'R80M - R150M',
      preferredLocation: 'Cape Town - Atlantic Seaboard',
      postedDate: '2024-01-19',
      status: 'Active',
      approvalStatus: 'approved',
      lastMessageDate: '2024-01-20T11:30:00',
      unreadCount: 0,
      messages: [
        {
          id: 4,
          userId: 3021,
          userName: 'Tech Corp Investments',
          userType: 'Investor',
          anonymousId: 'Investor #198',
          message: 'Looking for existing boutique hotel or suitable building for conversion in Cape Town. Preferably Atlantic Seaboard or Waterfront. 20-50 rooms capacity. Budget R80M - R150M.',
          timestamp: '2024-01-19T08:00:00'
        },
        {
          id: 5,
          userId: 4012,
          userName: 'David Martinez',
          userType: 'Property Owner',
          anonymousId: 'Property Owner #56',
          message: 'I have a property in Sea Point that might interest you. 35-room capacity, requires renovation but excellent location.',
          timestamp: '2024-01-19T16:20:00'
        },
        {
          id: 6,
          userId: 3021,
          userName: 'Tech Corp Investments',
          userType: 'Investor',
          anonymousId: 'Investor #198',
          message: 'Sea Point could work. What is the current condition and approximate renovation budget needed?',
          timestamp: '2024-01-20T09:00:00'
        },
        {
          id: 7,
          userId: 4012,
          userName: 'David Martinez',
          userType: 'Property Owner',
          anonymousId: 'Property Owner #56',
          message: 'Structurally sound, needs interior updates. I estimate R15-20M for full renovation to boutique standard. Admin, can you facilitate a formal discussion?',
          timestamp: '2024-01-20T11:30:00'
        }
      ],
      investorId: 3021,
      investor: 'Tech Corp Investments',
      investorEmail: 'tech.corp@example.com',
      investorPhone: '+1 (555) 987-6543',
      ownerId: 4012,
      owner: 'David Martinez',
      ownerEmail: 'david.martinez@example.com',
      ownerPhone: '+1 (555) 321-6549'
    },
    {
      id: 243,
      userId: 5033,
      userName: 'Agricultural Growth Fund',
      userType: 'Investor',
      anonymousId: 'Investor #312',
      category: 'Farms',
      title: 'Wine farm acquisition in Western Cape',
      description: 'Seeking established wine farm with existing production. Looking for properties with 50+ hectares, good terroir.',
      budget: 'R60M - R100M',
      preferredLocation: 'Stellenbosch or Franschhoek',
      postedDate: '2024-01-18',
      status: 'Open',
      approvalStatus: 'pending',
      lastMessageDate: '2024-01-18T10:00:00',
      unreadCount: 0,
      messages: [
        {
          id: 8,
          userId: 5033,
          userName: 'Agricultural Growth Fund',
          userType: 'Investor',
          anonymousId: 'Investor #312',
          message: 'Seeking established wine farm with existing production in Stellenbosch or Franschhoek area. Looking for properties with 50+ hectares, good terroir, and existing infrastructure. Budget R60M - R100M.',
          timestamp: '2024-01-18T10:00:00'
        }
      ],
      investorId: 5033,
      investor: 'Agricultural Growth Fund',
      investorEmail: 'agricultural.growth@example.com',
      investorPhone: '+1 (555) 555-5555',
      ownerId: 0,
      owner: '',
      ownerEmail: '',
      ownerPhone: ''
    },
    {
      id: 242,
      userId: 6021,
      userName: 'Urban Developers Ltd',
      userType: 'Developer',
      anonymousId: 'Developer #89',
      category: 'Investment Portfolios',
      title: 'Mixed-use development portfolio',
      description: 'Looking for portfolio of mixed-use properties. Multiple locations acceptable.',
      budget: 'R150M - R250M',
      preferredLocation: 'Major metros (JHB, CPT, DBN)',
      postedDate: '2024-01-17',
      status: 'Active',
      approvalStatus: 'approved',
      lastMessageDate: '2024-01-18T08:45:00',
      unreadCount: 0,
      messages: [
        {
          id: 9,
          userId: 6021,
          userName: 'Urban Developers Ltd',
          userType: 'Developer',
          anonymousId: 'Developer #89',
          message: 'Looking for portfolio of mixed-use properties or development sites across major metros. Open to residential, commercial, or combined. Budget R150M - R250M.',
          timestamp: '2024-01-17T14:00:00'
        },
        {
          id: 10,
          userId: 7012,
          userName: 'Property Solutions Group',
          userType: 'Agent',
          anonymousId: 'Agent #145',
          message: 'We have a client with a portfolio of 5 properties across Gauteng. Mix of retail and office space. Total value approximately R180M. Interested?',
          timestamp: '2024-01-18T08:45:00'
        }
      ],
      investorId: 6021,
      investor: 'Urban Developers Ltd',
      investorEmail: 'urban.developers@example.com',
      investorPhone: '+1 (555) 111-2222',
      ownerId: 7012,
      owner: 'Property Solutions Group',
      ownerEmail: 'property.solutions@example.com',
      ownerPhone: '+1 (555) 333-4444'
    },
    {
      id: 241,
      userId: 8045,
      userName: 'Green Energy Investments',
      userType: 'Investor',
      anonymousId: 'Investor #401',
      category: 'Vacant Land',
      title: 'Large land parcel for solar farm development',
      description: 'Need 100+ hectares of flat land suitable for solar farm.',
      budget: 'R40M - R70M',
      preferredLocation: 'Northern Cape or Free State',
      postedDate: '2024-01-15',
      status: 'Closed',
      approvalStatus: 'approved',
      lastMessageDate: '2024-01-16T14:20:00',
      unreadCount: 0,
      messages: [
        {
          id: 11,
          userId: 8045,
          userName: 'Green Energy Investments',
          userType: 'Investor',
          anonymousId: 'Investor #401',
          message: 'Need 100+ hectares of flat land suitable for solar farm. Must have good sun exposure and proximity to grid connection points. Northern Cape or Free State. Budget R40M - R70M.',
          timestamp: '2024-01-15T11:00:00'
        },
        {
          id: 12,
          userId: 9012,
          userName: 'Land Holdings SA',
          userType: 'Property Owner',
          anonymousId: 'Property Owner #78',
          message: 'We have 150 hectares in Northern Cape. Flat terrain, grid access within 5km. Are you still looking?',
          timestamp: '2024-01-16T10:00:00'
        },
        {
          id: 13,
          userId: 8045,
          userName: 'Green Energy Investments',
          userType: 'Investor',
          anonymousId: 'Investor #401',
          message: 'Yes, very interested. Admin, please connect us for formal discussion.',
          timestamp: '2024-01-16T14:20:00'
        }
      ],
      investorId: 8045,
      investor: 'Green Energy Investments',
      investorEmail: 'green.energy@example.com',
      investorPhone: '+1 (555) 666-7777',
      ownerId: 9012,
      owner: 'Land Holdings SA',
      ownerEmail: 'land.holdings@example.com',
      ownerPhone: '+1 (555) 888-9999'
    },
    {
      id: 246,
      userId: 10023,
      userName: 'Retail Investment Group',
      userType: 'Investor',
      anonymousId: 'Investor #523',
      category: 'Investment Portfolios',
      title: 'Seeking retail space portfolio in Durban',
      description: 'Looking for shopping centers or retail properties. Interested in portfolio opportunities.',
      budget: 'R70M - R120M',
      preferredLocation: 'Durban Metro',
      postedDate: '2024-02-25',
      status: 'Open',
      approvalStatus: 'pending',
      lastMessageDate: '2024-02-25T15:30:00',
      unreadCount: 0,
      messages: [
        {
          id: 14,
          userId: 10023,
          userName: 'Retail Investment Group',
          userType: 'Investor',
          anonymousId: 'Investor #523',
          message: 'Seeking retail space portfolio in Durban. Shopping centers or standalone retail properties. Looking for strong tenant mix and good foot traffic. Budget R70M - R120M.',
          timestamp: '2024-02-25T15:30:00'
        }
      ],
      investorId: 10023,
      investor: 'Retail Investment Group',
      investorEmail: 'retail.investment@example.com',
      investorPhone: '+1 (555) 234-5678',
      ownerId: 0,
      owner: '',
      ownerEmail: '',
      ownerPhone: ''
    },
    {
      id: 247,
      userId: 11045,
      userName: 'Industrial Holdings Co',
      userType: 'Developer',
      anonymousId: 'Developer #312',
      category: 'Vacant Land',
      title: 'Industrial warehouse land needed in Gauteng',
      description: 'Need large land parcel for warehouse development. Must have logistics access.',
      budget: 'R50M - R80M',
      preferredLocation: 'Gauteng Industrial Hubs',
      postedDate: '2024-02-26',
      status: 'Open',
      approvalStatus: 'pending',
      lastMessageDate: '2024-02-26T09:00:00',
      unreadCount: 0,
      messages: [
        {
          id: 15,
          userId: 11045,
          userName: 'Industrial Holdings Co',
          userType: 'Developer',
          anonymousId: 'Developer #312',
          message: 'Need large land parcel (20-30 hectares) for warehouse development in Gauteng. Must have good logistics access to highways and proximity to OR Tambo airport. Budget R50M - R80M.',
          timestamp: '2024-02-26T09:00:00'
        }
      ],
      investorId: 11045,
      investor: 'Industrial Holdings Co',
      investorEmail: 'industrial.holdings@example.com',
      investorPhone: '+1 (555) 876-5432',
      ownerId: 0,
      owner: '',
      ownerEmail: '',
      ownerPhone: ''
    }
  ];

  // Show only approved conversations (pending ones go through Approval page)
  const approvedConversations = conversations.filter(conv => conv.approvalStatus === 'approved');

  // Then apply other filters
  const filteredConversations = approvedConversations.filter(conv => {
    const matchesCategory = selectedCategory === 'all' || conv.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || conv.status === selectedStatus;
    const matchesSearch = 
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preferredLocation.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const stats = {
    total: conversations.length,
    pending: conversations.filter(c => c.approvalStatus === 'pending').length,
    approved: conversations.filter(c => c.approvalStatus === 'approved').length,
    open: conversations.filter(c => c.status === 'Open').length,
    active: conversations.filter(c => c.status === 'Active').length,
    closed: conversations.filter(c => c.status === 'Closed').length,
    unread: conversations.reduce((sum, c) => sum + c.unreadCount, 0)
  };

  const categoryCounts = {
    'Vacant Land': conversations.filter(c => c.category === 'Vacant Land').length,
    'Farms': conversations.filter(c => c.category === 'Farms').length,
    'Hotels': conversations.filter(c => c.category === 'Hotels').length,
    'Investment Portfolios': conversations.filter(c => c.category === 'Investment Portfolios').length
  };

  // If viewing a conversation, show the detail component
  // if (selectedConversation) {
  //   return (
  //     <AdminConversationDetail 
  //       conversation={selectedConversation} 
  //       onBack={() => setSelectedConversation(null)} 
  //     />
  //   );
  // }

  // Main inbox view
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif text-white mb-1">Requests Board</h1>
            <p className="text-sm text-gray-400">Approved chat-style investment requests - view conversations</p>
          </div>
          <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg px-4 py-2">
            <p className="text-blue-400 text-xs font-medium">Anonymous Chat Mode</p>
            <p className="text-gray-400 text-xs">Users chat anonymously · Admin sees identities</p>
          </div>
        </div>
      </div>

      {/* Filter Bar - Conversation Status Only */}
      <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-6 flex-wrap">
          {/* Conversation Status Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm font-medium">Status:</span>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as RequestStatus)}
                className="appearance-none bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-2 pr-10 text-white text-sm font-medium focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer hover:border-[#D4AF37]/40"
              >
                <option value="all">All Conversations ({approvedConversations.length})</option>
                <option value="Open">🔵 Open ({approvedConversations.filter(c => c.status === 'Open').length})</option>
                <option value="Active">✅ Active ({approvedConversations.filter(c => c.status === 'Active').length})</option>
                <option value="Closed">⚫ Closed ({approvedConversations.filter(c => c.status === 'Closed').length})</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Unread Badge */}
          {stats.unread > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
              <MessageSquare className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">{stats.unread} Unread</span>
            </div>
          )}

          {/* Result Counter */}
          <div className="ml-auto text-xs text-gray-500">
            Showing {filteredConversations.length} of {approvedConversations.length} approved requests
          </div>
        </div>
      </div>

      {/* Category Filter - Tab Style Design */}
      <div className="mb-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#D4AF37]/10 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2.5 rounded-t-lg text-sm font-medium transition-all relative whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#D4AF37] text-black'
                : 'bg-transparent text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            All Categories
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              selectedCategory === 'all' 
                ? 'bg-black/20 text-black font-bold' 
                : 'bg-[#D4AF37]/10 text-[#D4AF37]'
            }`}>
              {conversations.length}
            </span>
          </button>
          {(['Vacant Land', 'Farms', 'Hotels', 'Investment Portfolios'] as Category[]).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-t-lg text-sm font-medium transition-all relative whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#D4AF37] text-black'
                  : 'bg-transparent text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              {category}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                selectedCategory === category 
                  ? 'bg-black/20 text-black font-bold' 
                  : 'bg-[#D4AF37]/10 text-[#D4AF37]'
              }`}>
                {categoryCounts[category as keyof typeof categoryCounts]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>
      </div>

      {/* Conversations Inbox (Chat List Style) */}
      <div className="space-y-3">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => navigate(`/requests/${conv.id}`)}
            className={`bg-[#111111] border rounded-lg p-4 hover:border-[#D4AF37] transition-all cursor-pointer ${
              conv.unreadCount > 0 ? 'border-[#D4AF37]/40' : 'border-[#D4AF37]/20'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium text-sm truncate">{conv.title}</h3>
                    <span className="px-2 py-1 bg-purple-400/10 text-purple-400 rounded text-xs flex-shrink-0">
                      {conv.category}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs flex-shrink-0 ml-2">
                    {formatTimestamp(conv.lastMessageDate)}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500">Posted by:</span>
                  <span className="text-xs text-white font-medium">{conv.userName}</span>
                  <span className={`text-xs ${getUserTypeColor(conv.userType)}`}>
                    ({conv.userType})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <DollarSign className="w-3 h-3" />
                      {conv.budget}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      {conv.preferredLocation}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(conv.status)}`}>
                      {conv.status}
                    </span>
                    {conv.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                        {conv.unreadCount}
                      </span>
                    )}
                    <Button 
                      size="sm" 
                      className="text-xs"
                      onClick={(e) => {
                        e?.stopPropagation();
                        navigate(`/requests/${conv.id}`);
                      }}
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs text-red-500"
                      onClick={(e) => {
                        e?.stopPropagation();
                        setRequestToDelete(conv);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredConversations.length === 0 && (
        <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-12 text-center">
          <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No conversations found</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && requestToDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-red-500/30 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-2xl font-serif text-white">Delete Request</h2>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-2">
                Are you sure you want to permanently delete this request and all associated conversations?
              </p>
              <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#D4AF37]/20">
                <p className="text-white font-medium">{requestToDelete.title}</p>
                <p className="text-gray-400 text-sm">Posted by: {requestToDelete.userName}</p>
              </div>
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">
                  ⚠️ This action cannot be undone. All conversation history will be permanently lost.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => {
                    setShowDeleteModal(false);
                    setRequestToDelete(null);
                  }} 
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <button
                onClick={() => {
                  console.log('Deleting request:', requestToDelete.id);
                  alert('Request deleted successfully');
                  setShowDeleteModal(false);
                  setRequestToDelete(null);
                }}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}