import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

// Kassiopeia Sternbild als W-Form
const TARGET_POSITIONS = [
  { x: 0.12, y: 0.35 },
  { x: 0.28, y: 0.65 },
  { x: 0.50, y: 0.40 },
  { x: 0.72, y: 0.65 },
  { x: 0.88, y: 0.35 },
]

const TOLERANCE = 50

// Einzelner Stern mit eigenem Motion State
function DraggableStar({ id, initialX, initialY, containerRef, onPositionChange, index }) {
  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)

  useEffect(() => {
    x.set(initialX)
    y.set(initialY)
  }, [initialX, initialY, x, y])

  const handleDragEnd = () => {
    if (!containerRef.current) return

    const currentX = x.get()
    const currentY = y.get()
    const rect = containerRef.current.getBoundingClientRect()

    // Begrenzen auf Container
    const clampedX = Math.max(12, Math.min(rect.width - 12, currentX))
    const clampedY = Math.max(12, Math.min(rect.height - 12, currentY))

    x.set(clampedX)
    y.set(clampedY)

    onPositionChange(id, clampedX, clampedY)
  }

  return (
    <motion.div
      className="draggable-star"
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={handleDragEnd}
      style={{
        x,
        y,
        position: 'absolute',
        left: -12,
        top: -12,
        '--delay': `${index * 0.2}s`,
      }}
      whileTap={{ scale: 1.2 }}
    >
      <svg viewBox="0 0 51 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25.5 0L31.3393 17.8607L50 18.9031L36.1803 30.3893L41.1574 48L25.5 37.5L9.84263 48L14.8197 30.3893L1 18.9031L19.6607 17.8607L25.5 0Z"
          fill={`url(#star-gradient-${id})`}
        />
        <defs>
          <linearGradient id={`star-gradient-${id}`} x1="0" y1="0" x2="50" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffd89b" />
            <stop offset="0.5" stopColor="#fff5e1" />
            <stop offset="1" stopColor="#ff6b9d" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

function StarField({ onUnlock }) {
  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [stars, setStars] = useState([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: rect.height })

        if (!initialized && rect.width > 0) {
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

  const handlePositionChange = (id, newX, newY) => {
    const newStars = stars.map(star =>
      star.id === id ? { ...star, x: newX, y: newY } : star
    )
    setStars(newStars)
    checkConstellation(newStars)
  }

  const checkConstellation = (currentStars) => {
    const targets = TARGET_POSITIONS.map(pos => ({
      x: pos.x * containerSize.width,
      y: pos.y * containerSize.height,
    }))

    const sortedStars = [...currentStars].sort((a, b) => a.x - b.x)
    let correctCount = 0

    sortedStars.forEach((star, index) => {
      const target = targets[index]
      if (!target) return
      const distance = Math.sqrt(
        Math.pow(star.x - target.x, 2) + Math.pow(star.y - target.y, 2)
      )
      if (distance < TOLERANCE) correctCount++
    })

    if (correctCount === 5) onUnlock()
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

      <div className="constellation-area" ref={containerRef}>
        {/* Ziel-Sterne (subtil, nicht flackernd) */}
        {initialized && TARGET_POSITIONS.map((pos, i) => (
          <div
            key={`target-${i}`}
            className="target-star"
            style={{
              left: `${pos.x * 100}%`,
              top: `${pos.y * 100}%`,
            }}
          />
        ))}

        {initialized && stars.map((star, index) => (
          <DraggableStar
            key={star.id}
            id={star.id}
            initialX={star.x}
            initialY={star.y}
            containerRef={containerRef}
            onPositionChange={handlePositionChange}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default StarField
