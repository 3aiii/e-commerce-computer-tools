import React, { useEffect, useState } from "react";
import { FiBox, FiUsers, FiDollarSign } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { CiCoinInsert } from "react-icons/ci";
import CardDashboard from "../../components/administrator/DashboardComponent/CardDashboard";
import SaleChart from "../../components/administrator/DashboardComponent/SaleChart";
import {
  getSalesPerDay,
  getValues,
} from "../../composables/user/DashBoardService";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const dashboardData = [
    {
      title: "Products",
      value: data?.products,
      description: "Total Products",
      icon: <FiBox />,
      color: "bg-blue-500",
    },
    {
      title: "Users",
      value: data?.users,
      description: "Total Users",
      icon: <FiUsers />,
      color: "bg-green-500",
    },
    {
      title: "Orders",
      value: data?.orders?._sum?.total,
      description: "Total Orders",
      icon: <FiDollarSign />,
      color: "bg-yellow-500",
    },
    {
      title: "Category",
      value: data?.categories,
      description: "Total Categories",
      icon: <MdOutlineCategory />,
      color: "bg-red-500",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getValues();
      const fetchSalesPerDay = await getSalesPerDay();
      
      setSalesData(fetchSalesPerDay?.data);
      setData(data);
    };

    fetchData();
  }, []);

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
