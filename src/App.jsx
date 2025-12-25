import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarField from './StarField'
import GiftReveal from './GiftReveal'
import './App.css'

function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [backgroundStars, setBackgroundStars] = useState([])
  const [shootingStars, setShootingStars] = useState([])

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

  // Generiere Sternschnuppen
  useEffect(() => {
    const createShootingStar = () => {
      const id = Math.random()
      const newStar = {
        id,
        top: `${Math.random() * 50}%`,
        left: `${Math.random() * 100}%`,
        duration: `${1.5 + Math.random() * 1}s`,
      }
      setShootingStars(prev => [...prev, newStar])

      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== id))
      }, 3000)
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        createShootingStar()
      }
    }, 3000)

    return () => clearInterval(interval)
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

      {/* Sternschnuppen */}
      <div className="shooting-stars">
        {shootingStars.map(star => (
          <div
            key={star.id}
            className="shooting-star"
            style={{
              left: star.left,
              top: star.top,
              '--shoot-duration': star.duration,
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
