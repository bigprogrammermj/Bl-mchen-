import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarField from './StarField'
import GiftReveal from './GiftReveal'
import './App.css'

function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
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
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setUnlocked(true)
    }, 2000)
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

      {/* Success Message beim Entsperren */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1 }}
          >
            ✨ Die Sterne haben sich ausgerichtet ✨
          </motion.div>
        )}
      </AnimatePresence>

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
