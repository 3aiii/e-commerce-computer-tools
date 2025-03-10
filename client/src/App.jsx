import React from "react";
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
import EditOrder from "./pages/administrator/Orders/Edit";
import Order from "./pages/administrator/Orders/Order";
import { ToastContainer } from "react-toastify";
import User from "./pages/administrator/Users/User";
import CreateDiscount from "./pages/administrator/Discounts/Create";
import EditDiscount from "./pages/administrator/Discounts/Edit";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" theme="colored" />
      <Routes>
        <Route path="/administrator" element={<AdministratorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<InputLayout />}>
            <Route path="" element={<Profile />} />
          </Route>
          <Route path="products" element={<IndexProducts />} />
          <Route path="products/create" element={<InputLayout />}>
            <Route path="" element={<CreateProducts />} />
          </Route>
          <Route path="products/:slug" element={<InputLayout />}>
            <Route path="" element={<Product />} />
          </Route>
          <Route path="products/:slug/edit" element={<InputLayout />}>
            <Route path="" element={<EditProduct />} />
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
          <Route path="orders/:id" element={<IndexOrders />}>
            <Route path="" element={<Order />} />
          </Route>
          <Route path="orders/:id/edit" element={<IndexOrders />}>
            <Route path="" element={<EditOrder />} />
          </Route>
          <Route path="categories" element={<IndexCategories />} />
          <Route path="discount" element={<IndexDiscount />} />
          <Route path="discount/create" element={<InputLayout />}>
            <Route path="" element={<CreateDiscount />} />
          </Route>
          <Route path="discount/:slug/edit" element={<InputLayout />}>
            <Route path="" element={<EditDiscount />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
