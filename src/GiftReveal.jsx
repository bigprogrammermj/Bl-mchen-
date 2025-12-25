import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function GiftReveal() {
  const [showContent, setShowContent] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      className="gift-reveal unlocked"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="gift-container">
        <AnimatePresence mode="wait">
          {!showContent ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '60vh',
                justifyContent: 'center'
              }}
            >
              <motion.h1
                className="gift-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Dein Geschenk wartet
              </motion.h1>
              <motion.button
                className="reveal-button"
                onClick={() => setShowContent(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Geschenk öffnen
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 className="gift-title" variants={itemVariants}>
                Dein magisches Geschenk
              </motion.h1>

              <motion.p className="gift-subtitle" variants={itemVariants}>
                Ein unvergessliches Abenteuer wartet auf uns
              </motion.p>

              <motion.div className="gift-card" variants={itemVariants}>
                <div className="gift-icon">🏰</div>

                <div className="gift-details">
                  <strong>Übernachtung in einem Schloss</strong>
                  <p>Romantische Suite mit königlichem Ambiente</p>

                  <div className="gift-icon">🕯️</div>
                  <p>Candlelight-Dinner mit exquisitem 3-Gänge-Menü</p>

                  <div className="gift-icon">♨️</div>
                  <p>Entspannung in der privaten Sauna</p>

                  <div className="gift-icon">☕</div>
                  <p>Verwöhn-Frühstück am nächsten Morgen</p>

                  <strong style={{ marginTop: '1.5rem' }}>
                    Gültig das ganze Jahr über – wann immer du bereit bist für unser Märchen
                  </strong>
                </div>
              </motion.div>

              <motion.div className="love-message" variants={itemVariants}>
                Ich liebe dich über alle Sterne hinaus. Du bist mein Universum,
                mein Kassiopeia am Nachthimmel, mein schönster Traum der wahr wurde.
                <br /><br />
                Für immer dein ✨
              </motion.div>

              {/* Video Section */}
              <motion.div className="video-section" variants={itemVariants}>
                <p className="video-title">und das wird dort auch passieren:</p>
                <div className="video-container">
                  {/* Video-Platzhalter - ersetze src mit dem echten Video-Pfad */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/video.mov"
                  />
                </div>
              </motion.div>

              {/* Impressum */}
              <motion.div className="footer" variants={itemVariants}>
                <h2 className="footer-title">Impressum & Rechtliches</h2>
                <div className="footer-content">
                  <p>
                    <strong>Betreiber dieser Liebeserklärung:</strong><br />
                    Ein hoffnungslos verliebter Mensch
                  </p>
                  <p>
                    <strong>Haftungsausschluss:</strong><br />
                    Für Herzflattern wird keine Haftung übernommen
                  </p>
                  <p>
                    <strong>Datenschutz:</strong><br />
                    Deine Lächeln werden in meinem Herzen gespeichert
                  </p>
                  <p>
                    <strong>Widerrufsrecht:</strong><br />
                    Diese Liebe ist unwiderruflich und für die Ewigkeit
                  </p>
                  <p>
                    <strong>AGB:</strong><br />
                    1. Kuscheln ist Pflicht · 2. Ich liebe dich · 3. Siehe Punkt 2
                  </p>
                  <p style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.7 }}>
                    © {new Date().getFullYear()} · Powered by Love ❤️
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default GiftReveal
