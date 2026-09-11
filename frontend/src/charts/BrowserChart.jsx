import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [ "#82ca9d",
  "#8884d8",
  "#ffc658",
  "#ff8042",
  "#00c49f",
  "#0088fe"];

const BrowserChart = ({ data }) => {
  return (
    <div className="w-full h-88">
      <h1 className="text-xl font-bold">Browsers Distribution</h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrowserChart;