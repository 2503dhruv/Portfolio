import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Resume from '../components/Resume';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <About />
      <Portfolio />
      <Resume />
      <Contact />
    </>
  );
};

export default Home;
