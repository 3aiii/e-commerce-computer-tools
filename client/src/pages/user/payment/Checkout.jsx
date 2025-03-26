import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { FaBox } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { LuScanQrCode } from "react-icons/lu";
import { BsUpcScan } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { findOne } from "../../../composables/administrator/UserService";
import { formatPrice } from "../../../utils/formatPrice";
import { verify } from "../../../composables/authentication/Authentication";
import { create } from "../../../composables/user/OrderService";
import { remove } from "../../../composables/user/CartService";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, totalPrice, discountPrice, discountObject, cartItems } =
    location.state || {};

  const [users, setUsers] = useState([]);

  const CheckOutOrder = async () => {
    const orderData = {
      userId: user?.id,
      discountId: discountObject?.length !== 0 ? discountObject?.id : null,
      total:
        discountObject?.length !== 0 ? totalPrice - discountPrice : totalPrice,
      cartItems: cartItems.map((item) => ({
        productId: item?.product?.id,
        quantity: item?.quantity,
        price: item?.product?.price,
      })),
    };

    try {
      const response = await create(orderData);

      if (response.status === 201) {
        await remove(user?.id, "delMany");

        navigate("/upload-slip", {
          state: {
            total: discountPrice ? totalPrice - discountPrice : totalPrice,
            orderId: response?.data?.id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await findOne(user?.id);

      setUsers(data);
    };

    fetchUser();
  }, [user]);

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
    <div className="flex gap-6 mt-6">
      <div className="flex flex-col w-3/4 mx-auto">
        <div>
          <h1 className="flex gap-2 font-medium text-xl">
            <IoLocationOutline size={25} className="text-gray-500 opacity-80" />
            Address
          </h1>
          <div className="border-[1px] p-6 rounded-md mt-4">
            <h3>Shipping address</h3>
            <div className="flex items-center gap-8 px-6 mt-2">
              <div className="font-medium text-md">
                <h4>
                  {users?.profile?.[0]?.firstname}{" "}
                  {users?.profile?.[0]?.lastname}
                </h4>
                <h5>{users?.profile?.[0]?.phone}</h5>
              </div>
              <p className="text-sm font-light break-words break-all">
                {users?.profile?.[0]?.address}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 w-1/3">
          <h1 className="flex items-center gap-2 font-medium text-xl">
            <TbTruckDelivery size={25} className="text-gray-500 opacity-80" />
            Delivery type
          </h1>
          <div className="border-[1px] border-red-500 bg-[#fdefef] w-fit h-[150px] p-4 cursor-pointer rounded-md mt-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-4 font-medium text-lg">
                <FaBox size={30} className="text-red-400" />
                Normal Delivery
              </h3>
              <span className="font-medium text-red-700">FREE</span>
            </div>
            <div className="flex items-center gap-8 mt-2 text-sm font-light">
              Your order will be delivered within 3-5 business days, with
              tracking available and a 7-day return policy!
            </div>
          </div>
        </div>
        <div className="mt-4 ">
          <h1 className="flex items-center gap-2 font-medium text-xl">
            <MdOutlinePayments size={25} className="text-gray-500 opacity-80" />
            Payment Selection
          </h1>
          <div className="flex border-[1px] rounded-md mt-4">
            <div className="bg-[#fafafa]">
              <div
                className="flex w-[250px] h-[60px] items-center pr-4 
                  rounded-tl-md rounded-bl-md justify-between bg-white cursor-pointer"
              >
                <div className="w-2 h-full rounded-tl-md -md bg-red-500"></div>
                <div className="flex items-center text-red-500 font-medium gap-2">
                  <LuScanQrCode size={30} className="ml-2" />
                  <h1 className="flex justify-between text-md w-fit">
                    QR Code
                  </h1>
                </div>
                <span className="px-2 py-1 bg-green-200 rounded-md text-green-600 text-xs">
                  Suggest
                </span>
              </div>
            </div>
            <div className="flex flex-col w-full items-center justify-center gap-4 text-sm font-light mb-8">
              <BsUpcScan size={100} className="text-gray-500 opacity-80 my-6" />
              {/* Right Section */}
              <div className="flex flex-col w-full items-start justify-center gap-3 text-sm font-light px-8">
                <h2 className="text-lg font-semibold">
                  Payment process via QR Code
                </h2>
                <ul className="mt-2 text-gray-700 relative">
                  {[
                    'After clicking "Checkout", you will receive a QR Code to pay.',
                    "Open bank app.",
                    'Go to "Scan" or "Scan Pay".',
                    "Make sure your payment information is correct before proceeding.",
                    "After you have paid in the bank app, payment information will be saved to MERCULAR.",
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-2 relative">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-6 h-6 flex items-center justify-center bg-red-600 
                          text-white rounded-full font-medium"
                        >
                          {index + 1}
                        </div>
                        {index < 4 && (
                          <div className="w-[2px] h-8 bg-gray-300"></div>
                        )}
                      </div>
                      <p>{step}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 mx-auto">
        <div className="border-[1px] rounded-lg">
          <div className="px-5 py-4">
            <h1 className="flex gap-4 items-center font-medium">
              <RiBillLine size={23} className="text-gray-500 opacity-80" />{" "}
              Balance
            </h1>
            <ul className="flex flex-col gap-1 mt-4 font-light">
              <li className="flex justify-between">
                <div>
                  Items{" "}
                  <span className="text-[#757575] text-xs font-light">(2)</span>
                </div>
                <span>฿{formatPrice(totalPrice)}</span>
              </li>
              <li className="flex justify-between">
                Discount{" "}
                <span>
                  ฿{" "}
                  {discountObject?.length !== 0 ? formatPrice(discountPrice) : 0}
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
              ฿{" "}
              {formatPrice(
                discountPrice ? totalPrice - discountPrice : totalPrice
              )}
            </span>
          </div>
          <div className="w-full px-5 py-4">
            <button
              onClick={CheckOutOrder}
              className="w-full block text-center py-2 bg-red-500 
                hover:bg-red-600 text-white rounded-md transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
