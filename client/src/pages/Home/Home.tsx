import React, { useContext } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Yap from "../../components/yap/Yap";
import "./Home.css";
import { authContext } from "../../context/authContext";

const Home = () => {
  const { currentUser } = useContext(authContext) || {};
  
  return (
    <>
      <Navbar />
      {currentUser && (
          <div className="yap-list">
            <Yap profileUserId={currentUser} />
          </div>
        )}
      <Footer />
    </>
  );
};

export default Home;
