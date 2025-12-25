import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const footerSections = {
  impressum: {
    title: 'Impressum',
    content: `Betreiber dieser Liebeserklärung:
Ein hoffnungslos verliebter Mensch, der jeden Tag aufs Neue darüber staunt, dass du existierst.

Verantwortlich für den Inhalt:
Dein größter Fan, treuester Begleiter und ewiger Bewunderer.

Kontakt:
Erreichbar 24/7 über Umarmungen, Küsse und liebevolle Blicke.`
  },
  haftung: {
    title: 'Haftungsausschluss',
    content: `Für folgende Nebenwirkungen wird keine Haftung übernommen:
• Unkontrollierbares Herzflattern
• Spontane Glücksmomente zu jeder Tages- und Nachtzeit
• Schmetterlinge im Bauch (auch in großen Schwärmen)
• Dauerhaftes Lächeln ohne erkennbaren Grund
• Plötzliches Verlangen nach Nähe und Zärtlichkeit

Bei anhaltenden Symptomen: Einfach weitermachen!`
  },
  datenschutz: {
    title: 'Datenschutz',
    content: `Deine Daten sind bei mir sicher:
• Jedes deiner Lächeln wird sorgfältig in meinem Herzen gespeichert
• Deine Küsse werden verschlüsselt und niemals weitergegeben
• Alle gemeinsamen Erinnerungen unterliegen strengster Geheimhaltung
• Deine Geheimnisse sind bei mir für immer sicher

Löschung: Nicht möglich. Diese Daten bleiben für die Ewigkeit.`
  },
  widerruf: {
    title: 'Widerrufsrecht',
    content: `Hiermit wird offiziell festgestellt:
Diese Liebe ist unwiderruflich, bedingungslos und für alle Zeiten gültig.

Ein Widerruf ist ausgeschlossen, da:
• Mein Herz keine Rückgabeoptionen kennt
• Die Gefühle bereits fest verankert sind
• Du der wichtigste Mensch in meinem Leben bist
• Ich mir ein Leben ohne dich nicht vorstellen kann`
  },
  agb: {
    title: 'AGB - Allgemeine Geschenk-Bedingungen',
    content: `§1 Geltungsbereich
Diese Bedingungen gelten für alle Geschenke, Küsse und Umarmungen.

§2 Einlösebedingungen
Das Geschenk muss zwingend mit mir gemeinsam eingelöst werden.

§3 Pflichten
a) Kuscheln ist Pflicht
b) Lachen ist erwünscht
c) Glücklich sein ist das Ziel

§4 Schlussbestimmung
Ich liebe dich. Siehe auch §4.`
  }
}

function GiftReveal() {
  const [showContent, setShowContent] = useState(false)
  const [activeSection, setActiveSection] = useState(null)

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
                Für immer dein
              </motion.div>

              {/* Video Section */}
              <motion.div className="video-section" variants={itemVariants}>
                <p className="video-title">und das wird dort auch passieren:</p>
                <div className="video-container">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/video.mp4"
                  />
                </div>
              </motion.div>

              {/* Footer mit Links */}
              <motion.div className="footer" variants={itemVariants}>
                <h2 className="footer-title">Rechtliches</h2>

                <div className="footer-links">
                  {Object.entries(footerSections).map(([key, section]) => (
                    <button
                      key={key}
                      className={`footer-link ${activeSection === key ? 'active' : ''}`}
                      onClick={() => setActiveSection(activeSection === key ? null : key)}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeSection && (
                    <motion.div
                      key={activeSection}
                      className="footer-detail"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3>{footerSections[activeSection].title}</h3>
                      <p style={{ whiteSpace: 'pre-line' }}>
                        {footerSections[activeSection].content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.7 }}>
                  © {new Date().getFullYear()} · Powered by Love
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default GiftReveal
