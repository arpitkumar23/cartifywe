import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contect/ShopContext";
import Title from "../contect/Title";
import '../css/Title.css'
import ProductItem from "../contect/ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Show only 5 latest products
    setLatestProducts(products.slice(0, 3));
  }, [products]);

  return (
    <div className="latest-collection">
      <div className="section-header">
        <Title text1="LATEST" text2="COLLECTION" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quidem quisquam sed deserunt!</p>
      </div>

      <div className="products-grid">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
