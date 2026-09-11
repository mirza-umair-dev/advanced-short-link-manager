import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = [
  "#82ca9d",
  "#8884d8",
  "#ffc658",
  "#ff8042",
  "#00c49f",
  "#0088fe",
];

const OperatingSystemChart = ({ data = [] }) => {
  return (
    <div className="w-full h-88">
<h1 className="text-xl font-bold mb-3">Operating Systems</h1>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="_id"
            width={80}
          />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="total"
            name="Visitors"
            radius={[0, 6, 6, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OperatingSystemChart;