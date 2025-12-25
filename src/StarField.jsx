import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Kassiopeia Sternbild (W-Form, nach links gedreht = M-Form)
// Ziel-Positionen für die 5 Sterne in M-Form (nach links gedrehtes W)
// Positionen in Prozent - sicher innerhalb des Containers (25-75% horizontal, 35-65% vertikal)
const TARGET_POSITIONS = [
  { x: 25, y: 55 },    // Links unten
  { x: 37.5, y: 35 },  // Links oben
  { x: 50, y: 45 },    // Mitte
  { x: 62.5, y: 35 },  // Rechts oben
  { x: 75, y: 55 },    // Rechts unten
]

const TOLERANCE = 15 // Prozent-Toleranz für "richtige" Position (großzügig für mobile Geräte)

function StarField({ onUnlock }) {
  // Start-Positionen in Prozent - gut verteilt innerhalb des Kastens
  const [stars, setStars] = useState([
    { id: 1, x: 30, y: 40 },   // Links mitte
    { id: 2, x: 70, y: 40 },   // Rechts mitte
    { id: 3, x: 40, y: 60 },   // Links unten
    { id: 4, x: 60, y: 60 },   // Rechts unten
    { id: 5, x: 50, y: 50 },   // Zentrum
  ])

  const containerRef = useRef(null)

  const handleDrag = (id, event, info) => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const deltaXPercent = (info.delta.x / containerRect.width) * 100
    const deltaYPercent = (info.delta.y / containerRect.height) * 100

    const newStars = stars.map(star => {
      if (star.id === id) {
        // Begrenze auf 15-85% um Sterne sicher innerhalb des Kastens zu halten
        return {
          ...star,
          x: Math.max(15, Math.min(85, star.x + deltaXPercent)),
          y: Math.max(15, Math.min(85, star.y + deltaYPercent)),
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
    const distances = []

    sortedStars.forEach((star, index) => {
      const target = TARGET_POSITIONS[index]
      // Berechne Distanz in Prozent
      const distance = Math.sqrt(
        Math.pow(star.x - target.x, 2) + Math.pow(star.y - target.y, 2)
      )

      distances.push({ id: star.id, distance: distance.toFixed(2), correct: distance < TOLERANCE })

      if (distance < TOLERANCE) {
        correctCount++
      }
    })

    // Debug: Zeige Fortschritt in der Konsole
    console.log(`Korrekte Sterne: ${correctCount}/5`, distances)

    // Wenn alle 5 Sterne korrekt positioniert sind
    if (correctCount === 5) {
      console.log('🎉 Konstellation komplett! Entsperre Geschenk...')
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
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'rgba(255, 216, 155, 0.3)',
              boxShadow: '0 0 10px rgba(255, 216, 155, 0.4)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
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
