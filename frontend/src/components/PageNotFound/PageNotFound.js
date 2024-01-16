import React from "react";
import { Navigate } from "react-router-dom";

const PageNotFound = (props) => {
  return !props.loggedIn && <Navigate to="/signin" replace />;
};

export default PageNotFound;
