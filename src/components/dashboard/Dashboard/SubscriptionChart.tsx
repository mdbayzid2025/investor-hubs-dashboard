import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { monthlyData } from '../../../assets/data';

const SubscriptionChart = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const currentYearData = monthlyData[selectedYear as keyof typeof monthlyData];
  return (
    <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6 px-6">
        <div className="">
          <h2 className="text-xl font-serif text-white mb-1">Subscription Breakdown</h2>
          <p className="text-gray-400 text-sm mb-6">Monthly comparison of paid vs free users</p>
        </div>
        <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5">
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-transparent text-white text-sm focus:outline-none cursor-pointer font-medium"
          >
            <option value="2025" className="bg-[#1A1A1A]">2025</option>
            <option value="2024" className="bg-[#1A1A1A]">2024</option>
            <option value="2023" className="bg-[#1A1A1A]">2023</option>
            <option value="2022" className="bg-[#1A1A1A]">2022</option>
          </select>
        </div>
      </div>



      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={currentYearData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="month"
            stroke="#888"
            tick={{ fill: '#888', fontSize: 12 }}
          />
          <YAxis
            stroke="#888"
            tick={{ fill: '#888', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1A1A',
              border: '1px solid #D4AF37',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend
            wrapperStyle={{ color: '#888' }}
            iconType="circle"
          />
          <Bar dataKey="paid" name="Paid Subscribers" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="free" name="Free Users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SubscriptionChart