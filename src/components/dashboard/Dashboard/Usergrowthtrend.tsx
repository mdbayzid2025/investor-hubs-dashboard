import { Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { monthlyData } from "../../../assets/data";

// @ts-ignore
const data2024 = [
  { month: "Jan", paid: 95, free: 60 },
  { month: "Feb", paid: 120, free: 70 },
  { month: "Mar", paid: 145, free: 80 },
  { month: "Apr", paid: 160, free: 90 },
  { month: "May", paid: 178, free: 100 },
  { month: "Jun", paid: 192, free: 110 },
  { month: "Jul", paid: 215, free: 125 },
  { month: "Aug", paid: 240, free: 140 },
  { month: "Sep", paid: 258, free: 155 },
  { month: "Oct", paid: 272, free: 162 },
  { month: "Nov", paid: 300, free: 170 },
  { month: "Dec", paid: 385, free: 182 },
];

// @ts-ignore
const data2023 = [
  { month: "Jan", paid: 50, free: 30 },
  { month: "Feb", paid: 62, free: 38 },
  { month: "Mar", paid: 70, free: 45 },
  { month: "Apr", paid: 78, free: 52 },
  { month: "May", paid: 85, free: 58 },
  { month: "Jun", paid: 90, free: 64 },
  { month: "Jul", paid: 97, free: 70 },
  { month: "Aug", paid: 105, free: 76 },
  { month: "Sep", paid: 112, free: 82 },
  { month: "Oct", paid: 120, free: 88 },
  { month: "Nov", paid: 130, free: 94 },
  { month: "Dec", paid: 145, free: 100 },
];


// @ts-ignore
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 shadow-xl">
        <p className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-300">{entry.name}:</span>
            <span className="font-semibold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
// @ts-ignore
const CustomLegend = () => (
  <div className="flex justify-center gap-6 mt-4">
    <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
      <span className="flex items-center gap-1">
        <span className="inline-block w-4 border-t-2 border-emerald-400 border-dashed" />
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
        <span className="inline-block w-4 border-t-2 border-emerald-400 border-dashed" />
      </span>
      Paid Subscribers
    </div>
    <div className="flex items-center gap-2 text-sm text-blue-400 font-medium">
      <span className="flex items-center gap-1">
        <span className="inline-block w-4 border-t-2 border-blue-400 border-dashed" />
        <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
        <span className="inline-block w-4 border-t-2 border-blue-400 border-dashed" />
      </span>
      Free Users
    </div>
  </div>
);




export default function UserGrowthTrend() {
  const [selectedYear, setSelectedYear] = useState("2024");
  
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'paid' | 'free'>('all');

  // Current year data
  const currentYearData = monthlyData[selectedYear as keyof typeof monthlyData];

  // Chart data based on selected metric
  const chartData = useMemo(() => {
    return currentYearData.map(item => ({
      month: item.month,
      paid: item.paid,
      free: item.free,
      total: item.total
    }));
  }, [currentYearData]);
  return (
    <div className="lg:col-span-2 bg-[#111111] border border-[#D4AF37]/20 rounded-lg py-6">
      <div className="flex items-center justify-between mb-6 px-6">
        <div>
          <h2 className="text-xl font-serif text-white mb-1">User Growth Trend</h2>
          <p className="text-gray-400 text-sm">Monthly subscriber growth</p>
        </div>

        {/* Year Filter & Metric Toggle */}
        <div className="flex items-center gap-3">
          {/* Year Dropdown */}
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

          {/* Metric Toggle */}
          <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-lg p-1">
            <button
              onClick={() => setSelectedMetric('all')}
              className={`px-3 py-1 rounded text-xs transition-all ${selectedMetric === 'all'
                ? 'bg-[#D4AF37] text-black font-medium'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedMetric('paid')}
              className={`px-3 py-1 rounded text-xs transition-all ${selectedMetric === 'paid'
                ? 'bg-green-400 text-black font-medium'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Paid
            </button>
            <button
              onClick={() => setSelectedMetric('free')}
              className={`px-3 py-1 rounded text-xs transition-all ${selectedMetric === 'free'
                ? 'bg-blue-400 text-black font-medium'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Free
            </button>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />

          <XAxis
            dataKey="month"
            stroke="#888"
            tick={{ fill: '#888', fontSize: 12 }}
            tickLine={false}
          />

          <YAxis
            stroke="#888"
            tick={{ fill: '#888', fontSize: 12 }}
            tickLine={false}
            width={40}
            allowDataOverflow
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1A1A',
              border: '1px solid #D4AF37',
              borderRadius: '8px',
              color: '#fff',
            }}
            cursor={{ stroke: '#D4AF37', strokeDasharray: '4 4' }}
          />

          {selectedMetric === 'all' ? (
            <>
              <Legend verticalAlign="bottom" height={36} />

              <Line
                type="monotone"
                dataKey="paid"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Paid Subscribers"
              />

              <Line
                type="monotone"
                dataKey="free"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Free Users"
              />
            </>
          ) : (
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={selectedMetric === 'paid' ? '#10B981' : '#3B82F6'}
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name={selectedMetric === 'paid' ? 'Paid Subscribers' : 'Free Users'}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>

  );
}