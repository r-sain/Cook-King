import React, { useState } from "react";
import signup1 from "../images/signup1.png";
import "./signup.css";
import SignupModal from "./SignupModal";

function SignupLogin() {
  const [openModal, SetOpenModal] = useState(false);

  return (
    <div>
      <div className="signupLogin">
        <div className="signupImg">
          {/* <img src={signup2} alt="banner" /> */}
          <img src={signup1} alt="signup img" />
        </div>
        <div className="signupText">
          <h2 className="signuph2">Find amazing recipes</h2>
          <p className="signupP">Bring you favourite restaurant at home</p>
          <button className="signupBtn" onClick={() => SetOpenModal(true)}>
            Sign Up / Login
          </button>
          <SignupModal open={openModal} onClose={() => SetOpenModal(false)} />
        </div>
      </div>
    </div>
  );
}

export default SignupLogin;
