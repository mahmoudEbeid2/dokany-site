import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SupportSection from './Components/SupportCard/SupportSection'
import ReviewsSection from './Components/ReviewSection/ReviewsSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SupportSection/>
      <ReviewsSection/>
    </>
  )
}

export default App
