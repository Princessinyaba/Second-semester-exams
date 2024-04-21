import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Import lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const SingleRepo = lazy(() => import("./pages/SingleRepo"));
const Repos = lazy(() => import("./pages/Repo"));
const ErrorPage = lazy(() => import("./pages/ErrorPage")); // Renamed to avoid conflict with the Error component

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/repos" element={<Repos />}>
      <Route path=":repoName" element={<SingleRepo />} />
    </Route>
    <Route path="*" element={<ErrorPage />} />{" "}
    {/* Route for handling 404 errors */}
  </Routes>
);

export default AppRouter;
