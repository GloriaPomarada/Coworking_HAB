import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
  const starCount = 5; // Número total de estrellas
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(starCount)].map((_, index) => (
        <span key={index}>
          {index < filledStars ? (
            <FaStar className="text-yellow-500" />
          ) : index === filledStars && hasHalfStar ? (
            <FaStarHalfAlt className="text-yellow-500" />
          ) : (
            <FaRegStar className="text-gray-300" />
          )}
        </span>
      ))}
    </div>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default RatingStars;
