import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "../Components/ProductDetails";
import Products from "../Components/Products";
import Home from "./../Components/Home";
import Payment from "./../Components/Payment";
import Invoice from "../Components/Invoice";
import PrivateRoute from "./PrivateRoute";
import NoPage from "../Components/NoPage";
import Login_SignupContainer from "../Components/Login_SignupContainer";
import Cart from "../Components/Cart";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login_signup" element={<Login_SignupContainer />} />
      <Route
        path="/productDetail"
        element={
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        }
      />
      <Route
        path="/invoice"
        element={
          <PrivateRoute>
            <Invoice />
          </PrivateRoute>
        }
      />
      <Route
        path="/invoice"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route path="/*" element={<NoPage />} />
    </Routes>
  );
}
