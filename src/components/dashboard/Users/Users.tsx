import { Edit, Mail, Trash2, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MoreVertical,
  UserCheck,
  UserX,
  Shield,
  X,
  Ban,
  Download,
  MessageSquare,
  FileText,
  AlertCircle,
  Building2,
  Briefcase,
  TrendingUp,
  Users as UsersIcon  // ✅ Fix #1: Rename to avoid conflict with component name
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { users } from '../../../assets/data';

// ✅ Fix #4: Remove unused `totalPages` prop
export default function Users() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [kycFilter, setKycFilter] = useState<string>('all');

  useEffect(() => {
    if (location.state?.selectedUserId) {
      const user = users.find(u => u.id === location.state.selectedUserId);
      if (user) {
        setSelectedUser(user);
      }
    }
  }, [location.state]);

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesKYC = kycFilter === 'all' || user.kycStatus === kycFilter;
    return matchesSearch && matchesStatus && matchesRole && matchesKYC;
  });

  const statusCounts = {
    all: users.length,
    pending: users.filter(u => u.status === 'pending').length,
    approved: users.filter(u => u.status === 'approved').length,
    rejected: users.filter(u => u.status === 'rejected').length,
  };

  const roleCounts: Record<string, number> = {
    all: users.length,
    Investor: users.filter(u => u.role === 'Investor').length,
    'Property Owner': users.filter(u => u.role === 'Property Owner').length,
    Agent: users.filter(u => u.role === 'Agent').length,
    Admin: users.filter(u => u.role === 'Admin').length,
  };

  const handleApprove = () => {
    setOpenDropdown(null);
    alert('User approved successfully! Email notification sent.');
  };

  const handleReject = () => {
    setOpenDropdown(null);
    if (confirm('Are you sure you want to reject this user? They will be notified via email.')) {
      alert('User rejected. Notification sent.');
    }
  };

  const handleEdit = () => {
    setOpenDropdown(null);
    alert('Edit user modal would open here');
  };

  const handleDelete = () => {
    setOpenDropdown(null);
    if (confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
      alert('User deleted successfully');
    }
  };

  const handleSuspend = () => {
    setOpenDropdown(null);
    alert('User account suspended');
  };

  const handleExport = () => {
    setOpenDropdown(null);
    alert('User data exported to CSV');
  };

  const handleSendMessage = () => {
    setOpenDropdown(null);
    alert('Message composer would open here');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Investor':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-400/10 text-green-400 rounded text-xs font-medium">
            <TrendingUp className="w-3 h-3" /> Investor
          </span>
        );
      case 'Property Owner':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-400/10 text-blue-400 rounded text-xs font-medium">
            <Building2 className="w-3 h-3" /> Property Owner
          </span>
        );
      case 'Agent':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded text-xs font-medium">
            <Briefcase className="w-3 h-3" /> Agent
          </span>
        );
      case 'Admin':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-400/10 text-red-400 rounded text-xs font-medium">
            <Shield className="w-3 h-3" /> Admin
          </span>
        );
      default:
        return null;
    }
  };

  const getKYCStatusDisplay = (kycStatus: string) => {
    switch (kycStatus) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-400/10 text-blue-400 rounded text-xs">
            <FileText className="w-3 h-3" /> Docs Submitted
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-400/10 text-orange-400 rounded text-xs">
            <Clock className="w-3 h-3" /> Docs Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-400/10 text-red-400 rounded text-xs">
            <AlertCircle className="w-3 h-3" /> Docs Rejected
          </span>
        );
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-400/10 text-green-400 rounded text-xs">
            <Shield className="w-3 h-3" /> Verified
          </span>
        );
      default:
        return null;
    }
  };

  const clearFilters = () => {
    setRoleFilter('all');
    setKycFilter('all');
  };

  const activeFiltersCount =
    (roleFilter !== 'all' ? 1 : 0) +
    (kycFilter !== 'all' ? 1 : 0);

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-white mb-1">User Management</h1>
        <p className="text-sm text-gray-400">
          Manage all platform users by role - Investors, Property Owners, and Agents
        </p>
      </div>

      {/* Role Filter Tabs */}
      <div className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {(['all', 'Investor', 'Property Owner', 'Agent', 'Admin'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
                roleFilter === role
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-medium'
                  : 'bg-[#111111] text-gray-400 border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
              }`}
            >
              {role === 'all' ? `All Users (${roleCounts.all})` : `${role} (${roleCounts[role]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-lg border transition-all ${
            statusFilter === 'all'
              ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
              : 'bg-[#111111] border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* ✅ Fix #1: Use renamed UsersIcon */}
            <UsersIcon className="w-5 h-5 text-[#D4AF37]" />
            <div className="text-left">
              <p className="text-2xl font-bold text-white">{statusCounts.all}</p>
              <p className="text-xs text-gray-400">Total Users</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('pending')}
          className={`p-4 rounded-lg border transition-all ${
            statusFilter === 'pending'
              ? 'bg-orange-400/10 border-orange-400'
              : 'bg-[#111111] border-[#D4AF37]/20 hover:border-orange-400/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <div className="text-left">
              <p className="text-2xl font-bold text-white">{statusCounts.pending}</p>
              <p className="text-xs text-gray-400">Pending Review</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('approved')}
          className={`p-4 rounded-lg border transition-all ${
            statusFilter === 'approved'
              ? 'bg-green-400/10 border-green-400'
              : 'bg-[#111111] border-[#D4AF37]/20 hover:border-green-400/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div className="text-left">
              <p className="text-2xl font-bold text-white">{statusCounts.approved}</p>
              <p className="text-xs text-gray-400">Approved</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('rejected')}
          className={`p-4 rounded-lg border transition-all ${
            statusFilter === 'rejected'
              ? 'bg-red-400/10 border-red-400'
              : 'bg-[#111111] border-[#D4AF37]/20 hover:border-red-400/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400" />
            <div className="text-left">
              <p className="text-2xl font-bold text-white">{statusCounts.rejected}</p>
              <p className="text-xs text-gray-400">Rejected</p>
            </div>
          </div>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
          <button
            className="flex items-center gap-2 relative px-4 py-2 border border-[#D4AF37]/20 rounded-lg text-gray-300 hover:border-[#D4AF37]/40 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            More Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-[#D4AF37]/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">KYC Status</label>
                <select
                  value={kycFilter}
                  onChange={(e) => setKycFilter(e.target.value)} // ✅ Fix #3: Removed invalid type assertion
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="all">All KYC Status</option>
                  <option value="submitted">Docs Submitted</option>
                  <option value="pending">Docs Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Docs Rejected</option>
                </select>
              </div>
              <div className="flex items-end md:col-span-2">
                <button
                  className="w-full px-4 py-2 border border-[#D4AF37]/20 rounded-lg text-gray-300 hover:border-[#D4AF37]/40 transition-colors"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4AF37]/20 bg-[#1A1A1A]">
                <th className="text-left p-4 text-sm font-medium text-gray-400">User</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Role</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Email</th>
                <th className="text-center p-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user:any, i:number) => (
                <tr
                  key={i}
                  className="border-b border-[#D4AF37]/10 hover:bg-[#1A1A1A] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#D4AF37] font-medium text-sm">
                          {user.name.split(' ').map((n: any) => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{user.name}</p>
                        <p className="text-gray-500 text-xs">ID: #{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{getRoleBadge(user.role)}</td>
                  <td className="p-4">
                    <span className="text-sm text-gray-300">{user.email}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center">
                      {user.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-400/10 text-orange-400 rounded text-xs">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                      {user.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-400/10 text-green-400 rounded text-xs">
                          <CheckCircle className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {user.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-400/10 text-red-400 rounded text-xs">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {user.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove()}
                            className="p-2 bg-green-400/10 text-green-400 rounded hover:bg-green-400/20 transition-colors"
                            title="Approve User"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject()}
                            className="p-2 bg-red-400/10 text-red-400 rounded hover:bg-red-400/20 transition-colors"
                            title="Reject User"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded hover:bg-[#D4AF37]/20 transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                          className="p-2 bg-gray-400/10 text-gray-400 rounded hover:bg-gray-400/20 transition-colors"
                          title="More Options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openDropdown === user.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                            <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg shadow-xl z-20 overflow-hidden">
                              <button
                                onClick={() => handleEdit()}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors"
                              >
                                <Edit className="w-4 h-4" /> Edit Profile
                              </button>
                              <button
                                onClick={() => handleSendMessage()}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors"
                              >
                                <MessageSquare className="w-4 h-4" /> Send Message
                              </button>
                              <button
                                onClick={() => handleExport()}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors"
                              >
                                <Download className="w-4 h-4" /> Export Data
                              </button>
                              <div className="border-t border-[#D4AF37]/10" />
                              <button
                                onClick={() => handleSuspend()}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-orange-400 hover:bg-orange-400/10 transition-colors"
                              >
                                <Ban className="w-4 h-4" /> Suspend Account
                              </button>
                              <button
                                onClick={() => handleDelete()}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" /> Delete User
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <UsersIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" /> {/* ✅ Fix #1 */}
            <p className="text-gray-400">No users found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-[#D4AF37]/20 rounded-lg text-gray-300 hover:border-[#D4AF37]/40 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-[#D4AF37]/20 rounded-lg text-gray-300 hover:border-[#D4AF37]/40 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#D4AF37]/30 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#111111] border-b border-[#D4AF37]/20 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-[#D4AF37] font-bold text-lg">
                    {selectedUser.name.split(' ').map((n: any) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-white">{selectedUser.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-gray-400 text-sm">User ID: #{selectedUser.id}</p>
                    <span className="text-gray-600">•</span>
                    {getRoleBadge(selectedUser.role)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-2">Account Status</p>
                  {selectedUser.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-400/10 text-orange-400 rounded text-sm">
                      <Clock className="w-4 h-4" /> Pending Review
                    </span>
                  )}
                  {selectedUser.status === 'approved' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-400/10 text-green-400 rounded text-sm">
                      <CheckCircle className="w-4 h-4" /> Approved
                    </span>
                  )}
                  {selectedUser.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-400/10 text-red-400 rounded text-sm">
                      <XCircle className="w-4 h-4" /> Rejected
                    </span>
                  )}
                </div>
                <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-2">KYC Documents</p>
                  {getKYCStatusDisplay(selectedUser.kycStatus)}
                </div>
              </div>

              <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D4AF37]" /> Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Email</span>
                    <span className="text-white text-sm">{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Phone</span>
                    <span className="text-white text-sm">{selectedUser.phone}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  {selectedUser.role === 'Investor' && <TrendingUp className="w-4 h-4 text-[#D4AF37]" />}
                  {selectedUser.role === 'Property Owner' && <Building2 className="w-4 h-4 text-[#D4AF37]" />}
                  {selectedUser.role === 'Agent' && <Briefcase className="w-4 h-4 text-[#D4AF37]" />}
                  {selectedUser.role} Details
                </h3>
                <div className="space-y-2">
                  {selectedUser.role === 'Investor' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Investor Type</span>
                        <span className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded text-xs">
                          {selectedUser.investorType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Total Investment Requests</span>
                        <span className="text-white text-sm font-medium">{selectedUser.totalInvestments || 0}</span>
                      </div>
                    </>
                  )}
                  {(selectedUser.role === 'Property Owner' || selectedUser.role === 'Agent') && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Company Name</span>
                        <span className="text-white text-sm">{selectedUser.companyName || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Listed Properties</span>
                        <span className="text-white text-sm font-medium">{selectedUser.listedProperties || 0}</span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Signup Date</span>
                    <span className="text-white text-sm">
                      {new Date(selectedUser.signupDate).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Last Active</span>
                    <span className="text-white text-sm">
                      {selectedUser.lastActive
                        ? new Date(selectedUser.lastActive).toLocaleDateString('en-US', {
                            month: 'long', day: 'numeric', year: 'numeric',
                          })
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4AF37]" /> KYC Documents Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">ID Proof (Passport/License)</span>
                    {selectedUser.kycDocuments?.idProof ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <button className="text-[#D4AF37] text-xs hover:underline">View Document</button>
                      </div>
                    ) : (
                      <span className="text-red-400 text-xs">Not Submitted</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Address Proof</span>
                    {selectedUser.kycDocuments?.addressProof ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <button className="text-[#D4AF37] text-xs hover:underline">View Document</button>
                      </div>
                    ) : (
                      <span className="text-red-400 text-xs">Not Submitted</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Financial Documents</span>
                    {selectedUser.kycDocuments?.financialDocs ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <button className="text-[#D4AF37] text-xs hover:underline">View Document</button>
                      </div>
                    ) : (
                      <span className="text-red-400 text-xs">Not Submitted</span>
                    )}
                  </div>
                </div>
              </div>

              {selectedUser.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { handleApprove(); setSelectedUser(null); }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  >
                    <UserCheck className="w-4 h-4" /> Approve User
                  </button>
                  <button
                    onClick={() => { handleReject(); setSelectedUser(null); }}
                    className="flex-1 border border-red-400 text-red-400 hover:bg-red-400/10 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  >
                    <UserX className="w-4 h-4" /> Reject User
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}