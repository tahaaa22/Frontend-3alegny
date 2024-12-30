import React from "react";
import {Image} from "@nextui-org/react";

const Rating = ({ rtg }) => {
    
    const filledStars = Math.min(rtg, 5);
    const emptyStars = 5 - filledStars;
  
    return (
      <div className="flex gap-1">
        {[...Array(filledStars)].map((_, index) => (
          <Image
            key={`filled-${index}`}
            width={20}
            alt="Filled Star"
            src="./public/star.png"
          />
        ))}
  
        {[...Array(emptyStars)].map((_, index) => (
          <Image
            key={`empty-${index}`}
            width={20}
            alt="Empty Star"
            src="./public/emptystar.jpg"
          />
        ))}
      </div>
    );
  };
  
  export default Rating;