import React, { useState } from 'react';
import { Rating } from '@mui/material';   // Import Material-UI Rating component (optional)

const StarReview = () => {
  const [rating, setRating] = useState(0);   // State to store the user's rating

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <Rating value={rating} precision={0.5} onChange={handleRatingChange} />   {/* Use Material-UI Rating component for stars */}
    </div>
  );
};

export default StarReview;
