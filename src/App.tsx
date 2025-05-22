//import { useState } from 'react'
import './App.css'
//import Almacen from "@/Store/AlmacenHome"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import Shopping from "@/shopping/HomeShopping"
import Almacen from "@/Store/AlmacenHome"

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div>
      <Shopping />
    </div>
  )
}

export default App
