# CodeByArt Chess

A modern, fully-featured chess game built with React, TypeScript, and Vite. Play against a local chess engine with multiple difficulty levels or challenge a friend in two-player mode.

## Features

- **Local Chess Engine**: Play against the computer with three difficulty levels:
  - Novice: Random moves
  - Expert: Minimax algorithm with depth 2
  - Grandmaster: Minimax algorithm with depth 3
- **Two-Player Mode**: Play against a friend on the same device
- **Multiple Board Themes**: Choose from Classic, Slate, or Emerald themes
- **Move History**: Track all moves made during the game
- **Move Validation**: Legal move highlighting and validation
- **Game Status**: Real-time check, checkmate, and draw detection
- **Undo Moves**: Take back your last move(s)
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **chess.js** - Chess game logic and move validation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/codebyart-chess.git
   cd codebyart-chess
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

1. Go to your repository Settings > Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. Push to the `main` branch to trigger automatic deployment
4. Wait a few minutes for the deployment to complete

The site will be available at: `https://yourusername.github.io/codebyart-chess/`

**Important:** The `vite.config.ts` is configured with `base: '/codebyart-chess/'`. If you rename your repository, update this value to match your new repository name.

### Manual Deployment

You can deploy the `dist` folder to any static hosting service (Netlify, Vercel, etc.).

## How to Play

1. **Start a New Game**: Click the "New Game" button
2. **Make a Move**: Click on a piece to select it, then click on a highlighted square to move
3. **Undo**: Click the "Undo" button to take back your last move
4. **Change Opponent**: Toggle between Computer and Human mode
5. **Adjust Difficulty**: Select Novice, Expert, or Grandmaster when playing against the computer
6. **Change Theme**: Choose your preferred board color scheme

## Project Structure

```
codebyart-chess/
├── components/
│   ├── ChessBoard.tsx      # Main chess board component
│   ├── GameControls.tsx    # Game controls and settings
│   └── MoveHistory.tsx     # Move history display
├── services/
│   └── chessEngine.ts      # Local chess engine (minimax algorithm)
├── constants.tsx           # Piece SVGs and theme definitions
├── types.ts               # TypeScript type definitions
├── App.tsx                # Main application component
└── index.tsx              # Application entry point
```

## Chess Engine

The chess engine uses the **Minimax algorithm** with **Alpha-Beta pruning** for efficient move calculation. It evaluates positions based on:

- Material value (piece values)
- Piece-square tables (positional bonuses)
- Search depth (varies by difficulty level)

## License

This project is open source and available under the MIT License.

## Credits

- **Designed by**: [techiekamal21](https://github.com/techiekamal21)
- **Copyright**: CodeByArt

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ by CodeByArt
