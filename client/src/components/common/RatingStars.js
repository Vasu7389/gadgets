import React from "react";
import PropTypes from "prop-types";

const getStarsByRating = (value) => {
  const stars = [
    <i className="far fa-star" />,
    <i className="far fa-star" />,
    <i className="far fa-star" />,
    <i className="far fa-star" />,
    <i className="far fa-star" />,
  ];

  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(value)) {
      stars[i] = <i className="fas fa-star" style={{ color: "#3ccabb" }} />;
    } else if (Number.isInteger(value)) {
      stars[i] = (
        <i className="fas fa-star-half-alt" style={{ color: "#3ccabb" }} />
      );
      break;
    }
  }
  return stars;
};

function RatingStars({ value = 0, text }) {
  const stars = [...getStarsByRating(value)];

  return (
    <span>
      {stars.map((star, index) => (
        <span key={(star, index)}>{star}</span>
      ))}
      {text}
    </span>
  );
}

RatingStars.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default RatingStars;
