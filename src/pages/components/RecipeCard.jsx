import React, { useState } from "react";
import "./recipe.css";
import RecipeModal from "./RecipeModal";
import salad from '../../images/salad.png';

const RecipeCard = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  console.log("props", props);
  const { recipeObj } = props;

  const handleImageError = (event) => {
    if (event.target.src === recipeObj.image) {
      // Set the placeholder image source if the original image fails to load
      event.target.src = salad;
    } 
  };

  return (
    <>
      <RecipeModal
      showSave={true}
        recipeObj={recipeObj}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <div className="recipe">
        <div className="recipeImg">
         { <img
            className="recipeImg"
            src={recipeObj.image}
            onClick={() => setOpenModal(true)}
            alt="recipeImg"
            onError={handleImageError} // Handle the image loading error
          />}
        </div>
        <div className="recipeLabel">
          <span>{truncateText(recipeObj.label, 40)}</span>
        </div>
        
      </div>
    </>
  );
};

export default RecipeCard;
