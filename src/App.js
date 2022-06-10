import logo from "./logo.svg";
import "./App.css";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import {
  Button,
  Col,
  Divider,
  Input,
  Radio,
  Row,
  Select,
  Skeleton,
  Form,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { dataMocks, dataMocks2, priceData } from "./dataMock";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import checkimg from "./wall-mounted-tables-25206.webp";
import ImageSelector from "./components/selector";
import ImageViewer from "./components/imageViewer";
import StripePayment from "./components/stripPayment/stripePayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Footer from "./components/Footer";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CartPage from "./components/cartPage";
import AddDetails from "./components/addDetails";

import NavBarFun from "./components/Navbar";
import { UserDetailContext } from "./components/contextApi";
const { Option } = Select;

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function App() {
  const [productData, setProductData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartDataCont, setCartDataCont] = useState({
    cartValue: 1,
    amount: 0,
  });

  const selectorApi = (dataArr) => {
    console.log("dataArr :>> ", dataArr);
    setLoading(true);
    axios
      .post("https://configurator.masara.ro/confidence/api/User/productPrice", {
        option: dataArr,
      })
      .then(function (response) {
        setProductData(response?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    selectorApi([]);
  }, []);

  return (
    <>
      <UserDetailContext.Provider
        value={{ cartDataContext: [cartDataCont, setCartDataCont] }}
      >
        <NavBarFun />
        <div>
          <BrowserRouter basename="/">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    setIsModalVisible={setIsModalVisible}
                    productData={productData}
                    setProductData={setProductData}
                    selectorApi={selectorApi}
                    loading={loading}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <CartPage
                    loading={loading}
                    setIsModalVisible={setIsModalVisible}
                    isModalVisible={isModalVisible}
                    productData={productData}
                  />
                }
              />
              <Route
                path="/details"
                element={
                  <AddDetails productData={productData} loading={loading} />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
        {!loading && <Footer />}
      </UserDetailContext.Provider>
    </>
  );
}

export default App;
