import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileField from "../../../components/user/Accounts/ProfileField";
import { IMAGE_URL } from "../../../secret";
import { showErrorToast } from "../../../components/ToastNotification";
import {
  findOne,
  update,
  image as UploadImageUser,
} from "../../../composables/administrator/UserService";
import { toast } from "react-toastify";

const Index = () => {
  const location = useLocation();
  const fileInputRef = useRef(null);

  const initialUserState = location?.state?.user || {};
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  });

  const [isEditingAll, setIsEditingAll] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [image, setImage] = useState([]);

  const uploadImage = async (image) => {
    if (image && image.size > 1048576) {
      showErrorToast("กรุณาอัปโหลดไฟล์ขนาดไม่เกิน 1MB");
      return;
    }

    try {
      const response = await UploadImageUser(
        image,
        initialUserState?.profile?.[0]?.id
      );
      if (response.status === 201) {
        toast.success("ปรับแก้ผู้ใช้งานสำเร็จ!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            window.location.reload();
          },
        });
      }
    } catch (error) {
      if (error.response.data.statusCode === 400) {
        showErrorToast("กรุณาอัปโหลดไฟล์ jpeg | jpg | png ");
      } else if (error.response.data.statusCode === 413) {
        showErrorToast("กรุณาอัปโหลดไฟล์ความจุไม่เกิน 1 MB ");
      }
    }
  };

  const handleFileChange = async (e) => {
    const file = Array.from(e.target.files);
    const newImagePreview = file.map((file) => URL.createObjectURL(file));
    if (file.length > 0) {
      setImagePreview(newImagePreview);
      setImage(file?.[0]);
      uploadImage(file?.[0]);
    }
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();

    try {
      const response = await update(initialUserState?.id, user);
      if (response.status === 200) {
        toast.success("ปรับแก้ผู้ใช้งานสำเร็จ!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            setIsEditingAll(false);
          },
        });
      } else {
        showErrorToast("เกิดข้อผิดพลาด โปรดลองดูอีกครั้ง");
      }
    } catch (error) {
      if (error.response.data.statusCode === 400) {
        showErrorToast("กรุณาอัปโหลดไฟล์ jpeg | jpg | png ");
      } else if (error.response.data.statusCode === 413) {
        showErrorToast("กรุณาอัปโหลดไฟล์ความจุไม่เกิน 1 MB ");
      }
    }
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

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await findOne(initialUserState?.id);
      setImage(data?.profile?.[0]?.image);
      setUser({
        email: data?.email || "",
        password: "",
        firstname: data?.profile?.[0]?.firstname || "",
        lastname: data?.profile?.[0]?.lastname || "",
        phone: data?.profile?.[0]?.phone || "",
        address: data?.profile?.[0]?.address || "",
      });
    };
    fetchUser();
  }, []);

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
              {!image ? (
                <img
                  src={`https://placehold.co/350x200`}
                  alt="User"
                  className="w-[150px] h-[150px] object-cover rounded-full"
                />
              ) : imagePreview?.length > 0 ? (
                imagePreview?.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-[150px] h-[150px] object-cover rounded-full"
                  />
                ))
              ) : (
                <img
                  src={`${IMAGE_URL}/${image}`}
                  alt="User"
                  className="w-[150px] h-[150px] object-cover rounded-full"
                />
              )}

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
              className="bg-red-500 text-white hover:bg-red-600 
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
