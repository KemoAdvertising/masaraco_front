import { Button, Col, Radio, Row, Form, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDetailsData } from "../contextApi";
import { numberWithCommas } from "../../App";

const { Option } = Select;

const ImageSelector = ({
  setIsModalVisible,
  productData,
  selectorApi,
  loading,
}) => {
  const [count, setCount] = useState(1);
  const { cartDataContext } = useDetailsData();
  // const [changeCss, setChangeCss] = useState([]);

  const [value, setValue] = React.useState(1);
  const [arrData, setArrData] = useState([]);

  const handleImageSelector = (pickedData, pickedStep) => {
    if (Object.values(productData)?.find((obj) => {
      return obj?.default === pickedData?.id;
    }) === undefined) {
      if (
        Object.values(arrData).find((obj) => {
          return obj?.step === pickedStep;
        })
      ) {
        setArrData((prevValue) => {
          const newData = prevValue?.map((p) =>
            p.step === pickedStep ? { ...p, id: pickedData?.id } : p
          )

          selectorApi(newData?.map((data) => data?.id) || []);

          return newData;
        });
      } else {
        setArrData((prevValue) => {
          const newData = [
            ...prevValue,
            { id: pickedData?.id, step: pickedStep },
            ...Object.keys(productData || {}).map(function (data) {
              const steps = productData[data];
              if (typeof steps !== "object" || productData[data].step === pickedStep) return undefined
              return { id: productData[data].default, step: productData[data].step }
            }).filter(data => data !== undefined)
          ];

          selectorApi(newData?.map((data) => data?.id) || []);

          return newData;
        });
      }
    }
  };

  const onFinish = (values) => {

    if (values) {
      setIsModalVisible(true);
    }
  };

  function handleChange(value, data) {

    const newData = data?.options.filter((data) => data?.text === value)[0]
    handleImageSelector(newData, data?.step)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSelectChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Col md={{ span: 12 }} xs={{ span: 24 }}>
      <Form
        name="select-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="main-container-right">
          <h3 className="main-head">CONFIGURE YOUR TABLE</h3>
          {Object?.keys(productData)?.map(function (step, index) {
            const steps = productData[step];
            if (typeof steps !== "object") return undefined
            return (
              <div key={index}>
                <h3 className="step-title">{steps.step}</h3>
                {!steps.dropdown ? (
                  <Form.Item name={steps?.value + "_img"} label="">
                    <Radio.Group value={steps?.default} defaultValue={steps?.default}>
                      <Row key={index}>
                        {steps?.options?.map((data, index) => {
                          return !data.image ? (
                            <Skeleton.Avatar
                              active={true}
                              size={100}
                              shape="square"
                            />
                          ) : (
                            <label key={data.id}>
                              <Radio
                                value={data?.id}
                                className={`remove-radio ${steps?.default === data?.id ? "active-radio" : ""}`}
                                checked={true}
                              />
                              <img
                                src={data?.image}
                                alt="icon"
                                id={data?.id}
                                className="selector-size"
                                onClick={() => {
                                  handleImageSelector(data, steps.step);
                                }}
                              />
                              <p className="label-text">{data?.text}</p>
                            </label>
                          );
                        })}
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                ) : (
                  <Row gutter={[24, 24]}>
                    <Col
                      className="gutter-row"

                      md={{ span: 24 }}
                      xs={{ span: 24 }}
                    >
                      <Form.Item
                        name={steps?.value + steps?.value}
                        label=""
                      >
                        <Select
                          style={{ width: "50%" }}
                          onChange={(value) => { handleChange(value, steps); }}
                          defaultValue={steps?.options.find((data) => steps?.default === data?.id)?.text}
                        >
                          {steps?.options?.map((subData, i) => {
                            return (
                              <Option value={subData?.text} key={i}>
                                {subData?.text}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </div>
            );
          })}
        </div>
        <Row justify="end" gutter={[18, 18]} className="main-container-right">
          <Col md={{ offset: 13, span: 5 }} xs={{ span: 12 }}>
            <p className="cart-detail"></p>Quantity
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 12 }}>
            <MinusCircleOutlined
              className="cursor minus-style"
              onClick={() => {
                setCount((prev) => {
                  if (prev === 0) {
                    return 0;
                  } else {
                    return prev - 1;
                  }
                });
              }}
            />
            <span className="cart-number">{count}</span>
            <PlusCircleOutlined
              className="cursor plus-style"
              onClick={() => {
                setCount((prev) => {
                  return prev + 1;
                });
              }}
            />
          </Col>
          <Col md={{ offset: 13, span: 5 }} xs={{ span: 12 }}>
            <p className="amount"> Amount</p>
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 12 }}>
            €  {numberWithCommas(parseInt(productData?.price) * count || "N.A.")}
          </Col>
          <Col md={{ offset: 13, span: 11 }} xs={{ span: 24 }}>
            <p className="delivery-time">Delivery time 13-14 weeks</p>
          </Col>
          <Col md={{ offset: 13, span: 11 }} xs={{ span: 24 }}>
            <Form.Item>
              <Button className="add-btn" htmlType="submit" onClick={() => {
                localStorage.setItem('cartDetail', JSON.stringify({
                  cartValue: count,
                  cartAmount: parseInt(productData?.price) * count || 0,
                  amount: parseInt(productData?.price) || 0,
                }));
                cartDataContext?.[1]?.({
                  cartValue: count,
                  cartPrice: parseInt(productData?.price) * count || 0,
                  amount: parseInt(productData?.price) || 0,
                })
              }}>
                <Link to="/cart">Add to shopping cart</Link>
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default ImageSelector;
