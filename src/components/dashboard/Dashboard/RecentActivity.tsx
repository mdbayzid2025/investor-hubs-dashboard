import { Car, CheckCircle, Clock, CreditCard, MapPin, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

const RecentActivity = () => {
    const activities = [
        { 
            id: 1, 
            type: 'New booking', 
            icon: Car, 
            color: 'bg-blue-100 text-blue-800 hover:bg-blue-100', 
            title: 'Tesla Model 3 booked by John Doe',
            time: '5 minutes ago',
            details: 'Tesla Model 3 • John Doe'
        },
        { 
            id: 2, 
            type: 'Vehicle added', 
            icon: Car, 
            color: 'bg-green-100 text-green-800 hover:bg-green-100', 
            title: 'BMW X5 added to fleet',
            time: '1 hour ago',
            details: 'BMW X5 • Fleet updated'
        },
        { 
            id: 3, 
            type: 'Payment received', 
            icon: CreditCard, 
            color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100', 
            title: '$450 from booking #1234',
            time: '2 hours ago',
            details: '$450 • Booking #1234'
        },
        { 
            id: 4, 
            type: 'New host registered', 
            icon: UserPlus, 
            color: 'bg-purple-100 text-purple-800 hover:bg-purple-100', 
            title: 'Sarah Miller joined as host',
            time: '3 hours ago',
            details: 'Sarah Miller • Host registration'
        },
        { 
            id: 5, 
            type: 'Booking completed', 
            icon: CheckCircle, 
            color: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100', 
            title: 'Mercedes E-Class returned',
            time: '5 hours ago',
            details: 'Mercedes E-Class • Vehicle returned'
        }
    ];

    return (
        <div className="p-5">
            <Card className="border-0">
                <CardHeader className="pb-0!">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-semibold mb-1">Recent Activity</h3>
                            <p className="text-sm text-gray-500">What's happening with your fleet</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader >
                            <TableRow className="bg-gray-100 border-b">
                                <TableHead className="text-gray-600 font-semibold uppercase text-xs pl-10 w-[60%]">Activity</TableHead>
                                <TableHead className="text-gray-600 font-semibold uppercase text-xs w-[40%] text-right pr-10">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activities.map((activity) => {
                                const IconComponent = activity.icon;
                                return (
                                    <TableRow key={activity.id} className="hover:bg-gray-50/50 border-b last:border-b-0">
                                        <TableCell className="pl-10 pr-4 py-4">
                                            <div className="flex items-start gap-4">
                                                <div className={`flex-shrink-0 w-11 h-11 rounded-2xl ${activity.color} flex items-center justify-center`}>
                                                    <IconComponent className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-gray-900 text-sm leading-5 mb-1 truncate">{activity.title}</div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <MapPin className="w-3 h-3" />
                                                        <span className="truncate">{activity.details}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10 py-4">
                                            <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                                                <Clock className="w-3 h-3" />
                                                <span>{activity.time}</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    {activities.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No recent activity found.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default RecentActivity;






// data-aos="fade-up" data-aos-delay={800}