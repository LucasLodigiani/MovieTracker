import React from 'react';
import Review from './Review';

const ReviewsContainer = ({ reviews }) => {
  return (
    <div className="w-1/2">
      {reviews.map((review) => (
        <Review key={review.id} 
          id={review.id}
          userName={review.userName}
          title={review.title}
          role={review.role}
          rate={review.rate}
          content={review.content}></Review>
        ))}
    </div>
  );
};

export default ReviewsContainer;