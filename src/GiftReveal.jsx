import { motion } from 'framer-motion'

function GiftReveal() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      className="gift-reveal unlocked"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="gift-container">
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

            <p>✨ Romantische Suite mit königlichem Ambiente</p>

            <div className="gift-icon">🕯️</div>
            <p>💝 Candlelight-Dinner mit exquisitem 3-Gänge-Menü</p>

            <div className="gift-icon">♨️</div>
            <p>🧖‍♀️ Entspannung in der privaten Sauna</p>

            <div className="gift-icon">☕</div>
            <p>🥐 Verwöhn-Frühstück am nächsten Morgen</p>

            <strong style={{ marginTop: '2rem' }}>
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

        {/* Humorvolles "Impressum" */}
        <motion.div className="footer" variants={itemVariants}>
          <h2 className="footer-title">Impressum & Rechtliches</h2>
          <div className="footer-content">
            <p>
              <strong>Betreiber dieser Liebeserklärung:</strong><br />
              Ein hoffnungslos verliebter Mensch, der täglich darüber staunt,
              dass du existierst
            </p>
            <p>
              <strong>Haftungsausschluss:</strong><br />
              Für Herzflattern, spontane Glücksmomente und unkontrollierbare
              Schmetterlinge im Bauch wird keine Haftung übernommen
            </p>
            <p>
              <strong>Datenschutz:</strong><br />
              Deine Lächeln werden sorgfältig in meinem Herzen gespeichert
              und niemals gelöscht
            </p>
            <p>
              <strong>Widerrufsrecht:</strong><br />
              Diese Liebe ist unwiderruflich, bedingungslos und für die Ewigkeit
            </p>
            <p>
              <strong>AGB - Allgemeine Geschenk-Bedingungen:</strong><br />
              1. Dieses Geschenk muss mit mir gemeinsam eingelöst werden<br />
              2. Kuscheln ist Pflicht<br />
              3. Ich liebe dich<br />
              4. Siehe Punkt 3
            </p>
            <p style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
              © {new Date().getFullYear()} · Powered by Love ❤️ · Made with React & Sternenzauber ✨
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default GiftReveal
