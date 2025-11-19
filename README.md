# 🔮 Tarot Reader

A modern web application for Tarot card readings built with Next.js. Explore the mystical world of Tarot with beautiful card readings, interpretations, and spreads. Get daily readings, three-card spreads, and access to all 78 Tarot cards with detailed meanings and symbolism.

## 🌟 Features

- **Tarot Card Readings**: Get personalized Tarot card readings and interpretations
- **Daily Readings**: Draw a random card for daily guidance
- **Three Card Spread**: Traditional past, present, future reading spread
- **Complete Tarot Deck**: Access all 78 Tarot cards with detailed meanings
- **Beautiful UI**: Modern, responsive interface built with HeroUI and Tailwind CSS
- **RESTful API**: Easy-to-use API endpoints for developers
- **High-Quality Images**: Each card comes with a beautifully designed image

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd tarotcardapi
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tarotcardapi/
├── pages/
│   ├── api/
│   │   └── cards/
│   │       ├── index.js      # GET /api/cards - All cards
│   │       ├── onecard.js    # GET /api/cards/onecard - Random card
│   │       └── threecards.js # GET /api/cards/threecards - Three random cards
│   ├── _app.js               # Next.js app wrapper
│   ├── index.js              # Homepage
│   ├── cards.js              # All cards page
│   ├── random.js             # Random card page
│   └── three-cards.js        # Three card spread page
├── data/
│   └── tarotCards.js         # Tarot cards data
├── public/
│   └── tarotdeck/            # Card images
├── styles/
│   └── globals.css           # Global styles
└── package.json
```

## 🌐 API Endpoints

### Get All Cards
```
GET /api/cards
```
Returns all 78 Tarot cards with name, description, and image path.

### Get Random Card
```
GET /api/cards/onecard
```
Returns a single random Tarot card.

### Get Three Random Cards
```
GET /api/cards/threecards
```
Returns three random, non-duplicate Tarot cards (perfect for spreads).

## 🎨 Web Pages

- **Homepage** (`/`): Welcome page with navigation and API information
- **All Cards** (`/cards`): Browse all 78 Tarot cards in a beautiful grid
- **Random Card** (`/random`): Get a random card reading
- **Three Card Spread** (`/three-cards`): Traditional past, present, future reading

## 🛠️ Tech Stack

- **Next.js 14**: React framework with API routes
- **React 18**: UI library
- **HeroUI**: Modern UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

Or simply connect your GitHub repository to Vercel for automatic deployments.

## 📝 API Response Format

### Single Card
```json
{
  "name": "The Fool",
  "description": "The card suggests that your investments...",
  "image": "/tarotdeck/thefool.jpeg"
}
```

### Multiple Cards
```json
[
  {
    "name": "The Fool",
    "description": "...",
    "image": "/tarotdeck/thefool.jpeg"
  },
  ...
]
```

## 🔮 Ideal For

- Daily Tarot card readings and guidance
- Exploring Tarot card meanings and interpretations
- Learning about Tarot symbolism and spreads
- Spiritual and personal growth
- Developers looking to integrate Tarot functionality

## 🤝 Contributing

Suggestions, improvements, and pull requests are welcome! Let's make this the best Tarot Reader application out there!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- All Tarot card descriptions and meanings
- Card images included in the project

---

**Embrace the mystical and discover your path with Tarot Reader!** ✨
