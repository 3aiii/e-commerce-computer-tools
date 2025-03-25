import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa"; // ไอคอนอัปโหลด

const UploadSlip = () => {
  const location = useLocation();
  const { total } = location.state || {};

  const [slip, setSlip] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  console.log(slip);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSlip(file);
      setPreview(URL.createObjectURL(file));
      setFileName(file.name); // ตั้งค่าชื่อไฟล์ที่เลือก
    }
  };

  const handleUpload = () => {
    if (!slip) {
      alert("กรุณาเลือกรูปภาพสลิปก่อนอัปโหลด");
      return;
    }
    console.log("อัปโหลดไฟล์:", slip);
    // สามารถเพิ่มฟังก์ชันอัปโหลดไปยังเซิร์ฟเวอร์ได้ที่นี่
  };

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
            {total ? `${total} บาท` : "กำลังโหลด..."}
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

        {/* แสดงตัวอย่างภาพ */}
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Slip Preview"
              className="w-full h-auto rounded-lg shadow-md mt-2"
            />
          </div>
        )}

        {/* ปุ่มอัปโหลดสลิป */}
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
