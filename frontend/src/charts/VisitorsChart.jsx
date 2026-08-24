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
      name: "Visitors",
      clicks: totalClicks,
      visitors: uniqueVisitors,
    },
  ];

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Clicks Gradient */}
            <linearGradient
              id="clicksGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#8884d8"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#8884d8"
                stopOpacity={0}
              />
            </linearGradient>

            {/* Visitors Gradient */}
            <linearGradient
              id="visitorsGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#82ca9d"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#82ca9d"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="clicks"
            stroke="#8884d8"
            activeDot={{ stroke: "#8884d8" }}
            fillOpacity={1}
            fill="url(#clicksGradient)"
          />

          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#82ca9d"
            activeDot={{ stroke: "#82ca9d" }}
            fillOpacity={1}
            fill="url(#visitorsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;