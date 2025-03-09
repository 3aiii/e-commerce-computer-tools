import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  findOne,
  image,
  update,
} from "../../../composables/administrator/ProductService";
import { findAll } from "../../../composables/administrator/CategoryService";
import { IMAGE_URL } from "../../../secret";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../components/ToastNotification";

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location?.state?.product;

  const [imageArray, setImagaeArray] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [imageData, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    categoryId: 0,
    price: "",
    tax: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = Array.from(e.target.files);
    const newImagePreview = file.map((file) => URL.createObjectURL(file));

    if (file.length > 0) {
      setImagePreview(newImagePreview);
      setImage(file?.[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { categoryId, price, tax } = product;
    const updateProduct = {
      ...product,
      price: Number(price),
      tax: Number(tax),
      categoryId: Number(categoryId),
    };

    const response = await update(id, updateProduct);
    if (response.status === 200) {
      if (imageData) {
        await image(imageData, response?.data?.id);
      }

      toast.success("ปรับแก้สินค้าสำเร็จ!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          navigate("/administrator/products");
        },
      });
    } else {
      showErrorToast("เกิดข้อผิดพลาด โปรดลองดูอีกครั้ง");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await findOne(id);
      setImagaeArray(data?.ProductImage);
      setProduct({
        name: data?.name,
        categoryId: data?.categoryId,
        price: data?.price,
        tax: data?.tax,
        description: data?.description,
      });
    };

    const fetchCategories = async () => {
      const { data } = await findAll(1, 50, "", "active");
      setCategories(data);
    };

    fetchCategories();
    fetchProduct();
  }, []);

  return (
    <div className="flex gap-4 mt-6">
      <div className="input-layout-left h-fit">
        <h1 className="text-xl">Product Image</h1>
        <div className="my-4 mb-1">
          {product?.ProductImage?.length === 0 ? (
            <img
              src={`https://placehold.co/350x200`}
              alt="Product"
              className="w-full h-56 object-contain border-gray-300"
            />
          ) : (
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {imageArray?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${IMAGE_URL}/${img?.url}`}
                    alt="Product"
                    className="w-full mb-8 h-56 object-contain border-gray-300"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="w-full mt-4">
          {imagePreview?.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-xl">Selected Images</h3>
              <div className="flex gap-2 mt-2">
                {imagePreview.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-56 object-contain rounded-md border border-gray-300"
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <label className="flex flex-col items-center justify-center w-full px-4 py-8 mb-2 bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition">
                <svg
                  className="w-10 h-10 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V12M7 12V8M7 12h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="text-gray-600">Click to upload a file</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  multiple
                />
              </label>
              <div className="text-[#868686] font-light text-sm text-center mt-2">
                PNG or JPG no larger than 1 MB
              </div>
            </>
          )}
        </div>
      </div>
      <div className="input-layout-right">
        <h1 className="text-xl">Product Details</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mt-4">
            <label className="text-md">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Name"
              className="input-field"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md">
              Category<span className="text-red-500">*</span>
            </label>
            <select
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              className="input-field"
              required
            >
              {categories?.data?.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-full gap-1">
              <label className="text-md">
                Price<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
                className="input-field"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-md">Tax</label>
              <input
                type="number"
                name="tax"
                value={product.tax}
                onChange={handleChange}
                placeholder="Tax"
                className="input-field"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              className="input-field h-24 resize-none"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 border-t-[1px] border-gray-300 p-2 pt-4">
            <Link
              to="/administrator/products"
              className="cancel-button flex items-center gap-2"
            >
              <FaArrowLeftLong /> Cancel
            </Link>
            <button
              type="submit"
              className="update-button flex items-center gap-2"
            >
              <FaSave /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
