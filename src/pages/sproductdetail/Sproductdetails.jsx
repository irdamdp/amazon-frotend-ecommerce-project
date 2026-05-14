import React, { useEffect, useState } from "react";
import Sproductcard from "../../components/secondapiproduct/Sproductcard";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";

function Sproductdetails() {
  const { ProductsId } = useParams();
  const [detail, setDetail] = useState([]);
  const [isloader, setIsloading] = useState(false);

  const filteredProducts =
    Array.isArray(detail) && detail.length > 0
      ? detail.filter(
          (singleproduct) => singleproduct.id === Number(ProductsId)
        )
      : [];

  useEffect(() => {
    setIsloading(true);

    const cleanImage = (img) => {
      if (!img) return "https://via.placeholder.com/300";
      if (typeof img === "string" && img.startsWith("[")) {
        try {
          const parsed = JSON.parse(img);
          return Array.isArray(parsed) ? parsed[0] : img;
        } catch (e) {
          return img.replace(/[\[\]"]/g, "");
        }
      }
      return img;
    };

    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        // Map the new API response to the structure expected by Sproductcard
        const mappedProducts = res.data.map((prod) => ({
          ...prod,
          image: cleanImage(prod.images[0]),
          model: prod.category.name,
          brand: "Platzi",
        }));
        setDetail(mappedProducts);
        setIsloading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsloading(false);
      });
  }, []);

  return (
    <>
      {isloader ? (
        <Loader />
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((singleproduct) => (
          <Sproductcard
            categorized={singleproduct}
            renderdi={true}
            flex={true}
            key={singleproduct.id}
            remover={true}
            alter={false}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </>
  );
}

export default Sproductdetails;
