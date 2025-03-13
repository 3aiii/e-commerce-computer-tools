import React from "react";
import { matchPath, Outlet, useLocation, useParams } from "react-router-dom";

const InputLayout = () => {
  const location = useLocation();

  const getPathName = (path) => {
    const { slug } = useParams();

    if (matchPath("/administrator/products/create", path)) {
      return {
        title: "Create Product",
        pathName: "Products / Create Product",
      };
    }

    if (matchPath("/administrator/users/create", path)) {
      return {
        title: "Create User",
        pathName: "Users / Create User",
      };
    }

    if (matchPath("/administrator/discount/create", path)) {
      return {
        title: "Create Discount",
        pathName: "Discount / Create Discount",
      };
    }

    if (matchPath("/administrator/products/:slug/edit", path)) {
      return {
        title: "Edit Product",
        pathName: `Products / ${
          slug?.charAt(0).toUpperCase() + slug?.slice(1)
        } / Edit`,
      };
    }

    if (matchPath("/administrator/users/:fname/edit", path)) {
      return {
        title: "Edit User",
        pathName: `Users / ${
          slug?.charAt(0).toUpperCase() + slug?.slice(1)
        } / Edit`,
      };
    }

    if (matchPath("/administrator/discount/:slug/edit", path)) {
      return {
        title: "Edit Discount",
        pathName: `Discount / ${
          slug?.charAt(0).toUpperCase() + slug?.slice(1)
        } / Edit`,
      };
    }

    if (matchPath("/administrator/products/:slug", path)) {
      return {
        title: "Preview Product",
        pathName: `Products / ${
          slug?.charAt(0).toUpperCase() + slug?.slice(1)
        }`,
      };
    }

    if (matchPath("/administrator/users/:slug", path)) {
      return {
        title: "Preview User",
        pathName: `Users / ${slug?.charAt(0).toUpperCase() + slug?.slice(1)}`,
      };
    }

    if (matchPath("/administrator/orders/:slug", path)) {
      return {
        title: "Preview Order",
        pathName: `Orders / ${slug?.charAt(0).toUpperCase() + slug?.slice(1)}`,
      };
    }

    switch (path) {
      case "/administrator/dashboard":
        return {
          title: "Dashboard",
          pathName: "หน้าหลัก",
        };
      case "/administrator/users":
        return {
          title: "Users",
          pathName: "ผู้ใช้งานทั้งหมด",
        };
      case "/administrator/users/create":
        return {
          title: "Create User",
          pathName: "ผู้ใช้งานทั้งหมด / เพิ่มผู้ใช้งาน",
        };
      case "/administrator/blogs":
        return {
          title: "Blogs",
          pathName: "บทความทั้งหมด",
        };
      case "/administrator/blogs/insert":
        return {
          title: "Create Blog",
          pathName: "บทความทั้งหมด / เพิ่มบทความใหม่",
        };
      case "/administrator/categories":
        return {
          title: "Categories",
          pathName: "บทความทั้งหมด / หมวดหมู่ทั้งหมด",
        };
      case "/administrator/profile":
        return {
          title: "Profile",
          pathName: "Setting / Profile",
        };
      default:
        return {
          title: "Unknown Page",
          pathName: "หน้าที่ไม่รู้จัก",
        };
    }
  };

  const { title, pathName } = getPathName(location.pathname);

  return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-3xl font-normal mt-8 my-4">{title}</h1>
        <div>
          <p className="text-blue-600">{pathName}</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default InputLayout;
