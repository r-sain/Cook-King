import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import salad from '../../images/salad.png';
import './popular.css';

function Popular({ selectedItem }) {
  var popularSearchText = '';
  if (selectedItem === 'Breakfast') {
    popularSearchText = 'breakfast';
  } else if (selectedItem === 'Lunch' || selectedItem === 'Dinner') {
    popularSearchText = 'lunch';
  }

  const [loading, setLoading] = useState(true);
  const [popularList, setPopularList] = useState([]);

  const APP_ID = '72967ca7';
  const APP_KEY = '09ed96020bd1e53ec23ef3afcf24ed50';
  console.log('object', selectedItem);

  const fetchRecipe = async (searchString, randomNum, randomNum2) => {
    setLoading(true);
    const response = await Axios.get(
      `https://api.edamam.com/search?q="food"&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=${searchString}&from=${randomNum}&to=${randomNum2}`
    );
    const allFoods = response.data.hits;
    const nonDessertFoods = allFoods.filter(food => {
      // Replace 'dessert' with other keywords or conditions that indicate desserts
      return !food.recipe.dishType.includes('desserts');
    });
    setPopularList(nonDessertFoods);
    setLoading(false);
    console.log(response.data.hits);
  };

  console.log('load', loading);
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 91);
    const randomNum2 = randomNum + 10;
    fetchRecipe(popularSearchText, randomNum, randomNum2);
  }, [selectedItem]);

  const handleImageError = index => {
    // Set a placeholder image when an image fails to load
    const newData = [...popularList];
    newData[index].recipe.image = salad;
    setPopularList(newData);
  };

  return (
    <div id="popular">
      {loading ? (
        <div className="pop_load">Loading...</div>
      ) : (
        <>
          {popularList.map((item, index) => (
            <div
              key={item.calories}
              className="pop_cards"
              onClick={() => window.open(item.recipe.url)}
            >
              <div className="pop_title">
                {item.recipe.label.length > 100
                  ? item.recipe.label.slice(0, 100) + '...'
                  : item.recipe.label}
              </div>
              <div className="pop_img">
                <img
                  src={item.recipe.image}
                  alt="Recipe"
                  onError={() => handleImageError(index)}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Popular;
