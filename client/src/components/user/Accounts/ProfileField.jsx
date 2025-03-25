import React from "react";

const ProfileField = ({ label, value, isEditing, onSave }) => {
  return (
    <div className="flex items-center py-4 pl-[13px] pr-[48px] border-b-[1px]">
      <label className="w-[218px] text-lg text-[#757575]">{label}</label>
      {isEditing ? (
        label === "Address" ? (
          <textarea
            className="w-[619px] h-[150px] focus:ring-2 focus:ring-red-500 
              input-field resize-none text-sm border-[1px] border-gray-300 p-2 rounded-md"
            value={value}
            onChange={(e) => onSave(e.target.value)}
          />
        ) : (
          <input
            type={`${label === "Password" ? `password` : `text`}`}
            className="w-[619px] text-sm input-field border-[1px] focus:ring-2 
              focus:ring-red-500 border-gray-300 p-2 rounded-md"
            value={value}
            onChange={(e) => onSave(e.target.value)}
          />
        )
      ) : (
        <span className="w-[619px] text-sm break-words">{value}</span>
      )}
    </div>
  );
};

export default ProfileField;
