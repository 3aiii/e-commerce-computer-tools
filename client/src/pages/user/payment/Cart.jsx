import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verify } from "../../../composables/authentication/Authentication";
import { MdOutlineDiscount } from "react-icons/md";
import { RiBillLine, RiDeleteBin7Line } from "react-icons/ri";
import DiscountCoupon from "../../../components/user/DiscountCoupon";
import { formatPrice } from "./../../../utils/formatPrice";
import { findAll, remove } from "../../../composables/user/CartService";
import { IMAGE_URL } from "../../../secret";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [discountObject, setDiscountObject] = useState([]);
  const [user, setUser] = useState(null);
  
  const totalPrice = cartItems?.reduce(
    (sum, item) => sum + item?.product?.price * item?.quantity,
    0
  );

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const calculationDiscountObject = async () => {
    const sum = (totalPrice * discountObject?.TEST) / 100;
    setDiscountPrice(sum);
  };

  const fetchCarts = async () => {
    const { data } = await findAll(user?.id);
    setCartItems(data);
  };

  const removeItem = async (id) => {
    const response = await remove(id);

    if (response?.status === 200) {
      toast.success(`ลบสินค้าเสร็จสิ้น!`, {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          fetchCarts();
        },
      });
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [user]);

  useEffect(() => {
    calculationDiscountObject();
  }, [discountObject]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await verify();
        setUser(data?.user);
      } catch (error) {
        if (error.response?.data?.statusCode === 404) {
          navigate("/sign-in");
        }
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className="flex gap-6 mt-6">
      <div className="w-3/4 mx-auto">
        <h1 className="font-medium text-xl">
          My cart{" "}
          <span className="text-[#757575] text-sm font-light">
            ({cartItems.length} items)
          </span>
        </h1>
        <div className="mt-4 border-y-[1px] overflow-hidden">
          {/* Header */}
          <div className="flex bg-gray-100 px-4 py-2 font-medium">
            <div className="flex-1">Product</div>
            <div className="w-32 text-center">
              Price
              <span className="text-sm font-light"> (Baht)</span>
            </div>
            <div className="w-40 text-center">Quantity</div>
            <div className="w-12 text-center"></div>
          </div>

          {/* Items */}
          {cartItems.map((item, index) => (
            <div key={index} className="flex border-t items-center p-4">
              {/* Product */}
              <div className="flex flex-1 items-center space-x-4">
                <img
                  src={`${IMAGE_URL}/${item?.product?.ProductImage?.[0]?.url}`}
                  alt={item?.product?.ProductImage?.[0]?.url}
                  className="w-16 h-16 rounded"
                />
                <div className="w-full">
                  <span className="text-sm font-medium">
                    {item?.product?.name}
                  </span>
                  <p className="text-xs line-clamp-1 break-words text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="w-32 text-center font-medium">
                ฿{formatPrice(item?.product?.price)}
              </div>

              {/* Quantity */}
              <div className="w-40 flex justify-center items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{item?.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <div className="w-12 flex justify-center">
                <RiDeleteBin7Line
                  size={20}
                  className="text-gray-500 opacity-80 cursor-pointer"
                  onClick={() => removeItem(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total section */}
      <div className="flex flex-col gap-4 w-1/4">
        <DiscountCoupon
          coupon={coupon}
          setCoupon={(prev) => setCoupon(prev)}
          setDiscountObject={(prev) => setDiscountObject(prev)}
        />
        <div className="border-[1px] rounded-lg">
          <div className="px-5 py-4">
            <h1 className="flex gap-4 items-center font-medium">
              <RiBillLine size={23} className="text-gray-500 opacity-80" />{" "}
              Total
            </h1>
            <ul className="flex flex-col gap-1 mt-4 font-light">
              <li className="flex justify-between">
                <div>
                  Items{" "}
                  <span className="text-[#757575] text-xs font-light">
                    ({cartItems.length})
                  </span>
                </div>
                <span>฿{formatPrice(totalPrice)}</span>
              </li>
              <li className="flex justify-between">
                Discount{" "}
                <span>
                  ฿
                  {discountObject.length !== 0 ? formatPrice(discountPrice) : 0}
                </span>
              </li>
              <li className="flex justify-between">
                Shipping fee <span>฿0</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-between items-center bg-[#F5F5F5] px-5 py-2">
            <h1 className="font-medium">
              Total <br />
              <span className="text-[#757575] text-sm font-light">
                (include Tax)
              </span>
            </h1>
            <span className="text-2xl text-red-500 font-semibold">
              ฿{formatPrice(totalPrice)}
            </span>
          </div>
          <div className="w-full px-5 py-4">
            <Link
              to="/checkout"
              className="w-full block text-center py-2 bg-red-500 
                hover:bg-red-600 text-white rounded-md transition"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
