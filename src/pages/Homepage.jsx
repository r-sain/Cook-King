import React, { useState } from 'react';
import Axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Saved from './Saved';
import Profile from './Profile';
import RecipeCard from './components/RecipeCard';
import { AiFillHome } from 'react-icons/ai';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import './homePage.css';
import Footer from './components/Footer';
import salad from '../images/salad.png';
import Popular from './components/Popular';

function Homepage() {
  const [timeoutId, SetTimeoutId] = useState();
  const [recipeList, SetRecipeList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = event => {
    const clickedItemValue = event.target.textContent;
    if (selectedItem === clickedItemValue) {
      setSelectedItem(null); // Set to null if clicked again
    } else {
      setSelectedItem(clickedItemValue);
    }
  };
  console.log('selected', selectedItem);

  const APP_ID = '72967ca7';
  const APP_KEY = '09ed96020bd1e53ec23ef3afcf24ed50';

  const fetchRecipe = async searchString => {
    const randomNum = Math.floor(Math.random() * 91);
    const randomNum2 = randomNum + 10;
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${randomNum}&to=${randomNum2}`
    );
    SetRecipeList(response.data.hits);
    console.log(response.data.hits);
  };

  const onTextChange = e => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(e.target.value), 800);
    SetTimeoutId(timeout);
  };
  console.log(selectedItem)
  return (
    <div className="homePage">
      <div className="hpHead">
        <h1 className="hph1">Find the Best recipes for cooking</h1>
        <input
          className="hpSearch"
          type="search"
          placeholder="🔍search recipes"
          onChange={onTextChange}
        />
      </div>
      {/* ************************* */}
      <div className="hpTrending">
        <h2 className="hph2">Your Recipes</h2>
        <div className="trendingRecipes">
          {recipeList.length ? (
            recipeList.map((recipeObj) => (
              <RecipeCard recipeObj={recipeObj.recipe} />
            ))
          ) : (
            <div className="place">
              <img src={salad} alt="salad" />
              <h5 style={{ opacity: '50%' }}>Search for some recipes...</h5>
            </div>
          )}
        </div>
      </div>
      <div className="hpPopular">
        <div className="popularCategory">
          <h3 style={{color:"rgb(60, 60, 60)"}}>Popular Categories </h3>
          <ul className="popularList">
            <li
              onClick={handleItemClick}
              className={
                selectedItem === 'Breakfast'
                  ? 'pop_list_item selected'
                  : 'pop_list_item'
              }
            >
              Breakfast
            </li>
            <li
              onClick={handleItemClick}
              className={
                selectedItem === 'Lunch'
                  ? 'pop_list_item selected'
                  : 'pop_list_item'
              }
            >
              Lunch
            </li>
            <li
              onClick={handleItemClick}
              className={
                selectedItem === 'Dinner'
                  ? 'pop_list_item selected'
                  : 'pop_list_item'
              }
            >
              Dinner
            </li>
          </ul>
          <div className="popularCardContainer">
            {selectedItem ? (
             
              <Popular selectedItem={selectedItem} />
            ) : (
              <p>Select A Category</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
