import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contect/ShopContext";
import ProductItem from "../contect/ProductItem";
import "../css/Title.css";

const RelatedData = ({ category, subCategory, currentId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter(
        (item) =>
          (item.category === category || item.subCategory === subCategory) &&
          item._id !== currentId
      );

      setRelated(productCopy.slice(0, 6));
    }
  }, [products, category, subCategory, currentId]);

  if (related.length === 0) return null;

  return (
    <div className="related-container">
      <h3 className="related-title">Related products </h3>
      <div className="related-grid">
        { related.map((item) => (
          <ProductItem
            key={ item._id }
            id={ item._id }
            name={ item.name }
            image={ item.image }
            price={ item.price }
          />
        )) }
      </div>
    </div>
  );
};

export default RelatedData;
