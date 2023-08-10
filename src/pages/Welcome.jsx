import React from "react";
import "./welcome.css";
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

function Welcome() {
  const handleStartCooking = () => {
    // Reload the page
    window.location.reload();
    // After reloading, navigate to signup/login page
    window.location.href = "/signup"; // Replace with the appropriate route
  };
  return (
    <div className="welcomePage">
      <div className="wel">
        <div className="welcomeUp">
          <p
            className="welcomeP"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <AiFillStar />
            60k plus premium recipes
          </p>
        </div>
        <br></br>
        <div className="welcomeDown">
          <h1 className="welcomeh1">Let's get Cook King</h1>
          <p className="welcomeP">Find the best recipes for cooking</p>
            <button className="welcomeBtn" onClick={handleStartCooking}>
              Start Cooking <AiOutlineArrowRight />
            </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
