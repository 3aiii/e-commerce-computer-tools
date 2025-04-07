import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AdministratorLayout from "./layouts/administrator/AdministratorLayout";
import IndexProducts from "./pages/administrator/Products/Index";
import IndexUsers from "./pages/administrator/Users/Index";
import Profile from "./pages/administrator/Setting/Profile";
import CreateProducts from "./pages/administrator/Products/Create";
import IndexOrders from "./pages/administrator/Orders/Index";
import IndexCategories from "./pages/administrator/Categories/Index";
import Dashboard from "./pages/administrator/Dashboard";
import Product from "./pages/administrator/Products/Product";
import EditProduct from "./pages/administrator/Products/Edit";
import InputLayout from "./layouts/administrator/InputLayout";
import IndexDiscount from "./pages/administrator/Discounts/Index";
import CreateUser from "./pages/administrator/Users/Create";
import EditUser from "./pages/administrator/Users/Edit";
import Order from "./pages/administrator/Orders/Order";
import { ToastContainer } from "react-toastify";
import User from "./pages/administrator/Users/User";
import CreateDiscount from "./pages/administrator/Discounts/Create";
import EditDiscount from "./pages/administrator/Discounts/Edit";
import SignIn from "./pages/user/Authentication/SignIn";
import SignUp from "./pages/user/Authentication/SignUp";
import AuthLayout from "./layouts/authentication/AuthLayout";
import Index from "./pages/Index";
import IndexLayout from "./layouts/ีuser/IndexLayout";
import Cart from "./pages/user/payment/cart";
import Checkout from "./pages/user/payment/Checkout";
import Categories from "./pages/user/Categories";
import IndexUserProducts from "./pages/user/Products/Index";
import ProductDetail from "./pages/user/Products/Product";
import ScrollToTop from "./utils/scrollToTop";
import IndexAccount from "./pages/user/Account/Index";
import OrderHistory from "./pages/user/Account/OrderHistory";
import MyReview from "./pages/user/Account/MyReview";
import AccountLayout from "./layouts/ีuser/AccountLayout";
import UploadSlip from "./pages/user/Payment/UploadSlip";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate page loading effect
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" theme="colored" />
      <ScrollToTop />
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <Routes>
          {/* Index Layout */}
          <Route path="" element={<IndexLayout />}> 
            <Route path="/" element={<Index />} /> {/* เปรม */}
            <Route path="/cart" element={<Cart />} /> {/* เอิร์ธ */}
            <Route path="/checkout" element={<Checkout />} /> {/* เอิร์ธ */}
            <Route path="/products" element={<IndexUserProducts />} /> {/* อิฐ */}
            <Route path="/product/:slug" element={<ProductDetail />} /> {/* อิฐ */}
            <Route path="/categories/:slug" element={<Categories />} /> {/* อิฐ */}
          </Route>

          <Route path="/upload-slip" element={<UploadSlip />} /> {/* เอิร์ธ */}

          {/* Account Layout */}
          <Route path="" element={<AccountLayout />}>
            <Route path="/account" element={<IndexAccount />} /> {/* เปรม */}
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/my-review" element={<MyReview />} />
          </Route>

          {/* Auth Layout */}
          <Route path="" element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignIn />} /> {/* เปรม */}
            <Route path="/sign-up" element={<SignUp />} /> {/* เปรม */}
          </Route>

          {/* Administrator Layout */}
          <Route path="/administrator" element={<AdministratorLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<InputLayout />}>
              <Route path="" element={<Profile />} />
            </Route>
            <Route path="products" element={<IndexProducts />} /> {/* คอปเตอร์ */}
            <Route path="products/create" element={<InputLayout />}>
              <Route path="" element={<CreateProducts />} /> {/* คอปเตอร์ */}
            </Route>
            <Route path="products/:slug" element={<InputLayout />}>
              <Route path="" element={<Product />} /> {/* คอปเตอร์ */}
            </Route>
            <Route path="products/:slug/edit" element={<InputLayout />}>
              <Route path="" element={<EditProduct />} /> {/* คอปเตอร์ */}
            </Route>
            <Route path="users" element={<IndexUsers />} />
            <Route path="users/:slug" element={<InputLayout />}>
              <Route path="" element={<User />} />
            </Route>
            <Route path="users/create" element={<InputLayout />}>
              <Route path="" element={<CreateUser />} />
            </Route>
            <Route path="users/:slug/edit" element={<InputLayout />}>
              <Route path="" element={<EditUser />} />
            </Route>
            <Route path="orders" element={<IndexOrders />} />
            <Route path="orders/:slug" element={<InputLayout />}>
              <Route path="" element={<Order />} />
            </Route>

            <Route path="categories" element={<IndexCategories />} /> {/* แพท */}
            <Route path="discount" element={<IndexDiscount />} /> {/* แพท */}
            <Route path="discount/create" element={<InputLayout />}> 
              <Route path="" element={<CreateDiscount />} /> {/* แพท */}
            </Route>
            <Route path="discount/:slug/edit" element={<InputLayout />}>
              <Route path="" element={<EditDiscount />} /> {/* แพท */}
            </Route>
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
