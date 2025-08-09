import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/home/Navbar';
import Footer from './components/home/Footer';


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;