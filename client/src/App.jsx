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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/administrator" element={<AdministratorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
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
          <Route path="users/create" />
          <Route path="user/:id/edit" />
          <Route path="orders" element={<IndexOrders />} />
          <Route path="orders/create" />
          <Route path="orders/:id/edit" />
          <Route path="categories" element={<IndexCategories />} />
          <Route path="categories/create" />
          <Route path="categories/:id/edit" />
          <Route path="discount" element={<IndexDiscount />} />
          <Route path="discount/create" />
          <Route path="discount/:id/edit" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
