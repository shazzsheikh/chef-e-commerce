import { useAdmin } from "../admincontextapi/productfetch";
import DashboardChart from "../component/dashboard";
const UserDashboard = () => {
  const { products = [], totalProducts, orders, totalOrders } = useAdmin();
  let pendingOrders = 0;
  let shippedOrders = 0;
  let deliveredOrders = 0;
  let cancelledOrders = 0;
  orders.forEach((order) => {
    if (order.status === "pending") pendingOrders++;
    if (order.status === "shipped") shippedOrders++;
    if (order.status === "delivered") deliveredOrders++;
    if (order.status === "cancelled") cancelledOrders++;
  });

  let activeProducts = 0;
  let inactiveProducts = 0;
  products.forEach((p) => {
    if (p.status === "active") activeProducts++;
    else if (p.status === "stop") inactiveProducts++;
  });

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

  const summaryData = [
    {
      label: "Total Products",
      value: totalProducts || 0,
      color: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      label: "Active Products",
      value: activeProducts || 0,
      color: "bg-green-50",
      text: "text-green-700",
    },
    {
      label: "Inactive Products",
      value: inactiveProducts || 0,
      color: "bg-gray-100",
      text: "text-gray-700",
    },
    {
      label: "Pending Orders",
      value: pendingOrders || 0,
      color: "bg-yellow-50",
      text: "text-yellow-700",
    },
    {
      label: "Shipped Orders",
      value: shippedOrders || 0,
      color: "bg-indigo-50",
      text: "text-indigo-700",
    },
    {
      label: "Delivered Orders",
      value: deliveredOrders || 0,
      color: "bg-emerald-50",
      text: "text-emerald-700",
    },
    {
      label: "Cancelled Orders",
      value: cancelledOrders || 0,
      color: "bg-red-50",
      text: "text-red-700",
    },
    {
      label: "Total Orders",
      value: totalOrders || 0,
      color: "bg-slate-100",
      text: "text-slate-800",
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
