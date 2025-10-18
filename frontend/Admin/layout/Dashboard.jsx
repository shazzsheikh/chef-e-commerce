import DashboardChart from "../component/dashboard";

const UserDashboard = () => {
  // Dummy chart data
  const chartData = [
    { name: "Mon", sales: 1000, users: 200 },
    { name: "Tue", sales: 1200, users: 250 },
    { name: "Wed", sales: 900, users: 180 },
    { name: "Thu", sales: 1600, users: 300 },
    { name: "Fri", sales: 1400, users: 260 },
    { name: "Sat", sales: 1700, users: 320 },
    { name: "Sun", sales: 1900, users: 350 },
  ];

  // Dummy summary data
  const summaryData = [
    {
      label: "Pending",
      value: 12,
      color: "bg-yellow-100",
      text: "text-yellow-600",
    },
    { label: "Shipped", value: 8, color: "bg-blue-100", text: "text-blue-600" },
    { label: "Cancelled", value: 3, color: "bg-red-100", text: "text-red-600" },
    {
      label: "Delivered",
      value: 25,
      color: "bg-green-100",
      text: "text-green-600",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {summaryData.map((item) => (
          <div
            key={item.label}
            className={`rounded-lg shadow-sm p-4 ${item.color} border`}
          >
            <h3 className={`text-md font-semibold ${item.text}`}>
              {item.label}
            </h3>
            <p className="text-2xl font-bold text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Weekly Stats Chart */}
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Weekly Stats</h2>
        <DashboardChart data={chartData} />
      </div>
    </div>
  );
};

export default UserDashboard;
