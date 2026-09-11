import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const VisitorsChart = ({ trafficData = [] }) => {
  const data = trafficData.map((item) => ({
    label: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    clicks: item.clicks,
    visitors: item.visitors,
  }));

  return (
    <div className="w-full h-88">
      <h1 className="text-xl font-bold mb-3">Clicks Over Time</h1>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id="colorClicks"
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

            <linearGradient
              id="colorVisitors"
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

          <XAxis dataKey="label" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="clicks"
            stroke="#8884d8"
            fill="url(#colorClicks)"
            fillOpacity={1}
          />

          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#82ca9d"
            fill="url(#colorVisitors)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;