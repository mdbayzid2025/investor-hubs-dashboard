import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";



// @ts-ignore
const CustomTooltip = ({ active, payload }:any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 shadow-xl text-sm">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.payload.color }}
          />
          <span className="text-gray-300">{item.name}:</span>
          <span className="font-bold text-white">{item.value}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function RoleDistribution() {
  
  const roleData = [
    { name: 'Investor', value: 312, color: '#10B981', percentage: 57.5 }, // green
    { name: 'Property Owner', value: 124, color: '#3B82F6', percentage: 22.8 }, // blue
    { name: 'Agent', value: 78, color: '#F59E0B', percentage: 14.4 }, // yellow
    { name: 'Developer', value: 29, color: '#8B5CF6', percentage: 5.3 } // purple
  ];
  
  return (
    <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6">
          <h2 className="text-xl font-serif text-white mb-1">User Roles</h2>
          <p className="text-gray-400 text-sm mb-6">Distribution by role type</p>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="space-y-2 mt-4">
            {roleData.map((role, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }}></div>
                  <span className="text-gray-300 text-sm">{role.name}</span>
                </div>
                <span className="text-white font-medium text-sm">{role.value}</span>
              </div>
            ))}
          </div>
        </div>
  );
}