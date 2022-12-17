import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import MainPage from "./pages/MainPage";
import ShoppingPage from "./pages/ShoppingPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  const { getUser, user } = useAuth();
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        exact
        index
        path="/main"
        element={user ? <MainPage /> : <Navigate to={"/login"} />}
      />
      <Route
        exact
        path="/login"
        element={user ? <Navigate to="/main" /> : <SigninPage />}
      />
      <Route
        exact
        path="/signup"
        element={user ? <Navigate to="/main" /> : <SignupPage />}
      />
      <Route path="/shop/:name/:id" exact element={<ShoppingPage />} />
    </Routes>
  );
};

export default App;
