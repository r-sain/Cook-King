import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./signupmodal.css";
import { IoCloseCircle } from "react-icons/io5";

function SignupModal({ open, onClose }) {
  const [isToggle, SetIsToggle] = useState("login");
  console.log(isToggle);
  if (!open) return null;
  else
    return (
      <div className="overlay">
        <div className="modalContainer">
          <span className="modalClose" onClick={onClose}>
            <IoCloseCircle size={30} />
          </span>
          <div className="modalOptions">
            <div className="leftModal">
              <p
                className={
                  "options " +
                  (isToggle == "signup" ? "signup active" : "login ")
                }
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  SetIsToggle("signup");
                }}
              >
                Sign Up
              </p>
            </div>
            <div className="rightModal">
              <p
                className={
                  "options " + (isToggle == "login" ? "login active" : "signup")
                }
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  SetIsToggle("login");
                }}
              >
                Login
              </p>
            </div>
          </div>
          <div className="modalContent">
            {isToggle === "signup" && <SignUp />}

            <Login />
          </div>
        </div>
      </div>
    );
}

export default SignupModal;
