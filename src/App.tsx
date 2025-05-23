//import { useState } from 'react'
import './index.css'
import Layout from './Layout.tsx'

import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  return (  
      <div className="p-0 m-0 min-h-screen min-w-screen" style={{backgroundColor: '#E6E6FC'}}>
        <Layout>
          <div></div>
          </Layout>
      </div>
  )
}

export default App


