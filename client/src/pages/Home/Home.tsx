import React from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer';
import Yap from '../../components/yap/Yap';

const Home = () => {
  return (
    <>
      <Navbar />
        <Yap />
      <Footer />
    </>
  )
}

export default Home