import React from "react";

const Service = ({ icon: Icon, Topic, Desc }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center">
      <div className="bg-red-500 w-fit rounded-full p-2">
        <Icon className="text-white" size={30} />
      </div>
      <h3 className="font-semibold">{Topic}</h3>
      <span className="text-sm font-light">{Desc}</span>
    </div>
  );
};

export default Service;
