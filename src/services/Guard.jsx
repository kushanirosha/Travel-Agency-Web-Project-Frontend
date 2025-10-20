import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";


export const PublicRoute = ({ element: Component }) => {
  return ApiService.isAuthenticated() ? (
    <Navigate to="/dashboard" replace />
  ) : (
    Component
  );
};

