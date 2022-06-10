import React, { useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Col, Row, Modal } from "antd";
import tickIcon from "../../tickIcon.png";
import axios from "axios";
import { useDetailsData } from "../contextApi";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "16px",
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    ["16px"]
  );

  return options;
};



const StripePayment = ({ closePaymentModal, userDetailsValues, productData }) => {
  const { firstName, lastName, company, street, city, state, pincode, phoneNumber, email } = userDetailsValues

  const { cartDataContext } = useDetailsData();
  const { amount, cartPrice, cartValue } = cartDataContext[0]
  const variationObj = Object?.values(productData)?.map(function (step, index) {

    return (
      {
        "variation_name": step?.title,
        "name_id": index,
        "variation_attribute": step?.options?.filter?.(
          (data) => data?.id === step?.default
        )?.[0]?.text || "",
        "attribute_id": index
      }
    )

  })

  const orderApiData = {
    "set_paid": true,
    "billing": {
      "first_name": firstName || "",
      "last_name": lastName || "",
      "address_1": street || "",
      "city": city || "",
      "state": state || "",
      "postcode": pincode || "",
      "country": "IN" || "",
      "email": email || "",
      "phone": phoneNumber || ""
    },
    "shipping": {
      "first_name": firstName || "",
      "last_name": lastName || "",
      "address_1": street || "",
      "city": city || "",
      "state": state || "",
      "postcode": pincode || "",
      "country": "IN" || "",
    },
    "sku": productData?.sku || "",
    "quantity": cartValue || "",
    "price": cartPrice || "",
    "variation": variationObj
  }



  const hitOrderApi = () => {
    axios
      .post(
        "https://configurator.masara.ro/confidence/api/User/order",
        { ...orderApiData }
      )
      .then(function (response) {
        openPaymentSuccessModal();
      })
      .catch(function (error) {
        openPaymentFailureModal();
      });
  }

  const hitPaymentApi = (token) => {
    const data = {
      amount: cartPrice,
      token: token?.id || "",
      name: firstName,
      lastName: lastName,
      address: {
        line1: street,
        postal_code: pincode,
        city: city,
        state: state,
        country: "US"
      }
    }

    axios
      .post(
        "https://configurator.masara.ro/confidence/api/User/payment",
        { ...data }
      )
      .then(function (response) {
        if (response?.data) {
          hitOrderApi()
        }
      })
      .catch(function (error) {
        console.log('error22 :>> ', error);
      });
  }

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
  const [paymentFailureModal, setPaymentFailureModal] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // use stripe.createToken to get a unique token for the card
    const { error, token } = await stripe.createToken(cardElement);


    if (token?.id) {
      hitPaymentApi(token)

    }
    else {
      openPaymentFailureModal()
    }

  };


  const openPaymentSuccessModal = () => {
    setPaymentSuccessModal(true);
  };

  const closePaymentSuccessModal = () => {
    setPaymentSuccessModal(false);
    closePaymentModal();
  };

  const PaymentSuccessModal = () => {
    return (
      <Modal
        title="Payment Successfull"
        visible={paymentSuccessModal}
        onOk={openPaymentSuccessModal}
        onCancel={closePaymentSuccessModal}
        footer={null}
      >
        <div className="App">
          <img src={tickIcon} width="150" alt="icon" />
          <h2> Payment Succesfull </h2>
        </div>
      </Modal>
    );
  };

  const openPaymentFailureModal = () => {
    setPaymentFailureModal(true)
  }
  const closePaymentFailureModal = () => {
    setPaymentFailureModal(false)
  }

  const PaymentFailureModal = () => {
    return (
      <Modal
        title="Payment Successfull"
        visible={paymentFailureModal}
        onOk={openPaymentFailureModal}
        onCancel={closePaymentFailureModal}
        footer={null}
      >
        <div className="App">
          <img src={tickIcon} width="150" alt="icon" />
          <h2> Payment Falied </h2>
        </div>
      </Modal>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col md={{ span: 24 }}>
          <CardElement options={options} />
        </Col>
        <Col md={{ span: 24 }} className="text-right">
          <Button
            className="checkout-btn"
            htmlType="submit"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </Button>
        </Col>
      </Row>
      <PaymentSuccessModal />
      <PaymentFailureModal />
    </form>
  );
};

export default StripePayment;
