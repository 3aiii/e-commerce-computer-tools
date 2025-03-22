import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verify } from "../../../composables/authentication/Authentication";

const Cart = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await verify();
      } catch (error) {
        if (error.response.data.statusCode === 404) {
          navigate("/sign-in");
        }
      }
    };

    fetchUser();
  }, []);

  return <div>Cart</div>;
};

export default Cart;
