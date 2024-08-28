import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AOS from 'aos'

import './style/output.css'
import 'react-multi-carousel/lib/styles.css'
import './style/custom.css'
import 'aos/dist/aos.css'

AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
