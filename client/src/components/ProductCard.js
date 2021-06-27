import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./common/RatingStars";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="productCard__container">
      <div className="productCard__image">
        <Link to={`/product/${product._id}`}>
          <img width="100%" src={product.image} alt={product.name} />
        </Link>
      </div>
      <div className="productCard__Body">
        <h5 className="productCard__Name">
          <Link to={`/product/${product._id}`}>
            <strong>{product.name}</strong>
          </Link>
        </h5>
        <div className="productCard__rating">
          <RatingStars
            value={product.rating}
            text={`(${product.numReviews})`}
          />
        </div>
        <h3>{product.price}</h3>
      </div>
    </div>
    // <Card className="my-3 p-1 rounded">
    //   <Link to={`/product/${product._id}`}>
    //     <Card.Img src={product.image} variant="top" />
    //   </Link>
    //   <Card.Body>
    //     <Link to={`/product/${product._id}`}>
    //       <Card.Title as="h5">
    //         <strong>{product.name}</strong>
    //       </Card.Title>
    //     </Link>
    //     <Card.Text as="div">
    //       <div className="my-3">
    //         <RatingStars
    //           value={product.rating}
    //           text={`(${product.numReviews})`}
    //         />
    //       </div>
    //     </Card.Text>
    //     <Card.Text as="h3">${product.price}</Card.Text>
    //   </Card.Body>
    // </Card>
  );
};

export default ProductCard;
