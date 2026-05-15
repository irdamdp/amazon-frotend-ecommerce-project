import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Loader from "../../components/loader/Loader";
import Products_card from "../../components/products/Products_card";
import BackButton from "../../components/BackButton/BackButton";

function ProductDetail() {
  const { ProductsId } = useParams();
  const [detail, setDetail] = useState({});
  const [isloading, setIsloading] = useState(false);
  const BASE_URL = import.meta.env.PROD ? "https://fakestoreapi.com" : "/api";

  useEffect(() => {
    setIsloading(true);
    axios
      .get(`${BASE_URL}/products/${ProductsId}`)
      .then((res) => {
        setDetail(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, []);

  return (
    <>
      {isloading ? (
        <Loader />
      ) : detail && Object.keys(detail).length > 0 ? (
        <div style={{ padding: "20px" }}>
          <BackButton />
          <Products_card
            product={detail}
            flex={true}
            renderdi={true}
            remover={true}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ProductDetail;
