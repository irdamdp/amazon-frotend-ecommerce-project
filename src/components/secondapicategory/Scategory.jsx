import React, { useState, useEffect } from "react";
import axios from "axios";
import Scategorycard from "./Scategorycard";
import classes from "./Scategory.module.css";
import Loader from "../loader/Loader";

function Scategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const cleanImage = (img, categoryName) => {
      // Default image for Fashion & Accessories if the API one is missing or looks like a placeholder
      if (categoryName === "Fashion & Accessories" && (!img || img.includes("placeimg.com") || img.includes("placeholder"))) {
        return "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=60";
      }

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
      .get("https://api.escuelajs.co/api/v1/categories")
      .then((res) => {
        // Map the new API response to the structure expected by Scategorycard
        const mappedCategories = res.data.slice(0, 5).map((cat) => {
          const title = cat.name === "ElectronicUpdate" ? "Fashion & Accessories" : cat.name;
          return {
            title: title,
            name: cat.name,
            imgLink: cleanImage(cat.image, title),
          };
        });
        setCategories(mappedCategories);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <section className={classes.category_container}>
        {isLoading ? (
          <Loader />
        ) : (
          categories.map((categoryItem, index) => (
            <Scategorycard key={index} data={categoryItem} />
          ))
        )}
      </section>
    </>
  );
}

export default Scategory;
