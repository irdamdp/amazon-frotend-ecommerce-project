import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sproductcard from "../../components/secondapiproduct/Sproductcard.jsx";
import Loader from "../../components/loader/Loader.jsx";
import axios from "axios";
import classes from "../../components/secondapiproduct/spro.module.css";
import BackButton from "../../components/BackButton/BackButton";

function Sproduct() {
  const [Sproducts, setProducts] = useState([]);
  const [isloader, setIsloader] = useState(false);
  const { categoryName } = useParams();

  const filteredProducts = Sproducts.filter(
    (singleproduct) =>
      singleproduct.categoryName?.toLowerCase() === categoryName?.toLowerCase()
  );

  useEffect(() => {
    setIsloader(true);

    const cleanImage = (img) => {
      if (!img) return "https://via.placeholder.com/300";
      // Handle case where image is a stringified array like '["https://..."]'
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
          images: prod.images.map(img => cleanImage(img)),
          categoryName: prod.category.name,
          model: prod.category.name,
          brand: "Platzi",
        }));
        setProducts(mappedProducts);
        setIsloader(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching data:",
          err.response?.data || err.message
        );
        setIsloader(false);
      });
  }, []);

  return (
    <>
      {isloader ? (
        <Loader />
      ) : filteredProducts.length > 0 ? (
        <section style={{ padding: "10px 20px" }}>
          <BackButton />
          <div className={classes.products_container}>
            {filteredProducts.map((singleproduct) => (
              <Sproductcard
                categorized={singleproduct}
                key={singleproduct.id}
                remover={true}
              />
            ))}
          </div>
        </section>
      ) : (
        <p>No products found for "{categoryName}".</p>
      )}
    </>
  );
}

export default Sproduct;


