import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { colors, getGridColor } from "../../../lib/chart-config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
// import { colors, getGridColor } from "../chart-config";

interface SalesChartProps {
    dataType?: "data1" | "data2";
    mode?: "light" | "dark";
}

const chartData1 = [
    { month: "May", value: 0 },
    { month: "Jun", value: 20 },
    { month: "Jul", value: 10 },
    { month: "Aug", value: 30 },
    { month: "Sep", value: 15 },
    { month: "Oct", value: 40 },
    { month: "Nov", value: 20 },
    { month: "Dec", value: 60 },
];

const chartData2 = [
    { month: "May", value: 0 },
    { month: "Jun", value: 20 },
    { month: "Jul", value: 5 },
    { month: "Aug", value: 25 },
    { month: "Sep", value: 10 },
    { month: "Oct", value: 30 },
    { month: "Nov", value: 15 },
    { month: "Dec", value: 40 },
];

const currentYear = new Date().getFullYear();

export function SalesChart({ dataType = "data1", mode = "light" }: SalesChartProps) {
    const data = dataType === "data1" ? chartData1 : chartData2;
    const gridColor = getGridColor(mode);

    return (
        <div className="bg-white  pb-5 rounded-lg w-full shadow-xl" data-aos="fade-up-right" data-aos-delay={500}>
            <div className="flex items-center justify-between border-b border-slate-500 mb-5 py-3">
                <div className="pl-4">
                    <span className="text-sm uppercase text-slate-400 font-semibold">Overview</span>
                    <p className="text-xl font-semibold text-slate-800">Sales Value</p>
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
            <ResponsiveContainer width="100%" height={350} style={{ paddingInline: "20px", }}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
                        tickFormatter={(value: any) => (value % 10 === 0 ? `$${value}k` : "")}
                        dx={-10}
                    />
                    <Tooltip
                        content={({ active, payload }: any) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                    Performance
                                                </span>
                                                <span className="font-bold text-muted-foreground">
                                                    ${payload[0].value}k
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#fb2c36"                        
                        strokeWidth={4}
                        dot={false}
                        activeDot={{ r: 6, fill: colors.theme.primary }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}