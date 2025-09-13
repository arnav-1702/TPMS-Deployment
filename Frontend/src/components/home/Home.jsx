import React from 'react'

import Page1 from './page1.jsx'
import Page2 from './page2.jsx'
import Footer from './Footer.jsx'

import Page3 from './Page3.jsx'
import Navbar from "@/components/home/Navbar";


export const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Page1></Page1>
      <Page2></Page2>
   
      <Page3></Page3>
         <Footer></Footer>
    </div>
  )
}


