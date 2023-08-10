import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import './profile.css';
import { HiOutlineLogout } from 'react-icons/hi';
import { UserAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ProfileImageUpload from '../pages/components/ProfileImageUpload ';
import userImg from '../images/user.png';
import Axios from 'axios';
import salad from '../../src/images/salad.png';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [showImgOptions, setShowImgOptions] = useState(false);
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const [savedRecipesCount, setSavedRecipesCount] = useState(0);

  useEffect(() => {
    // Retrieve saved recipes from local storage
    const savedRecipes = JSON.parse(localStorage.getItem('reduxState')) || [];

    // Set the count of saved recipes
    setSavedRecipesCount(savedRecipes?.recipe?.length);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      navigate('/');
      console.log('Logged Out');
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    // Retrieve the profile image URL from local storage
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleImageUpload = file => {
    // Perform image upload logic here (e.g., to a server)
    // For demonstration purposes, we'll store the image data in local storage
    const reader = new FileReader();
    reader.onload = event => {
      const imageData = event.target.result;
      localStorage.setItem('profileImage', imageData);
      setProfileImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    localStorage.removeItem('profileImage');
    localStorage.removeItem('reduxState');
    setProfileImage(null);
  };

  // ***************************************
  const [popularList, setPopularList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const APP_ID = '72967ca7';
  const APP_KEY = '09ed96020bd1e53ec23ef3afcf24ed50';

  useEffect(() => {
    fetchPopularRecipes();
  }, []);

  const fetchPopularRecipes = async () => {
    const randomNum = Math.floor(Math.random() * 91);
    const randomNum2 = randomNum + 4;
    try {
      const response = await Axios.get(
        `https://api.edamam.com/search?q=food&app_id=${APP_ID}&app_key=${APP_KEY}&from=${randomNum}&to=${randomNum2}`
      );
      const allFoods = response.data.hits;

      setPopularList(allFoods);
    } catch (error) {
      console.error('Error fetching popular recipes:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === popularList.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [popularList]);

  const handleImageError = index => {
    // Set a placeholder image when an image fails to load
    const newData = [...popularList];
    newData[index].recipe.image = salad;
    setPopularList(newData);
  };

  return (
    <div id="ProfilePage">
      <div className="head">
        <h2>My Profile</h2>
        <div onClick={handleLogout}>
          <HiOutlineLogout color="#E23E3E" size={30} />
        </div>
      </div>

      <div className="body">
        <div className="imageOptions">
          <div className="imageOp">
            <div className="image">
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <img src={userImg} alt="ProfilePhoto" />
              )}{' '}
              <div
                className="menu"
                onClick={() => setShowImgOptions(!showImgOptions)}
              >
                {!showImgOptions ? 'Edit image' : 'Done'}
              </div>
            </div>
          </div>
          <div className="btn">
            {showImgOptions && (
              <>
                {' '}
                <ProfileImageUpload onImageUpload={handleImageUpload} />
                <button onClick={handleRemoveImage}>Remove Photo</button>
              </>
            )}
          </div>
        </div>

        <div className="text">
          <div id="div1">
            <h2>{userName}</h2>
            <p>{userEmail}</p>
          </div>
          <div id="div2">
            <h3>Saved</h3>
            <p style={{ fontSize: '20px', fontWeight: '500' }}>
              {savedRecipesCount}
            </p>
          </div>
        </div>
        <div className="carousel-text">Food Photos</div>
        <div className="carousel">
          {popularList.map((recipe, index) => (
            <div key={index} className="imageDisp">
              <img
                id="carousalImg"
                src={recipe.recipe.image}
                alt={recipe.recipe.label}
                onError={() => handleImageError(index)} // Handle image errors
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
