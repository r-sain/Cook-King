import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import SignupLogin from "./pages/SignupLogin";
import Welcome from "./pages/Welcome";
import Homepage from "./pages/Homepage";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import Profile from "./pages/Profile";
import Saved from "./pages/Saved";
import Footer from "./pages/components/Footer";

function App() {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/signup" element={<SignupLogin />} />
              <Route
                path="/homepage"
                element={
                  <ProtectedRoute>
                    <Homepage />
                    <Footer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/homepage/profile"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Profile />
                    <Footer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/homepage/saved"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Saved />
                    <Footer />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </div>
      </Provider>
    </AuthContextProvider>
  );
}

export default App;
