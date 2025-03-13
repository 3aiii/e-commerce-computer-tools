import React from "react";
import { FiBox, FiUsers, FiDollarSign } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { CiCoinInsert } from "react-icons/ci";
import CardDashboard from "../../components/administrator/DashboardComponent/CardDashboard";
import SaleChart from "../../components/administrator/DashboardComponent/SaleChart";

const salesData = [
  { date: "2025-03-01", sales: 30 },
  { date: "2025-03-02", sales: 45 },
  { date: "2025-03-03", sales: 20 },
  { date: "2025-03-04", sales: 60 },
  { date: "2025-03-05", sales: 40 },
  { date: "2025-03-06", sales: 75 },
  { date: "2025-03-07", sales: 50 },
];

const dashboardData = [
  {
    title: "Products",
    value: "120",
    description: "Total Products",
    icon: <FiBox />,
    color: "bg-blue-500",
  },
  {
    title: "Users",
    value: "12",
    description: "Total Users",
    icon: <FiUsers />,
    color: "bg-green-500",
  },
  {
    title: "Orders",
    value: "2,000 $",
    description: "Total Orders",
    icon: <FiDollarSign />,
    color: "bg-yellow-500",
  },
  {
    title: "Category",
    value: "10",
    description: "Total Categories",
    icon: <MdOutlineCategory />,
    color: "bg-red-500",
  },
];

const Dashboard = () => {
  return (
    <div>
      <div className="mt-6">
        <span className="text-sm text-gray-500 font-medium">OVERVIEW</span>
        <h1 className="text-2xl">Dashboard</h1>
      </div>

      {/* Section: Cards */}
      <div className="grid grid-cols-4 gap-4 mt-4 w-full">
        {dashboardData.map((item, index) => (
          <CardDashboard key={index} {...item} />
        ))}
      </div>

      {/* Section: Sales Chart */}
      <div className="card-dashboard mt-6 p-6 bg-white">
        {/* Title with Icon */}
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 rounded-md p-1">
            <CiCoinInsert size={36} className="text-white" />
          </div>
          <h2 className="text-2xl font-medium text-gray-700">
            Product Sales Per Day
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 mb-6 leading-relaxed">
          แสดงจำนวนสินค้าที่ถูกซื้อในแต่ละวัน
          เพื่อช่วยให้คุณวิเคราะห์แนวโน้มยอดขาย
          และวางแผนกลยุทธ์การตลาดได้ดียิ่งขึ้น
        </p>

        {/* Sales Chart Component */}
        <SaleChart salesData={salesData} />
      </div>
    </div>
  );
};

export default Dashboard;
