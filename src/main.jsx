import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'
import TokenProvider from './Context/TokenConext.jsx'

createRoot(document.getElementById('root')).render(
<TokenProvider>
    <App />
  </TokenProvider>
  
)
