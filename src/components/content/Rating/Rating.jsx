import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.css";

export const Rating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div className="app flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label className="">
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
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
