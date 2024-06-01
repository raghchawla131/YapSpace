import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Yap from "../../components/yap/Yap";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="yap-list">
        <Yap />
      </div>
      <Footer />
    </>
  );
};

export default Home;
