import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileField from "../../../components/user/Accounts/ProfileField";
import { IMAGE_URL } from "../../../secret";

const Index = () => {
  const location = useLocation();
  const fileInputRef = useRef(null);

  const initialUserState = location?.state?.user || {};
  const [user, setUser] = useState({
    email: initialUserState?.email || "",
    password: "",
    firstname: initialUserState?.profile?.[0]?.firstname || "",
    lastname: initialUserState?.profile?.[0]?.lastname || "",
    phone: initialUserState?.profile?.[0]?.phone || "",
    address: initialUserState?.profile?.[0]?.address || "",
  });

  const [isEditingAll, setIsEditingAll] = useState(false);
  const [image, setImage] = useState(
    initialUserState?.profile?.[0]?.image || ""
  );
  const [previewImage, setPreviewImage] = useState(
    image ? `${IMAGE_URL}/${image}` : ""
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    console.log("Saving all fields:", user);
    setIsEditingAll(false);
  };

  const handleEditAll = () => {
    setIsEditingAll(true);
  };

  const handleChangeUserField = (field, newValue) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: newValue,
    }));
  };

  return (
    <div>
      <div className="my-6">
        <h1 className="text-xl font-semibold">Personal information</h1>
        <p className="text-sm font-base text-[#757575]">
          Personal information management
        </p>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center my-2 p-8 border-[1px] rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2">
              <img
                src={previewImage || "/profile image"}
                className="w-[150px] h-[150px] object-cover rounded-full"
                alt="Profile Preview"
              />
              <div className="text-xs text-[#868686]">
                PNG or JPG no larger than 1 MB
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef?.current?.click()}
              className="bg-red-500 text-white hover:bg-red-400 
              rounded-lg px-4 py-2 transition w-fit h-fit focus:outline-none"
            >
              UPLOAD PROFILE
            </button>
          </div>
          <img
            src="/33756669_8106268.jpg"
            className="w-[500px] h-[240px] object-contain"
          />
        </div>

        {["email", "password", "name", "phone", "address"].map(
          (field, index) => {
            let value = user[field];
            if (field === "name") {
              value = `${user.firstname} ${user.lastname}`;
            }
            return (
              <ProfileField
                key={index}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={value}
                buttonText="Edit"
                isEditing={isEditingAll}
                onSave={(newValue) => {
                  if (field === "name") {
                    const [firstname, lastname] = newValue.split(" ");
                    handleChangeUserField("firstname", firstname);
                    handleChangeUserField("lastname", lastname);
                  } else {
                    handleChangeUserField(field, newValue);
                  }
                }}
              />
            );
          }
        )}

        {isEditingAll ? (
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsEditingAll(false)}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="bg-green-500 text-white px-4 py-2 rounded-lg transition hover:bg-green-400"
            >
              Save All Changes
            </button>
          </div>
        ) : (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleEditAll}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition hover:bg-blue-400"
            >
              Edit All Fields
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
