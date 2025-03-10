import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { showErrorToast } from "./../../../components/ToastNotification";
import {
  findOne,
  update,
} from "../../../composables/administrator/DiscountService";

const Edit = () => {
  const location = useLocation();
  const { id } = location?.state?.discount;
  const navigate = useNavigate();

  const [discount, setDiscount] = useState({
    code: "",
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await update(id, discount);

    if (response.status === 200) {
      toast.success("ปรับแก้ส่วนลดสำเร็จ!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          navigate("/administrator/discount");
        },
      });
    } else {
      showErrorToast("เกิดข้อผิดพลาด โปรดลองดูอีกครั้ง");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await findOne(id);
      setDiscount({
        code: data?.code,
        discount: data?.discount,
      });
    };

    fetchProduct();
  }, []);

  return (
    <div className="flex gap-4 mt-6">
      <div className="input-layout-left h-fit">
        <div className="my-4 mb-1 ">
          <img
            src="/discount-tag-3d-object-free-png.webp"
            className="w-full h-56 object-contain rounded-md "
          />
        </div>
      </div>
      <div className="input-layout-right">
        <h1 className="text-xl">Discount Details</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mt-4">
            <label className="text-md">
              Code<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={discount.code}
              onChange={handleChange}
              placeholder="Code"
              className="input-field"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md">
              Discount (%) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discount"
              value={discount.discount}
              onChange={handleChange}
              placeholder="Discount"
              className="input-field"
              required
            />
          </div>

          <div className="flex justify-end gap-2 border-t-[1px] border-gray-300 p-2 pt-4 ">
            <Link
              to={"/administrator/discount"}
              className="cancel-button flex items-center gap-2"
            >
              <FaArrowLeftLong /> Cancel
            </Link>
            <button
              type="submit"
              className="update-button flex items-center gap-2"
            >
              <FaSave /> Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
