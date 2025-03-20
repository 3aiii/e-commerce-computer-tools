import React from "react";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { slug } = useParams();
  return <div>Categories {slug}</div>;
};

export default Categories;
