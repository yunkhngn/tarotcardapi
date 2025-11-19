# 🔮 Tarot Card API - Next.js Edition

A comprehensive Tarot Card API and Web Application built with Next.js, providing developers with easy access to a vast collection of Tarot card meanings, interpretations, and symbolism. This project includes both a RESTful API and a beautiful web interface to explore Tarot cards.

## 🌟 Features

- **Full Web Application**: Beautiful, responsive web interface to browse and explore Tarot cards
- **RESTful API**: Easy-to-use API endpoints for developers
- **Random Card Selector**: Get random Tarot cards for readings
- **Three Card Spread**: Traditional past, present, future reading
- **Full Card Listing**: Access all 78 Tarot cards with images and descriptions
- **High-Quality Images**: Each card comes with a beautifully designed image
- **Modern UI**: Gradient backgrounds, smooth animations, and responsive design

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
- **CSS3**: Modern styling with gradients and animations

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

- Tarot reading websites and apps
- Spiritual and astrological content creators
- Personal projects exploring divination and Tarot
- Educational purposes in learning APIs or Tarot card meanings
- Full-stack web development projects

## 🤝 Contributing

Suggestions, improvements, and pull requests are welcome! Let's make this the best Tarot Card API out there!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- All Tarot card descriptions and meanings
- Card images included in the project

---

**Embrace the mystical and enhance your projects with our Free Tarot Card API!** ✨
