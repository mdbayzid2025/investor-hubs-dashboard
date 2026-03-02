import { Check, Crown, Eye, EyeOff, Lock, Search, Shield, Trash2, UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';

type AdminRole = 'Super Admin' | 'Admin';
type AdminStatus = 'Active' | 'Inactive';

interface Admin {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}



export default function AdminManage() {
    const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@investorshub.com',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2 hours ago',
      createdAt: '2023-01-15',
      permissions: ['all']
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@investorshub.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '1 day ago',
      createdAt: '2023-06-20',
      permissions: ['users', 'stock', 'requests', 'notifications']
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<AdminRole | 'All'>('All');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'Admin' as AdminRole,
    password: '',
    confirmPassword: ''
  });

  // Filter admins
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = 
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || admin.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      alert('Please fill all required fields');
      return;
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const admin: Admin = {
      id: admins.length + 1,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      status: 'Active',
      lastLogin: 'Never',
      createdAt: new Date().toISOString().split('T')[0],
      permissions: newAdmin.role === 'Super Admin' ? ['all'] : 
                   newAdmin.role === 'Admin' ? ['users', 'stock', 'requests', 'notifications'] :
                   ['requests', 'notifications']
    };

    setAdmins([...admins, admin]);
    setShowAddModal(false);
    setNewAdmin({ name: '', email: '', role: 'Admin', password: '', confirmPassword: '' });
  };

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setAdmins(admins.map(admin => 
      admin.id === id 
        ? { ...admin, status: admin.status === 'Active' ? 'Inactive' : 'Active' as AdminStatus }
        : admin
    ));
  };

  const getRoleColor = (role: AdminRole) => {
    switch (role) {
      case 'Super Admin': return 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30';
      case 'Admin': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    }
  };

  const getStatusColor = (status: AdminStatus) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/10';
      case 'Inactive': return 'text-gray-400 bg-gray-400/10';
    }
  };
    return (
          <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-serif text-white mb-1">Admin Management</h1>
            <p className="text-sm text-gray-400">Manage administrator accounts (Super Admin can add new admins)</p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add New Admin
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{admins.length}</p>
                <p className="text-xs text-gray-400">Total Admins</p>
              </div>
            </div>
          </div>
          <div className="bg-[#111111] border border-green-400/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {admins.filter(a => a.status === 'Active').length}
                </p>
                <p className="text-xs text-gray-400">Active</p>
              </div>
            </div>
          </div>
          <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {admins.filter(a => a.role === 'Super Admin').length}
                </p>
                <p className="text-xs text-gray-400">Super Admins</p>
              </div>
            </div>
          </div>
          <div className="bg-[#111111] border border-blue-400/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {admins.filter(a => a.role === 'Admin').length}
                </p>
                <p className="text-xs text-gray-400">Admins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] border border-[#D4AF37]/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as AdminRole | 'All')}
            className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
          >
            <option value="All">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4AF37]/20">
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Admin</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Role</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Last Login</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Permissions</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr
                  key={admin.id}                 
                  className="border-b border-[#D4AF37]/10 hover:bg-[#1A1A1A] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <span className="text-[#D4AF37] font-medium text-sm">
                          {admin.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{admin.name}</p>
                        <p className="text-gray-400 text-sm">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(admin.role)}`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(admin.status)}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-300 text-sm">{admin.lastLogin}</p>
                    <p className="text-gray-500 text-xs">Joined {admin.createdAt}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions.includes('all') ? (
                        <span className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded text-xs">
                          All Access
                        </span>
                      ) : (
                        admin.permissions.slice(0, 2).map((perm, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-400/10 text-gray-400 rounded text-xs">
                            {perm}
                          </span>
                        ))
                      )}
                      {admin.permissions.length > 2 && !admin.permissions.includes('all') && (
                        <span className="px-2 py-1 bg-gray-400/10 text-gray-400 rounded text-xs">
                          +{admin.permissions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(admin.id)}
                        className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors text-gray-400 hover:text-[#D4AF37]"
                        title={admin.status === 'Active' ? 'Deactivate' : 'Activate'}
                      >
                        {admin.status === 'Active' ? <Lock className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                      {admin.role !== 'Super Admin' && (
                        <button
                          onClick={() => {
                            setAdminToDelete(admin);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 hover:bg-red-400/10 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                          title="Delete Admin"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAdmins.length === 0 && (
          <div className="p-12 text-center">
            <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No Admins Found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add Admin Modal */}
      <div>
        {showAddModal && (
          <>
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddModal(false)}
            >
              <div                
                className="bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-white">Add New Admin</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                      placeholder="Enter full name"
                      className="w-full bg-[#111111] border border-[#D4AF37]/40 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                      placeholder="admin@investorshub.com"
                      className="w-full bg-[#111111] border border-[#D4AF37]/40 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={newAdmin.password}
                        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                        placeholder="Enter password"
                        className="w-full bg-[#111111] border border-[#D4AF37]/40 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] outline-none pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Confirm Password *</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={newAdmin.confirmPassword}
                        onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })}
                        placeholder="Confirm password"
                        className="w-full bg-[#111111] border border-[#D4AF37]/40 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] outline-none pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Permission Preview */}
                  <div className="p-4 bg-[#111111] border border-[#D4AF37]/20 rounded-lg">
                    <p className="text-xs text-gray-400 mb-2">Admin Permissions:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-400/10 text-blue-400 rounded text-xs">Users</span>
                      <span className="px-2 py-1 bg-blue-400/10 text-blue-400 rounded text-xs">Stock</span>
                      <span className="px-2 py-1 bg-blue-400/10 text-blue-400 rounded text-xs">Requests</span>
                      <span className="px-2 py-1 bg-blue-400/10 text-blue-400 rounded text-xs">Notifications</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Note: Only Super Admin can add new admins</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleAddAdmin}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Admin
                  </Button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-3 bg-[#1A1A1A] text-white border border-[#D4AF37]/20 rounded-lg hover:bg-[#2A2A2A] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Admin Modal */}
      <div>
        {showDeleteModal && adminToDelete && (
          <>
            <div
              
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setShowDeleteModal(false)}
            >
              <div
               
                className="bg-[#0A0A0A] border border-red-500/30 rounded-xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <Trash2 className="w-6 h-6 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-serif text-white">Delete Admin</h2>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Admin Info */}
                  <div className="bg-[#111111] border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <span className="text-[#D4AF37] font-medium text-sm">
                          {adminToDelete.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{adminToDelete.name}</p>
                        <p className="text-gray-400 text-sm">{adminToDelete.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(adminToDelete.role)}`}>
                        {adminToDelete.role}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(adminToDelete.status)}`}>
                        {adminToDelete.status}
                      </span>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-400 text-sm font-medium mb-2">⚠️ Warning: This action cannot be undone!</p>
                    <p className="text-gray-400 text-sm">
                      Deleting this admin will permanently remove their access to the platform and all associated data.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleDeleteAdmin(adminToDelete.id);
                      setShowDeleteModal(false);
                      setAdminToDelete(null);
                    }}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Admin
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setAdminToDelete(null);
                    }}
                    className="flex-1 px-4 py-3 bg-[#1A1A1A] text-white border border-[#D4AF37]/20 rounded-lg hover:bg-[#2A2A2A] transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>

    );
}