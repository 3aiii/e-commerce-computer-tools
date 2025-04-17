import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { formatPrice } from "../../../utils/formatPrice";
import { create, image } from "../../../composables/user/OrderService";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../components/ToastNotification";
import { verify } from "../../../composables/authentication/Authentication";
import { remove } from "../../../composables/user/CartService";

const UploadSlip = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { total, orderData, user } = location.state || {};
  const [slip, setSlip] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSlip(file);
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (slip && slip.size > 1048576) {
      showErrorToast("กรุณาอัปโหลดไฟล์ขนาดไม่เกิน 1MB");
      return;
    }

    const response = await create(orderData);
    if (response.status === 201) {
      await remove(user?.id, "delMany");

      const { data } = await image(slip, response?.data?.id);
      if (data) {
        toast.success("ส่ง slip เรียบร้อย!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            navigate("/order-history");
          },
        });
      }
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await verify();
      } catch (error) {
        if (error.response?.data?.statusCode === 404) {
          navigate("/sign-in");
        }
      }
    };

    verifyUser();
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-fit text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ยืนยันการชำระเงิน
        </h2>
        <div className="flex gap-4">
          <div>
            <img
              src="/qr-code.jpg"
              className="w-[300px] h-auto mx-auto shadow-md rounded-lg"
              alt="QR Code"
            />
          </div>

          <div>
            {preview ? (
              <div>
                <img
                  src={preview}
                  alt="Slip Preview"
                  className="w-[300px] h-[406px] object-contain rounded-lg shadow-md"
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-[300px] h-[406px] border-dashed border-2
                  px-6 py-2 rounded-lg  text-blue-500 hover:text-white hover:bg-blue-500 cursor-pointer transition-all"
                >
                  <FaCloudUploadAlt className="mr-2 text-xl" /> เลือกไฟล์สลิป
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-600 mt-2">{fileName}</p>
              </div>
            )}
          </div>
        </div>
        {slip ? (
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setPreview(null);
                setFileName("");
                setSlip(null);
              }}
              className="mt-4 w-fit bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleUpload}
              className="mt-4 w-fit bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              อัปโหลดสลิป
            </button>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">
            กรุณาโอนเงินจำนวน{" "}
            <span className="text-xl font-bold text-red-500">
              {total ? `${formatPrice(total)} บาท` : "กำลังโหลด..."}
            </span>
            <br />
            และอัปโหลดสลิปเพื่อยืนยันการชำระเงิน
          </p>
        )}
      </div>
      <Link
        to={"/"}
        className="mt-4 inline-block bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
      >
        กลับสู่หน้าแรก
      </Link>
    </div>
  );
};

export default UploadSlip;
