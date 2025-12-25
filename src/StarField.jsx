import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Kassiopeia Sternbild (W-Form, nach links gedreht = M-Form)
// Ziel-Positionen für die 5 Sterne in M-Form (nach links gedrehtes W)
// Positionen in Prozent (basierend auf 800x600 Design)
const TARGET_POSITIONS = [
  { x: 18.75, y: 50 },    // Links unten (150/800, 300/600)
  { x: 31.25, y: 25 },    // Links oben (250/800, 150/600)
  { x: 43.75, y: 41.67 }, // Mitte (350/800, 250/600)
  { x: 56.25, y: 25 },    // Rechts oben (450/800, 150/600)
  { x: 68.75, y: 50 },    // Rechts unten (550/800, 300/600)
]

const TOLERANCE = 8 // Prozent-Toleranz für "richtige" Position

function StarField({ onUnlock }) {
  // Start-Positionen in Prozent (basierend auf 800x600 Design)
  const [stars, setStars] = useState([
    { id: 1, x: 12.5, y: 16.67 },   // 100/800, 100/600
    { id: 2, x: 75, y: 25 },        // 600/800, 150/600
    { id: 3, x: 25, y: 75 },        // 200/800, 450/600
    { id: 4, x: 62.5, y: 66.67 },   // 500/800, 400/600
    { id: 5, x: 43.75, y: 83.33 },  // 350/800, 500/600
  ])

  const containerRef = useRef(null)

  const handleDrag = (id, event, info) => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const deltaXPercent = (info.delta.x / containerRect.width) * 100
    const deltaYPercent = (info.delta.y / containerRect.height) * 100

    const newStars = stars.map(star => {
      if (star.id === id) {
        return {
          ...star,
          x: Math.max(0, Math.min(100, star.x + deltaXPercent)),
          y: Math.max(0, Math.min(100, star.y + deltaYPercent)),
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
      // Berechne Distanz in Prozent
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
              left: `${pos.x}%`,
              top: `${pos.y}%`,
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
              left: `${star.x}%`,
              top: `${star.y}%`,
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
