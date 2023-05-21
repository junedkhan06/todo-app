import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../src/main";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../src/main";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async (e) => {
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
