import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AppRouter from "./routes";
 import './App.css';

const CustomNavLink = ({ to, ...props }) => {
  let activeStyle = {
    textDecoration: "underline",
    color: "white",
    transition: "all 4s",
  };

  return (
    <NavLink
      style={({ isActive }) =>
        isActive ? activeStyle : { textDecoration: "none" }
      }
      to={to}
      end
      {...props}
    />
  );
};

function Layout() {
  return (
      <nav className="navbar">
    <h1 className="logo">Welcome to our Router Test App</h1>
     <h4 className="second">SECOND SEMESTER EXAM: IMPLEMENTING GITHUB API</h4>
     <CustomNavLink to="/">Home</CustomNavLink>{" "}
      
      <CustomNavLink to="/repos">Repos</CustomNavLink>{" "}
      <CustomNavLink to="/error">Error</CustomNavLink>
      {/* <CustomNavLink to="/items/new">New Item</CustomNavLink> */}
   </nav>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="App">
      {/* layout */}
      <Layout />

      {/* routes in our App */}
      <AppRouter />
    </div>
  );
}

export default App;

