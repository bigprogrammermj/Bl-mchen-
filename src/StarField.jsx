import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

// Kassiopeia Sternbild (W-Form, nach links gedreht = M-Form)
// Ziel-Positionen für die 5 Sterne in M-Form (nach links gedrehtes W)
const TARGET_POSITIONS = [
  { x: 150, y: 300 },  // Links unten
  { x: 250, y: 150 },  // Links oben
  { x: 350, y: 250 },  // Mitte
  { x: 450, y: 150 },  // Rechts oben
  { x: 550, y: 300 },  // Rechts unten
]

const TOLERANCE = 60 // Pixel-Toleranz für "richtige" Position

function StarField({ onUnlock }) {
  const [stars, setStars] = useState([
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 600, y: 150 },
    { id: 3, x: 200, y: 450 },
    { id: 4, x: 500, y: 400 },
    { id: 5, x: 350, y: 500 },
  ])

  const containerRef = useRef(null)

  const handleDrag = (id, event, info) => {
    const newStars = stars.map(star => {
      if (star.id === id) {
        return {
          ...star,
          x: star.x + info.delta.x,
          y: star.y + info.delta.y,
        }
      }
      return star
    })
    setStars(newStars)

    // Prüfe ob alle Sterne in der richtigen Kassiopeia-Formation sind
    checkConstellation(newStars)
  }

  const checkConstellation = (currentStars) => {
    // Sortiere Sterne nach X-Position für konsistente Zuordnung
    const sortedStars = [...currentStars].sort((a, b) => a.x - b.x)

    let correctCount = 0

    sortedStars.forEach((star, index) => {
      const target = TARGET_POSITIONS[index]
      const distance = Math.sqrt(
        Math.pow(star.x - target.x, 2) + Math.pow(star.y - target.y, 2)
      )

      if (distance < TOLERANCE) {
        correctCount++
      }
    })

    // Wenn alle 5 Sterne korrekt positioniert sind
    if (correctCount === 5) {
      onUnlock()
    }
  }

  return (
    <motion.div
      className="star-field"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="star-field-title">
        Für die Liebe meines Lebens
      </h1>
      <p className="star-field-instruction">
        Ordne die Sterne zu unserem Sternbild ✨
      </p>

      <div className="constellation-area" ref={containerRef}>
        {/* Ziel-Positionen als Hinweise (optional dezent) */}
        {TARGET_POSITIONS.map((pos, i) => (
          <div
            key={`target-${i}`}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(255, 216, 155, 0.2)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Draggable Sterne */}
        {stars.map((star, index) => (
          <motion.div
            key={star.id}
            className="draggable-star"
            drag
            dragMomentum={false}
            onDrag={(e, info) => handleDrag(star.id, e, info)}
            style={{
              left: star.x,
              top: star.y,
              transform: 'translate(-50%, -50%)',
              '--delay': `${index * 0.2}s`,
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg viewBox="0 0 51 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M25.5 0L31.3393 17.8607L50 18.9031L36.1803 30.3893L41.1574 48L25.5 37.5L9.84263 48L14.8197 30.3893L1 18.9031L19.6607 17.8607L25.5 0Z"
                fill="url(#star-gradient)"
              />
              <defs>
                <linearGradient id="star-gradient" x1="0" y1="0" x2="50" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffd89b" />
                  <stop offset="0.5" stopColor="#fff5e1" />
                  <stop offset="1" stopColor="#ff6b9d" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default StarField
