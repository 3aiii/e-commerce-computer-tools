import React from "react";
import {
  TbTruckDelivery,
  TbHeadset,
  TbShieldCheck,
  TbRefresh,
} from "react-icons/tb";
import Service from "./Hero/Service";
import Marquee from "react-fast-marquee";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 pt-8">
      {/* Service Icons */}
      <div className="flex items-center justify-center w-full py-6 bg-[#f5f5f5ff] mb-8">
        <div className="w-[1280px]">
          <div className="grid grid-cols-4 items-center">
            <Service
              icon={TbTruckDelivery}
              Topic="FREE & FAST DELIVERY"
              Desc="Free delivery for all orders"
            />
            <Service
              icon={TbHeadset}
              Topic="24/7 CUSTOMER SERVICE"
              Desc="Friendly 24/7 customer support"
            />
            <Service
              icon={TbShieldCheck}
              Topic="SECURE PAYMENTS"
              Desc="We ensure secure payment methods"
            />
            <Service
              icon={TbRefresh}
              Topic="EASY RETURNS"
              Desc="Hassle-free returns within 30 days"
            />
          </div>
        </div>
      </div>

      <Marquee
        speed={45}
        gradient={false}
        className="text-[105px] font-bold text-red-500"
      >
        DRACULA TECH – POWER, STYLE, INNOVATION! • DRACULA TECH – POWER, STYLE,
        INNOVATION! •
      </Marquee>

      <div className="w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 mt-12 gap-8">
        <div>
          <h2 className="text-xl font-semibold">Dracula</h2>
          <ul className="mt-4 space-y-2">
            <li>About Us</li>
            <li>Our Dealers</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Customer Service</h2>
          <ul className="mt-4 space-y-2">
            <li>Contact Us</li>
            <li>Subscription</li>
            <li>Payment & Services</li>
            <li>Tax Invoice Guide</li>
            <li>Warranty & Claims</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Reviews & Articles</h2>
          <ul className="mt-4 space-y-2">
            <li>All Articles</li>
            <li>Buying Guide</li>
            <li>Tips & Tricks</li>
            <li>Editor's Picks</li>
            <li>Best of Dracula</li>
            <li>Compare Products</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="mt-4">Chat with us via social media</p>
          <div className="flex gap-4 mt-4">
            <span className="text-2xl">📘</span> {/* Facebook */}
            <span className="text-2xl">🐦</span> {/* Twitter/X */}
            <span className="text-2xl">🎵</span> {/* TikTok */}
            <span className="text-2xl">▶️</span> {/* YouTube */}
            <span className="text-2xl">📸</span> {/* Instagram */}
            <span className="text-2xl">💬</span> {/* Line */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
