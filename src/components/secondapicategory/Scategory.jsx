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
    axios
      .get("https://api.escuelajs.co/api/v1/categories")
      .then((res) => {
        // Map the new API response to the structure expected by Scategorycard
        const mappedCategories = res.data.slice(0, 6).map((cat) => ({
          title: cat.name,
          name: cat.name,
          imgLink: cat.image,
        }));
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
