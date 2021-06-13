import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import RatingStars from "./common/RatingStars";

const ProductCard = ({ product }) => {
  return (
    <Card className="my-3 p-1 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="h5">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <RatingStars
              value={product.rating}
              text={`(${product.numReviews})`}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
