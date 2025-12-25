# ✨ Sternenhimmel-Geschenk

Eine romantische Web-App mit Kassiopeia-Sternbild-Puzzle als Entsperrungsmechanismus.

## 🚀 Schnell-Deployment auf Netlify

### Option 1: Netlify CLI (Schnellste Methode)

```bash
# Netlify CLI installieren (falls noch nicht installiert)
npm install -g netlify-cli

# In das Projektverzeichnis wechseln
cd /home/user/Bl-mchen-

# Bei Netlify anmelden (öffnet Browser)
netlify login

# Projekt deployen
netlify deploy --prod
```

Beim Deployment wirst du gefragt:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Option 2: Netlify Web Interface

1. Gehe zu [netlify.com](https://netlify.com) und melde dich an
2. Klicke auf "Add new site" → "Deploy manually"
3. Ziehe den `dist` Ordner per Drag & Drop ins Fenster
4. Fertig! Die Seite ist live ✨

### Option 3: Git-basiertes Deployment

1. Pushe das Projekt zu GitHub
2. Gehe zu [netlify.com](https://netlify.com)
3. Klicke auf "Add new site" → "Import an existing project"
4. Wähle dein GitHub Repository
5. Build-Settings werden automatisch aus `netlify.toml` geladen
6. Klicke auf "Deploy"

## 🎮 So funktioniert das Puzzle

Die fünf Sterne müssen in der Form des Sternbilds **Kassiopeia** (nach links gedreht = M-Form) angeordnet werden:

```
    ⭐        ⭐
       ⭐
⭐              ⭐
```

Von links nach rechts:
- Stern 1: Links unten
- Stern 2: Links oben
- Stern 3: Mitte
- Stern 4: Rechts oben
- Stern 5: Rechts unten

## 🎨 Tech Stack

- **React** - UI Framework
- **Vite** - Build Tool
- **Framer Motion** - Animationen
- **Custom CSS** - Einzigartige Ästhetik mit:
  - Crimson Pro & Cormorant Garamond Fonts
  - Layered Gradients
  - Funkelnde Sternen-Animationen

## 💝 Features

- ✨ Interaktive Kassiopeia-Sternbild-Entsperrung
- 🎨 Wunderschöne Animationen und Übergänge
- 💌 Romantische Geschenk-Präsentation
- 😄 Humorvolles "Impressum" mit Liebesbekundungen
- 📱 Responsive Design

## 🛠️ Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Dev-Server starten
npm run dev

# Production Build
npm run build

# Build Preview
npm run preview
```

---

Made with ❤️ and ✨
