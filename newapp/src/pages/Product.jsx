import React, { useEffect, useState } from "react";

const Product = () => {
  const [shirts, setShirts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/allproducts")
      .then((res) => res.json())
      .then((data) => {
        const shirtProducts = data.filter(
          (item) => item.category?.toLowerCase() === "shirt"
        );
        setShirts(shirtProducts);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Shirt Products</h2>

      {shirts.length === 0 ? (
        <p>No shirt products found</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {shirts.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                width: "200px",
              }}
            >
              {/* FIRST IMAGE FROM ARRAY */}
              <img
                src={
                  product.images?.[0]
                }
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              <h4>{product.name}</h4>
              <p>Category: {product.category}</p>
              <p>Price: Rs {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
