import React, { useState } from "react";
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

import { Elements } from "@stripe/react-stripe-js";

import { DeleteFilled } from "@ant-design/icons";
import StripePayment from "../stripPayment/stripePayment";
import { loadStripe } from "@stripe/stripe-js";
import { Link, Navigate } from "react-router-dom";
import { useDetailsData } from "../contextApi";
import { numberWithCommas } from "../../App";


const stripePromise = loadStripe("pk_live_51KWcAIDbMv7unvikCfHkJWlbfXK7x3erBSvDdqQvM0i3xAaCLuEoWNbP2qIn8MiGzxj8bFzbuRyMu2vyf0Jw5ZhN00CR4diCJf");

const options = {
  // passing the client secret obtained from the server
  clientSecret: "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",
};

const { Option } = Select;
const AddDetails = ({ productData }) => {

  const { cartDataContext } = useDetailsData();
  const [paymentModal, setPaymentModal] = useState(false);
  const [userDetailsValues, setUserDetailsValues] = useState({});
  if (!JSON.parse(localStorage?.getItem('cartDetail') || null)?.cartValue) {
    return (
      <Navigate to='/' />
    )
  }

  const { amount, cartAmount, cartValue } = JSON.parse(localStorage.getItem('cartDetail'))

  const PaymentModal = () => {

    return (
      <Modal
        title="Proceed Checkout"
        visible={paymentModal}
        onOk={openPaymentModal}
        onCancel={closePaymentModal}
        footer={null}
      >
        <Elements stripe={stripePromise}>
          <StripePayment
            closePaymentModal={closePaymentModal}
            userDetailsValues={userDetailsValues || {}}
            productData={productData || {}}
          />
        </Elements>
      </Modal>
    );
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const openPaymentModal = () => {
    setPaymentModal(true);
  };

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    if (values) {
      openPaymentModal(true);
      setUserDetailsValues(values)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    // openPaymentModal(true);
  };

  return (
    <div className="padding-main ">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <div className="first column">
              <Row>
                <Col md={{ span: 24 }} >
                  <h3>Detalii pentru facturare</h3>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Prenume"
                    name="firstName"
                    wrapperCol={{ span: 22 }}
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Prenume!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Nume"
                    name="lastName"
                    wrapperCol={{ span: 22 }}
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Nume!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Nume companie (op??ional)
                    "
                    name="company"
                    wrapperCol={{ span: 22 }}
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Nume companie!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Strad?? *
                    "
                    name="street"
                    wrapperCol={{ span: 22 }}
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Strad??!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Ora?? *
                    "
                    name="city"
                    wrapperCol={{ span: 22 }}
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Ora??!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Jude??"
                    name="state"
                    wrapperCol={{ span: 22 }}
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Jude??!",
                      },
                    ]}
                  >



                    <Select defaultValue="Selecteaz?? o op??iune...">
                      <Option value="">Selecteaz?? o op??iune...</Option>
                      <Option value="AB">Alba</Option>
                      <Option value="AR">Arad</Option>
                      <Option value="AG">Arge??</Option>
                      <Option value="BC">Bac??u</Option>
                      <Option value="BH">Bihor</Option>
                      <Option value="BN">Bistri??a-N??s??ud</Option>
                      <Option value="BT">Boto??ani</Option>
                      <Option value="BR">Br??ila</Option>
                      <Option value="BV">Bra??ov</Option>
                      <Option value="B">Bucure??ti</Option>
                      <Option value="BZ">Buz??u</Option>
                      <Option value="CL">C??l??ra??i</Option>
                      <Option value="CS">Cara??-Severin</Option>
                      <Option value="CJ">Cluj</Option>
                      <Option value="CT">Constan??a</Option>
                      <Option value="CV">Covasna</Option>
                      <Option value="DB">D??mbovi??a</Option>
                      <Option value="DJ">Dolj</Option>
                      <Option value="GL">Gala??i</Option>
                      <Option value="GR">Giurgiu</Option>
                      <Option value="GJ">Gorj</Option>
                      <Option value="HR">Harghita</Option>
                      <Option value="HD">Hunedoara</Option>
                      <Option value="IL">Ialomi??a</Option>
                      <Option value="IS">Ia??i</Option>
                      <Option value="IF">Ilfov</Option>
                      <Option value="MM">Maramure??</Option>
                      <Option value="MH">Mehedin??i</Option>
                      <Option value="MS">Mure??</Option>
                      <Option value="NT">Neam??</Option>
                      <Option value="OT">Olt</Option>
                      <Option value="PH">Prahova</Option>
                      <Option value="SJ">S??laj</Option>
                      <Option value="SM">Satu Mare</Option>
                      <Option value="SB">Sibiu</Option>
                      <Option value="SV">Suceava</Option>
                      <Option value="TR">Teleorman</Option>
                      <Option value="TM">Timi??</Option>
                      <Option value="TL">Tulcea</Option>
                      <Option value="VL">V??lcea</Option>
                      <Option value="VS">Vaslui</Option>
                      <Option value="VN">Vrancea</Option>
                    </Select>





                  </Form.Item>
                </Col>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Cod po??tal *
                    "
                    name="pincode"
                    wrapperCol={{ span: 22 }}
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Cod po??tal!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Telefon"
                    name="phoneNumber"
                    wrapperCol={{ span: 22 }}
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Telefon!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Adres?? email                     "
                    name="email"
                    wrapperCol={{ span: 22 }}
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Adres?? email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={{ span: 24 }} className="text-right">
                  <Form.Item
                    wrapperCol={{
                      span: 22,
                    }}
                  >
                    <span className="cursor go-back">
                      <Link to="/cart">Go Back</Link>
                    </span>
                    <Button className="add-btn checkout-btn" htmlType="submit">
                      Checkout
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <div className="second-column">
              <Row>
                {productData &&
                  Object?.keys(productData)?.map(function (step, index) {
                    const steps = productData[step];
                    if (typeof steps !== "object") return undefined
                    return (
                      !productData?.dropDown && (
                        <>
                          <Col md={{ span: 12 }} xs={{ span: 12 }}>
                            <p className="description-data fl">{steps?.title}</p>
                          </Col>
                          <Col md={{ span: 12 }} xs={{ span: 12 }}>
                            <p className="description-data fr">
                              {steps?.options?.filter?.(
                                (data) => data?.id === steps?.default
                              )?.[0]?.text || "N.A"}</p>
                          </Col>
                          <Divider className="divider-margin" />
                        </>
                      )
                    );
                  })}
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                  <p className="delivery fl">Delivery & payment</p>
                </Col>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                  <p className="delivery fr">??? {numberWithCommas(cartAmount || "N.A.")}</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Form>
      <PaymentModal />
    </div>
  );
};

export default AddDetails;
