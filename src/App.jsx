import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarField from './StarField'
import GiftReveal from './GiftReveal'
import './App.css'

function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [backgroundStars, setBackgroundStars] = useState([])

  // Generiere funkelnde Hintergrund-Sterne
  useEffect(() => {
    const stars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 4}s`,
      delay: `${Math.random() * 5}s`,
      opacity: 0.3 + Math.random() * 0.7,
    }))
    setBackgroundStars(stars)
  }, [])

  const handleUnlock = () => {
    setUnlocked(true)
  }

  return (
    <div className="app">
      {/* Funkelnde Hintergrund-Sterne */}
      <div className="background-stars">
        {backgroundStars.map(star => (
          <div
            key={star.id}
            className="bg-star"
            style={{
              left: star.left,
              top: star.top,
              '--duration': star.duration,
              '--delay': star.delay,
              '--opacity': star.opacity,
            }}
          />
        ))}
      </div>

      {/* Haupt-Content */}
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <StarField key="starfield" onUnlock={handleUnlock} />
        ) : (
          <GiftReveal key="gift" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
