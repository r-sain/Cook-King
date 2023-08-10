import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import './recipe.css';
import { add, remove } from '../../store/recipeSlice';
import { useDispatch, useSelector } from 'react-redux';
import salad from '../../images/salad.png';

const RecipeModal = props => {
  const dispatch = useDispatch();
  const { open, onClose, recipeObj } = props;

  const savedRecipes = useSelector(state => state.recipe);

  const isRecipeSaved = savedRecipes.some(
    savedRecipe => savedRecipe.calories === recipeObj.calories
  );

  const handleImageError = event => {
    if (event.target.src === recipeObj.image) {
      event.target.src = salad;
    }
  };

  const handleAdd = recipeObj => {
    dispatch(add(recipeObj));
  };

  const handleRemove = recipeCalories => {
    dispatch(remove(recipeCalories));
  };

  if (!open) return null;

  return (
    <div className="recipeOverlay">
      <div className="recipeModal">
        <div className="recipeModTop">
          <div className="recipemodalIcons">
            {isRecipeSaved ? (
              <BsBookmarkFill
                color="#E23E3E"
                size={25}
                onClick={() => handleRemove(recipeObj.calories)}
              />
            ) : (
              <BsBookmark
                color="#E23E3E"
                size={25}
                onClick={() => handleAdd(recipeObj)}
              />
            )}
            <span
              className="modalClose"
              onClick={() => {
                onClose();
              }}
            >
              <IoCloseCircleOutline color="#E23E3E" size={30} />
            </span>
          </div>
          <div className="recipeModTopOne">
            <img
              className="recipeImgModal"
              src={recipeObj.image}
              alt="recipeimg"
              onError={handleImageError}
            />
          </div>
        </div>
        <div className="recipeModBody">
          <div className="recipeTable">
            <div className="headerRow">
              <div className="headerCell">Ingredients</div>
              <div className="headerCell">Weight(gm)</div>
            </div>
            <div className="bodyRows">
              {recipeObj.ingredients.map((ingredientObj, index) => (
                <div className="bodyRow" key={index}>
                  <div className="bodyCell">{ingredientObj.text}</div>
                  <div className="bodyCell" id="greyTable">
                    {ingredientObj.weight.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="recipeModFoot">
          <button onClick={() => window.open(recipeObj.url)}>
            See complete recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
