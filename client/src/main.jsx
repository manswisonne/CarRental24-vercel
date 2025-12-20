import { createRoot } from 'react-dom/client'
import React from 'react'                    // ← ADD THIS
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { MotionConfig } from 'motion/react'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <MotionConfig viewport={{once: true}}>
             <App />
        </MotionConfig>
     
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
)


