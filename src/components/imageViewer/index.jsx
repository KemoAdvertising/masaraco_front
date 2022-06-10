import { Button, Col, Radio, Row, Form, Select, Skeleton, Divider } from "antd";
import React from "react";
import { numberWithCommas } from "../../App";

const ImageViewer = ({ productData, loading }) => {
  return (
    <Col md={{ span: 12 }} xs={{ span: 24 }}>
      <div className="main-container-left">
        {productData && (
          <img
            src={productData?.productVariantImage}
            alt="iamge"
            className="img-size"
          />
        )}
        <Row>
          <Col md={{ span: 12 }} xs={{ span: 18 }}>
            <h3 className="price-title fl">Specifications of your table</h3>
          </Col>
          <Col md={{ span: 12 }} xs={{ span: 6 }}>
            <h3 className="price-subtitle fr">
              {numberWithCommas(productData?.price || "N.A.")} RON
            </h3>
          </Col>

          {productData &&
            Object?.keys(productData)?.map(function (step, index) {
              const steps = productData[step];

              if (typeof steps !== "object") return undefined
              return (
                !productData?.dropDown && (
                  <>
                    <Col md={{ span: 12 }} xs={{ span: 12 }}>
                      <p className="description-data fl">{steps?.step}</p>
                    </Col>
                    <Col md={{ span: 12 }} xs={{ span: 12 }}>
                      <p className="description-data fr">
                        {steps?.options?.filter?.(
                          (data) => data?.id === steps?.default
                        )?.[0]?.text || "N.A"}
                      </p>
                    </Col>
                    <Divider className="divider-margin" />
                  </>
                )
              );
            })}

          <Col md={{ span: 24 }}>
            <p className="delivery fl">Levertijden & betaling</p>
          </Col>

          <Col md={{ span: 24 }}>

            <p>  Heb je een mooi designmeubel gevonden maar kun je niet wachten tot je je designtafel in huis hebt? Bekijk onze actuele voorraad hier!</p>

            <p> Als je eenmaal je order hebt geplaatst, vragen we je om een aanbetaling van € 500,-. Is je order op voorraad of minder dan € 500,-? Dan vragen we je om het gehele bedrag vooraf te betalen. Het bedrag kan bij checkout betaald worden met iDeal, Credit Card of Bancontact (Mister Cash). De rest van het bedrag kan bij levering of afhaling betaald worden per pin.</p>

            <p> Bestelde eettafels worden bij levering in Nederland en België gemonteerd. De overige producten worden enkel bezorgd. Bestel je echter naast een eettafel nog andere producten die in Nederland of België worden bezorgd dan worden alle producten gemonteerd. LET OP: wandkasten worden nooit gemonteerd.</p>

            <p> Je kunt jouw order ophalen in Haarlem of gratis laten bezorgen binnen Nederland en België. Let op: laat je je product(en) bezorgen buiten Nederland en België? Dan worden producten enkel verzonden na volledige betaling van de factuur.</p>

            <p> Neem contact met ons op voor meer informatie over levering buiten Nederland en België.</p>

          </Col>
        </Row>
      </div>
    </Col >
  );
};

export default ImageViewer;
