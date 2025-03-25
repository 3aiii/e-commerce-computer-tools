import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { IMAGE_URL } from "../../../secret";
import { FaStar } from "react-icons/fa";
import { formatPrice } from "../../../utils/formatPrice";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { RiLoopRightFill } from "react-icons/ri";
import { default as HeroCard } from "../../../components/user/Hero/Card";
import { findProductByCategory } from "../../../composables/user/CategoryService";
import Card from "./Card";
import { findOne } from "../../../composables/administrator/ProductService";
import { showErrorToast } from "../../../components/ToastNotification";
import { verify } from "../../../composables/authentication/Authentication";
import { create } from "../../../composables/user/CartService";
import { toast } from "react-toastify";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();

  const { id } = location?.state?.data;
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = async (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const plusQuantity = () => updateQuantity(1);
  const minusQuantity = () => updateQuantity(-1);

  const handleAddProductIntoCart = async () => {
    try {
      const { data } = await create({
        userId: user?.id,
        productId: id,
        quantity: quantity,
      });

      if (data) {
        toast.success("เพิ่มสินค้าเสร็จสิ้น!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          onClose: () => {
            navigate("/cart");
          },
        });
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Error adding product to cart");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await verify();
        if (data?.user) {
          setUser(data.user);
        } else {
          toast.error("Session expired, please log in again.", {
            position: "bottom-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching user data.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchProductData = async () => {
      try {
        const { data: product } = await findOne(id);
        setData(product);

        if (product?.categoryId) {
          const { data: related } = await findProductByCategory(
            product.categoryId,
            product.id,
            ""
          );
          setRelatedProduct(related?.data || []);
        }
      } catch (error) {
        // showErrorToast("Error fetching product data:");
        console.log(error);
      }
    };
    fetchProductData();
  }, [id]);

  return (
    <div className="flex flex-col mt-4 mb-24">
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="flex items-center gap-3 font-light text-sm cursor-default">
            <span>Home</span>
            <div className="w-1 h-1 rounded-full bg-red-500"></div>
            <span>{data?.category?.name}</span>
            <div className="w-1 h-1 rounded-full bg-red-500"></div>
            <span className="line-clamp-1">{slug}</span>
          </div>
          <p className="text-gray-400 font-base text-sm mt-1">
            {data?.category?.name} | {data?.name}
          </p>

          <div>
            {data?.ProductImage?.length === 0 ? (
              <div className="flex items-center justify-center mt-4">
                <img
                  src="https://placehold.co/500x500"
                  className="w-[500px] h-[500px]"
                />
              </div>
            ) : (
              <>
                <Swiper
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Navigation, Thumbs]}
                  className="w-[500px] h-auto"
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                  {data?.ProductImage?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`${IMAGE_URL}/${img.url}`}
                        alt={`Product ${index}`}
                        className="w-full my-4"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={5}
                  modules={[Thumbs]}
                  className="mt-2 cursor-pointer"
                >
                  {data?.ProductImage?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`${IMAGE_URL}/${img.url}`}
                        alt={`Thumbnail ${index}`}
                        className={`w-full border rounded-xl ${
                          index === activeIndex
                            ? "border-red-500 ring-red-500"
                            : "border-gray-200"
                        } transition`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <span className="text-red-500 text-sm">{data?.category?.name}</span>
          <div>
            <h1 className="text-2xl font-semibold">{data?.name}</h1>
            <div className="flex items-center gap-2 my-3">
              <FaStar size={25} className="text-[#FFAD33]" />
              <FaStar size={25} className="text-black opacity-25" />
              <FaStar size={25} className="text-black opacity-25" />
              <FaStar size={25} className="text-black opacity-25" />
              <FaStar size={25} className="text-black opacity-25" />
              <p className="text-black opacity-50 ml-4">(15 Reviews)</p>
            </div>
            <div className="font-semibold text-red-500 my-3 mb-8 text-2xl">
              ฿ {formatPrice(data?.price)}
            </div>
            <p className="font-light break-words pb-8 border-b-[1px]">
              {data?.description}
            </p>
          </div>
          <div className="flex w-full h-[44px] gap-4 my-6 mb-10">
            <div className="flex items-center">
              <p className="text-lg font-base">Quantity : </p>
            </div>
            <div className="flex items-center justify-between w-1/4 border border-gray-300 rounded-lg">
              <button
                onClick={minusQuantity}
                disabled={quantity <= 1}
                className="flex items-center justify-center w-10 h-full border-r-[1px]"
              >
                <FaMinus className="w-5 h-5 text-gray-600" />
              </button>
              <div className="text-lg font-semibold">{quantity}</div>
              <button
                onClick={plusQuantity}
                className="flex items-center justify-center w-10 h-full bg-red-500 
                rounded-tr-lg rounded-br-lg border-gray-300 hover:bg-red-400 transition"
              >
                <FaPlus className="w-5 h-5 text-white" />
              </button>
            </div>
            <button
              onClick={handleAddProductIntoCart}
              className="bg-red-500 text-white font-semibold flex 
                items-center justify-center text-lg rounded-lg w-1/3 transition 
                hover:bg-red-600 active:scale-95 shadow-md gap-4"
            >
              <IoCartOutline size={22} />
              BUY NOW
            </button>
          </div>
          <div className="flex flex-col w-full p-8 border-[1px] rounded-lg">
            <div className="flex items-center gap-4 border-b-[1px] pb-4">
              <TbTruckDelivery size={50} />
              <div>
                <h2 className="text-lg font-semibold">Free Delivery</h2>
                <p>Enter your postal code for Delivery Availability</p>
                <p className="text-sm text-gray-500">
                  Fast and secure shipping directly to your doorstep. Estimated
                  delivery within 3-5 business days.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <RiLoopRightFill size={50} />
              <div>
                <h2 className="text-lg font-semibold">Return Delivery</h2>
                <p>Free 30 Days Delivery Returns. Details</p>
                <p className="text-sm text-gray-500">
                  If you're not satisfied, return your product within 30 days at
                  no extra cost. Terms & conditions apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <HeroCard
          name={"Related Item"}
          state={data?.category}
          navigateTo={`/categories/${data?.category?.name}`}
        />
        <div className="grid grid-cols-5 gap-4 mt-4">
          {relatedProduct?.map((product, index) => (
            <Card key={index} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
