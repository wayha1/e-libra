import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.css";

export const Rating = ({ onRatingChange, reset }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (reset) {
      setRating(null);
      setHover(null);
    }
  }, [reset]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className="app flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label className="" key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => handleRatingChange(currentRating)}
            />
            <FaStar
              size={30}
              className="star text-white"
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            ></FaStar>
          </label>
        );
      })}
    </div>
  );
};
