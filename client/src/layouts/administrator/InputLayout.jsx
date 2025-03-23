import React from "react";
import { matchPath, Outlet, useLocation, useParams } from "react-router-dom";

const InputLayout = () => {
  const location = useLocation();
  const { slug } = useParams();

  const formatSlug = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  const routesMap = {
    "/administrator/products/create": {
      title: "Create Product",
      pathName: "Products / Create Product",
    },
    "/administrator/users/create": {
      title: "Create User",
      pathName: "Users / Create User",
    },
    "/administrator/discount/create": {
      title: "Create Discount",
      pathName: "Discount / Create Discount",
    },
    "/administrator/dashboard": { title: "Dashboard", pathName: "หน้าหลัก" },
    "/administrator/users": { title: "Users", pathName: "ผู้ใช้งานทั้งหมด" },
    "/administrator/blogs": { title: "Blogs", pathName: "บทความทั้งหมด" },
    "/administrator/blogs/insert": {
      title: "Create Blog",
      pathName: "บทความทั้งหมด / เพิ่มบทความใหม่",
    },
    "/administrator/categories": {
      title: "Categories",
      pathName: "บทความทั้งหมด / หมวดหมู่ทั้งหมด",
    },
    "/administrator/profile": {
      title: "Profile",
      pathName: "Setting / Profile",
    },
  };

  const dynamicRoutes = [
    {
      pattern: "/administrator/products/:slug/edit",
      title: "Edit Product",
      prefix: "Products",
    },
    {
      pattern: "/administrator/users/:slug/edit",
      title: "Edit User",
      prefix: "Users",
    },
    {
      pattern: "/administrator/discount/:slug/edit",
      title: "Edit Discount",
      prefix: "Discount",
    },
    {
      pattern: "/administrator/products/:slug",
      title: "Preview Product",
      prefix: "Products",
    },
    {
      pattern: "/administrator/users/:slug",
      title: "Preview User",
      prefix: "Users",
    },
    {
      pattern: "/administrator/orders/:slug",
      title: "Preview Order",
      prefix: "Orders",
    },
  ];

  const matchedStaticRoute = routesMap[location.pathname];

  const matchedDynamicRoute = dynamicRoutes.find(({ pattern }) =>
    matchPath(pattern, location.pathname)
  );

  const title =
    matchedStaticRoute?.title || matchedDynamicRoute?.title || "Unknown Page";
  const pathName =
    matchedStaticRoute?.pathName ||
    (matchedDynamicRoute
      ? `${matchedDynamicRoute.prefix} / ${formatSlug(slug)}`
      : "หน้าที่ไม่รู้จัก");

  return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-3xl font-normal mt-8 my-4">{title}</h1>
        <p className="text-blue-600">{pathName}</p>
      </div>
      <Outlet />
    </div>
  );
};

export default InputLayout;
