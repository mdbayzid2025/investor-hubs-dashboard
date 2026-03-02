import {
    AlertTriangle,
    Building2,
    Eye,
    Heart,
    MapPin,
    Plus,
    Search,
    Trash2
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../ui/button';

type StockCategory = 'Vacant Land' | 'Farms' | 'Hotels' | 'Investment Portfolios';

interface StockItem {
    id: number;
    title: string;
    location: string;
    category: StockCategory;
    description: string;
    approximatePrice: string;
    status: 'Active' | 'Paused';
    imageUrl: string;
    dateAdded: string;
    interestCount: number;
    interestStatus: 'none' | 'low' | 'high';
    postedBy: string;
}

export default function Stocks() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<StockCategory | 'all'>('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<StockItem | null>(null);

    // Only showing approved stock listings (pending items go through Approval page)
    const stockItems: StockItem[] = [
        {
            id: 101,
            title: 'Prime Farmland',
            location: 'Stellenbosch Area, Western Cape',
            category: 'Farms',
            description: 'Premium agricultural land suitable for wine production. Excellent soil quality and established infrastructure.',
            approximatePrice: 'R50M - R80M',
            status: 'Active',
            imageUrl: '/blurred-farm.jpg',
            dateAdded: '2024-01-15',
            interestCount: 8,
            interestStatus: 'high',
            postedBy: 'John Doe'
        },
        {
            id: 102,
            title: 'Boutique Hotel',
            location: 'Cape Town Waterfront',
            category: 'Hotels',
            description: 'Established hotel property with strong occupancy rates. Prime tourist location with sea views.',
            approximatePrice: 'R120M - R150M',
            status: 'Active',
            imageUrl: '/blurred-hotel.jpg',
            dateAdded: '2024-01-12',
            interestCount: 12,
            interestStatus: 'high',
            postedBy: 'Jane Smith'
        },
        {
            id: 103,
            title: 'Mixed Use Portfolio',
            location: 'Johannesburg CBD',
            category: 'Investment Portfolios',
            description: 'Diversified portfolio including commercial and industrial properties. Strong rental yield.',
            approximatePrice: 'R200M - R250M',
            status: 'Active',
            imageUrl: '/blurred-portfolio.jpg',
            dateAdded: '2024-01-10',
            interestCount: 15,
            interestStatus: 'high',
            postedBy: 'Alice Johnson'
        },
        {
            id: 104,
            title: 'Commercial Land Parcel',
            location: 'Johannesburg North',
            category: 'Vacant Land',
            description: 'Undeveloped land parcel with commercial zoning. High growth area with excellent access.',
            approximatePrice: 'R30M - R45M',
            status: 'Active',
            imageUrl: '/blurred-land.jpg',
            dateAdded: '2024-01-08',
            interestCount: 2,
            interestStatus: 'low',
            postedBy: 'Bob Brown'
        },
        {
            id: 105,
            title: 'Luxury Game Lodge',
            location: 'Limpopo Province',
            category: 'Hotels',
            description: 'Exclusive safari lodge with premium accommodation facilities. Pristine wilderness location.',
            approximatePrice: 'R180M - R220M',
            status: 'Active',
            imageUrl: '/blurred-lodge.jpg',
            dateAdded: '2024-01-05',
            interestCount: 20,
            interestStatus: 'high',
            postedBy: 'Charlie Davis'
        }
    ];

    const filteredStock = stockItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-serif text-white mb-1">Stock Management</h1>
                        <p className="text-sm text-gray-400">Approved property listings with embedded interest tracking</p>
                    </div>
                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Property
                    </Button>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <button
                        onClick={() => setCategoryFilter('all')}
                        className={`px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${categoryFilter === 'all'
                                ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-medium'
                                : 'bg-[#111111] text-gray-400 border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                            }`}
                    >
                        All Categories
                    </button>
                    {(['Vacant Land', 'Farms', 'Hotels', 'Investment Portfolios'] as StockCategory[]).map((category) => (
                        <button
                            key={category}
                            onClick={() => setCategoryFilter(category)}
                            className={`px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${categoryFilter === category
                                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-medium'
                                    : 'bg-[#111111] text-gray-400 border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search properties by name, location, or description..."
                        className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                </div>
            </div>

            <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#D4AF37]/20 bg-[#1A1A1A]">
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Property</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Location</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Category</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Price Range</th>
                                <th className="text-center p-4 text-sm font-medium text-gray-400">Interest</th>
                                <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStock.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-[#D4AF37]/10 hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                                    onClick={() => navigate(`/stocks/${item.id}`)}
                                >
                                    <td className="p-4">
                                        <p className="text-white font-medium text-sm">{item.title}</p>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-400 text-sm">{item.location}</span>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-blue-400/10 text-blue-400 rounded text-xs">
                                            {item.category}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <span className="text-[#D4AF37] font-medium text-sm">{item.approximatePrice}</span>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-1.5">
                                            {item.interestCount > 0 ? (
                                                <>
                                                    <Heart className={`w-4 h-4 ${item.interestStatus === 'high' ? 'text-[#D4AF37]' : 'text-blue-400'}`} />
                                                    <span className={`text-sm font-medium ${item.interestStatus === 'high' ? 'text-[#D4AF37]' : 'text-blue-400'}`}>
                                                        {item.interestCount}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-gray-500 text-sm">—</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-3">
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/stocks/${item.id}`);
                                                }}
                                                variant="outline"
                                                size="sm"
                                                className="h-9 gap-2 rounded-xl border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span className="whitespace-nowrap">View</span>
                                            </Button>

                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setItemToDelete(item);
                                                    setShowDeleteModal(true);
                                                }}
                                                variant="outline"
                                                size="sm"
                                                className="h-9 gap-2 rounded-xl border-red-500 text-red-500 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span className="whitespace-nowrap">Delete</span>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredStock.length === 0 && (
                    <div className="p-12 text-center">
                        <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No properties found</p>
                        <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111111] border border-[#D4AF37]/30 rounded-lg max-w-2xl w-full p-6">
                        <h2 className="text-2xl font-serif text-white mb-4">Add New Property</h2>
                        <p className="text-gray-400 mb-4">Property creation form would go here</p>
                        <Button onClick={() => setShowAddModal(false)} variant="outline">
                            Close
                        </Button>
                    </div>
                </div>
            )}

            {showDeleteModal && itemToDelete && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111111] border border-red-500/30 rounded-lg max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-2xl font-serif text-white">Delete Property</h2>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-300 mb-2">
                                Are you sure you want to permanently delete this property listing?
                            </p>
                            <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#D4AF37]/20">
                                <p className="text-white font-medium">{itemToDelete.title}</p>
                                <p className="text-gray-400 text-sm">{itemToDelete.location}</p>
                            </div>
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-red-400 text-sm">
                                    ⚠️ This action cannot be undone. All associated interest data will be lost.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setItemToDelete(null);
                                }}
                                variant="outline"
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <button
                                onClick={() => {
                                    console.log('Deleting property:', itemToDelete.id);
                                    alert('Property deleted successfully');
                                    setShowDeleteModal(false);
                                    setItemToDelete(null);
                                }}
                                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2 font-medium"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete Property
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}