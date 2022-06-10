import { Col, Row } from "antd";
import React from "react";
import ImageSelector from "../selector";
import ImageViewer from "../imageViewer";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const Home = ({ setIsModalVisible, selectorApi, productData, loading }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 44, position: "fixed", left: "50%", top: "20%" }} spin />;


  return (
    <Row gutter={[14, 14]} className={loading ? "screen-overlay" : ""}>
      {loading && <Spin indicator={antIcon} />}
      <ImageViewer productData={productData} loading={loading} />
      {productData && (
        <ImageSelector
          setIsModalVisible={setIsModalVisible}
          productData={productData}
          selectorApi={selectorApi}
          loading={loading}
        />
      )}
    </Row>
  );
};

export default Home;
