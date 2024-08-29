import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/Order/Order";
import { Cart } from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Nopage from "./pages/nopage/Nopage";
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/pages/AddProduct";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from 'react-router-dom';
import AllProducts from "./pages/allproducts/AllProducts";

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/order"
            element={
              <ProtectedRoutes>
                <Order />
              </ProtectedRoutes>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutesForAdmin>
                <Dashboard />
              </ProtectedRoutesForAdmin>
            }
          />
            {/* <Route
            path="/user-dashboard"
            element={
              <ProtectedRoutes>
                <UserDashboard />
              </ProtectedRoutes>
            }
          /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoutesForAdmin>
                <AddProduct />
              </ProtectedRoutesForAdmin>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectedRoutesForAdmin>
                <UpdateProduct />
              </ProtectedRoutesForAdmin>
            }
          />

  <Route
            path="/allproduct"
            element={
              <ProtectedRoutes>
                <AllProducts />
              </ProtectedRoutes>
            }
          />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/*" element={<Nopage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
};

export default App;


// user
export const ProtectedRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

//Admin

export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  // console.log(admin.user.email);
  if (admin.user.email === "admin12345@gmail.com") {
    return children;
  } else {
    return <Navigate to="/login" />;
  } 
};
