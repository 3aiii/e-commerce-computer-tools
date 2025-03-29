import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { formatPrice } from "../../../utils/formatPrice";
import { image } from "../../../composables/user/OrderService";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../components/ToastNotification";
import { verify } from "../../../composables/authentication/Authentication";

const UploadSlip = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { total, orderId } = location.state || {};
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

    const { data } = await image(slip, orderId);
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
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[420px] text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ยืนยันการชำระเงิน
        </h2>
        <img
          src="/qr-code.jpg"
          className="w-[300px] h-auto mx-auto rounded-lg shadow-md"
          alt="QR Code"
        />
        <p className="text-gray-600 mt-4">
          กรุณาโอนเงินจำนวน{" "}
          <span className="text-xl font-bold text-red-500">
            {formatPrice(total ? `${total} บาท` : "กำลังโหลด...")}
          </span>
          <br />
          และอัปโหลดสลิปเพื่อยืนยันการชำระเงิน
        </p>

        {/* Input อัปโหลดไฟล์แบบปุ่ม */}
        <div className="mt-4">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-full bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 cursor-pointer transition-all"
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

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Slip Preview"
              className="w-full h-auto rounded-lg shadow-md mt-2"
            />
          </div>
        )}

        {slip ? (
          <button
            onClick={handleUpload}
            className="mt-4 w-full bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
          >
            อัปโหลดสลิป
          </button>
        ) : (
          <></>
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
