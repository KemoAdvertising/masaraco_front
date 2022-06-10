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
  InputNumber,
} from "antd";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Navigate } from 'react-router-dom';
import { DeleteFilled } from "@ant-design/icons";
import StripePayment from "../stripPayment/stripePayment";
import { Link } from "react-router-dom";
import { useDetailsData } from "../contextApi";
import { numberWithCommas } from "../../App";

const { Option } = Select;

const CartPage = ({ productData }) => {

  const { cartDataContext } = useDetailsData();
  if (!JSON.parse(localStorage?.getItem('cartDetail') || null)?.cartValue) {
    return (
      <Navigate to='/' />
    )
  }
  const { amount, cartAmount, cartValue } = JSON?.parse(localStorage?.getItem('cartDetail'))

  function handleChange(value) {
    localStorage.setItem('cartDetail', JSON.stringify({
      cartValue: value,
      cartAmount: amount * value,
      amount: amount,
    }));
  }


  const cartPage = () => {
    return (
      <>
        <Row gutter={[8, 8]} className="text-right hidden-xs">
          <Col md={{ offset: 14, span: 2 }}>
            <h6>Price</h6>
          </Col>
          {/* <Col md={{ span: 2 }}>
            <h6>Quantity</h6>
          </Col> */}
          <Col md={{ span: 3 }} offset={3}>
            <h6> Total</h6>
          </Col>
        </Row>
        <Divider className="fat-divider" />
        <Row gutter={[8, 8]}>
          <Col md={{ span: 6 }}>
            <img src={productData?.productVariantImage} alt="imageCheckout" className="checkout-img" />
          </Col>
          <Col md={{ span: 8 }} xs={{ span: 24 }}>
            <h2 className="checkout-title">Selected Product</h2>
            {productData &&
              Object?.keys(productData)?.map(function (step, index) {
                const steps = productData[step];
                if (typeof steps !== "object") return undefined
                return (
                  !productData?.dropDown && (
                    <>
                      <p className="cart-desc">
                        <span className="bold">{steps?.title}</span> : {steps?.options?.filter?.(
                          (data) => data?.id === steps?.default
                        )?.[0]?.text || "N.A"}
                      </p>
                    </>
                  )
                );
              })}

          </Col>
          <Col md={{ span: 2 }} xs={{ span: 8 }} className="text-right">
            € {numberWithCommas(amount || "N.A.")}
          </Col>
          <Col md={{ span: 2 }} xs={{ span: 8 }} className="text-right">
            {cartValue} item/s
          </Col>
          <Col md={{ span: 3 }} xs={{ span: 8 }} className="text-right">
            <p className="checkout-desc cursor" onClick={() => { localStorage.clear() }}>
              <Link to="/"><DeleteFilled /></Link>
            </p>
          </Col>
          <Col
            md={{ span: 2 }}
            xs={{ span: 8 }}
            className="text-right"
            offset={1}
          >
            € {numberWithCommas(cartAmount || "N.A.")}
          </Col>
        </Row>
        <Divider />
        <Row gutter={[12, 12]}>
          <Col md={{ offset: 16, span: 5 }} xs={{ span: 12 }}>
            <p className="checkout-desc">Subtotal</p>
          </Col>
          <Col md={{ span: 3 }} xs={{ span: 12 }} className="text-right">
            <p className="checkout-desc">€ {numberWithCommas(cartAmount || "N.A.")} </p>
          </Col>
          <Col md={{ offset: 17, span: 2 }} xs={{ span: 24 }}></Col>
          <Col md={{ offset: 17, span: 7 }} xs={{ span: 24 }}>
            <Button block className="add-btn" htmlType="submit">
              <Link to="/details">Add Details</Link>
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <div className="padding-main">{cartPage()}</div>
    </>
  );
};

export default CartPage;
