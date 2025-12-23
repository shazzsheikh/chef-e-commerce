import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Example data — tum backend se aayega
// const sampleData = [
//   { name: "Jan", sales: 4000, users: 2400 },
//   { name: "Feb", sales: 3000, users: 1398 },
//   { name: "Mar", sales: 2000, users: 9800 },
//   { name: "Apr", sales: 2780, users: 3908 },
//   { name: "May", sales: 1890, users: 4800 },
//   { name: "Jun", sales: 2390, users: 3800 },
//   { name: "Jul", sales: 3490, users: 4300 },
// ];

const DashboardChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="users" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
