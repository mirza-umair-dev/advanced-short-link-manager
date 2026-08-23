import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VisitorsChart = ({ totalClicks, uniqueVisitors }) => {
  const data = [
    {
      name: "Total Clicks",
      value: totalClicks,
    },
    {
      name: "Unique Visitors",
      value: uniqueVisitors,
    },
  ];

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="value"
            fill="#8884d8"
            stroke="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;