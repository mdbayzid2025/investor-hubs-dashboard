import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { colors, getGridColor } from "../../../lib/chart-config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface OrdersChartProps {
  mode?: "light" | "dark";
}

const chartData = [
  { month: "Jul", sales: 25 },
  { month: "Aug", sales: 20 },
  { month: "Sep", sales: 30 },
  { month: "Oct", sales: 22 },
  { month: "Nov", sales: 17 },
  { month: "Dec", sales: 29 },
];

const currentYear = new Date().getFullYear();

export function OrdersChart({ mode = "light" }: OrdersChartProps) {
  const gridColor = getGridColor(mode);

  return (
    <div className="bg-white rounded-lg w-full pb-5 shadow-xl" data-aos="fade-up-left" data-aos-delay={600}>
        <div className="flex items-center justify-between border-b border-slate-500 mb-5 py-3">
                <div className="pl-4">
                    <span className="text-sm uppercase text-slate-400 font-semibold">Performance</span>
                    <p className="text-xl font-semibold text-salte-700">Order Chart</p>
                </div>
                <div className="pr-5">
                <Select value={currentYear?.toString()}>
                    <SelectTrigger className="w-30 bg-primary! text-white!">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 text-white">                        
                            <SelectItem value={currentYear.toString()}>{currentYear}</SelectItem>
                            <SelectItem value={(currentYear - 1).toString()}>{currentYear - 1}</SelectItem>
                            <SelectItem value={(currentYear - 2).toString()}>{currentYear - 2}</SelectItem>
                            <SelectItem value={(currentYear - 3).toString()}>{currentYear - 3}</SelectItem>
                            <SelectItem value={(currentYear - 4).toString()}>{currentYear - 4}</SelectItem>
                            <SelectItem value={(currentYear - 5).toString()}>{currentYear - 5}</SelectItem>
                            
                    </SelectContent>
                </Select>
                </div>
            </div>

    <ResponsiveContainer width="100%" height={350} style={{paddingInline: "20px"}}>
      <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={gridColor}
          vertical={false}
        />
        <XAxis 
          dataKey="month" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.gray[600], fontSize: 13 }}
          dy={10}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.gray[600], fontSize: 13 }}
          tickFormatter={(value: any) => (value % 10 === 0 ? `$${value}` : "")}
          dx={-10}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Sales
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="sales"
          fill={colors.theme.warning}
          radius={[6, 6, 0, 0]}
          maxBarSize={10}
        />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}