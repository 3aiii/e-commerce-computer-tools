import React from "react";

const CardDashboard = ({
  title,
  value,
  description,
  icon,
  color = "bg-blue-500",
}) => {
  return (
    <div className="card-dashboard">
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center justify-center ${color} rounded-md p-3 text-white text-xl`}
        >
          {icon}
        </div>
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <span className="text-base font-light text-gray-500">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDashboard;
