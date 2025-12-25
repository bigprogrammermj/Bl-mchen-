import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Kassiopeia Sternbild als W-Form (um 180° gedreht von M)
// Größere Werte für ein größeres Sternbild
const TARGET_POSITIONS = [
  { x: 0.12, y: 0.35 },   // Links oben
  { x: 0.28, y: 0.65 },   // Links unten
  { x: 0.50, y: 0.40 },   // Mitte oben
  { x: 0.72, y: 0.65 },   // Rechts unten
  { x: 0.88, y: 0.35 },   // Rechts oben
]

const TOLERANCE = 50 // Pixel-Toleranz für "richtige" Position

function StarField({ onUnlock }) {
  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  // Sterne mit relativen Startpositionen (werden später in Pixel umgerechnet)
  const [stars, setStars] = useState([
    { id: 1, x: 0, y: 0 },
    { id: 2, x: 0, y: 0 },
    { id: 3, x: 0, y: 0 },
    { id: 4, x: 0, y: 0 },
    { id: 5, x: 0, y: 0 },
  ])

  const [initialized, setInitialized] = useState(false)

  // Container-Größe messen und Sterne initial positionieren
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: rect.height })

        if (!initialized && rect.width > 0) {
          // Zufällige Startpositionen für die Sterne
          setStars([
            { id: 1, x: rect.width * 0.15, y: rect.height * 0.20 },
            { id: 2, x: rect.width * 0.85, y: rect.height * 0.15 },
            { id: 3, x: rect.width * 0.25, y: rect.height * 0.80 },
            { id: 4, x: rect.width * 0.75, y: rect.height * 0.75 },
            { id: 5, x: rect.width * 0.50, y: rect.height * 0.85 },
          ])
          setInitialized(true)
        }
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [initialized])

  // Berechne absolute Zielpositionen basierend auf Container-Größe
  const getAbsoluteTargets = () => {
    return TARGET_POSITIONS.map(pos => ({
      x: pos.x * containerSize.width,
      y: pos.y * containerSize.height,
    }))
  }

  const handleDragEnd = (id, event, info) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    // Berechne die finale Position relativ zum Container
    const pointerX = info.point.x - rect.left
    const pointerY = info.point.y - rect.top

    // Begrenzen auf Container
    const clampedX = Math.max(15, Math.min(rect.width - 15, pointerX))
    const clampedY = Math.max(15, Math.min(rect.height - 15, pointerY))

    const newStars = stars.map(star => {
      if (star.id === id) {
        return {
          ...star,
          x: clampedX,
          y: clampedY,
        }
      }
      return star
    })

    setStars(newStars)
    checkConstellation(newStars)
  }

  const checkConstellation = (currentStars) => {
    const targets = getAbsoluteTargets()

    // Sortiere Sterne nach X-Position für konsistente Zuordnung
    const sortedStars = [...currentStars].sort((a, b) => a.x - b.x)

    let correctCount = 0

    sortedStars.forEach((star, index) => {
      const target = targets[index]
      if (!target) return

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
        {/* Ziel-Positionen als dezente Hinweise */}
        {initialized && TARGET_POSITIONS.map((pos, i) => (
          <div
            key={`target-${i}`}
            className="target-hint"
            style={{
              left: `${pos.x * 100}%`,
              top: `${pos.y * 100}%`,
            }}
          />
        ))}

        {/* Draggable Sterne */}
        {initialized && stars.map((star, index) => (
          <motion.div
            key={star.id}
            className="draggable-star"
            drag
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(e, info) => handleDragEnd(star.id, e, info)}
            initial={false}
            animate={{
              x: star.x,
              y: star.y,
            }}
            transition={{ type: "tween", duration: 0 }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              '--delay': `${index * 0.2}s`,
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1.1 }}
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
