# Grid Ripple

An interactive 3x3 grid game with ripple effects and dynamic state management. Click boxes to increment their values and trigger cascading effects across the grid.

## Features

- **Interactive Grid**: 9 clickable boxes in a 3x3 layout
- **Ripple Effects**: Values change with special cascading rules
- **Locked State**: Boxes lock when reaching value 15 or higher
- **Real-time Stats**: Track locked boxes and maximum grid value
- **Smooth UI**: Gradient backgrounds, polished hover effects, and responsive design

## Game Mechanics

- **Clicking a Box**: Increments its value by 1
- **Modulo 3**: When a box reaches a multiple of 3, the box to the right decreases by 1 (if not locked)
- **Modulo 5**: When a box reaches a multiple of 5, the box below increases by 2 (if not locked)
- **Locked Boxes**: Once a box reaches 15+, it's locked (red, non-clickable)

## Technologies

- **Next.js 15**: React framework for production
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: State management with `useState`

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  ├── page.tsx          # Main game component
  ├── layout.tsx        # Root layout
  └── globals.css       # Global styles and theme
public/                 # Static assets
package.json           # Dependencies
tsconfig.json          # TypeScript config
next.config.ts         # Next.js config
```

