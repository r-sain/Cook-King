import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/recipeSlice";
import "./saved.css";
import salad from "../images/salad.png";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import SavedModal from "./components/SavedModal";
import RecipeModal from "./components/RecipeModal";

const Saved = () => {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.recipe);

  const handleRemove = (recipeId) => {
    dispatch(remove(recipeId));
  };

  return (
    <div className="saved">
      <h1>Saved Recipes</h1>
      {items.length ? (
        <div className="savedCards">
          
          {items.map((item, i) => (
            <div className="savedCard" key={i}>
              <div className="saveIcon">
                <AiFillCloseCircle
                  size="20px"
                  color="#cbcbcb"
                  onClick={() => handleRemove(item.calories)}
                />
              </div>
              <div className="saveImg">
              <img src={item.image} alt="food" onError={(e) => e.target.src = salad} />
              </div>
              <div className="saveText" onClick={() => setOpenModalIndex(i)}>
                
                <div className="ct">
                  <h2>{item.label}</h2>
                </div>
                <div className="st">
                  <p>{item.ingredients.length} Ingredients</p>
                  <p>{Math.round(item.calories)} Calories</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="placeSave">
          <div className="place">
            <img src={salad} alt="salad" />
            <h3 style={{ opacity: "50%" }}>Add some recipes...</h3>
          </div>
        </div>
      )}
      <div id="recipeModalContainer">
    {/* Render RecipeModal here */}
    {items.map((item, i) => (
      <RecipeModal
        showSave={false}
        key={i}
        recipeObj={item}
        open={openModalIndex === i}
        onClose={() => setOpenModalIndex(null)}
      />
    ))}
  </div>
    </div>
  );
};

export default Saved;
