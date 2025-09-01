# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Interactive Treasure Box Game built with React, TypeScript, and Vite. The game features animated treasure chests where players click to reveal either treasure (+$100) or skeletons (-$50). The project uses Framer Motion for animations and Tailwind CSS for styling.

## Development Commands

- `npm i` - Install dependencies
- `npm run dev` - Start development server on port 3000 (auto-opens in browser)
- `npm run build` - Build for production (outputs to `build/` directory)

## Architecture

### Core Structure
- **Entry Point**: `src/main.tsx` - Standard React 18 root rendering
- **Main App**: `src/App.tsx` - Contains all game logic and UI in a single component
- **UI Components**: `src/components/ui/` - Complete shadcn/ui component library
- **Assets**: `src/assets/` - Three game images (closed chest, treasure chest, skeleton chest)
- **Styling**: Uses Tailwind CSS v4 with custom CSS properties

### Game Logic
The game state is managed in the main App component with:
- `boxes` array containing Box objects with `id`, `isOpen`, and `hasTreasure` properties
- `score` tracking current points
- `gameEnded` boolean for game state control

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6.3.5 with SWC plugin
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Animations**: Framer Motion
- **UI Library**: Complete Radix UI components via shadcn/ui
- **Icons**: Lucide React

### Asset Handling
Images are imported using Figma asset aliases configured in `vite.config.ts`. The alias system maps descriptive asset names:
- `figma:asset/treasure_closed.png` → closed treasure chest
- `figma:asset/treasure_opened.png` → opened treasure chest  
- `figma:asset/treasure_opened_skeleton.png` → opened chest with skeleton

### Path Resolution
The project uses `@/` alias pointing to `src/` directory for clean imports.

## Development Notes

- The project includes a comprehensive UI component library in `src/components/ui/` based on shadcn/ui
- All styling uses Tailwind CSS with amber color scheme for pirate theme
- Game automatically initializes on component mount
- Images are optimized for web with proper fallbacks via `ImageWithFallback` component
- Development server runs on port 3000 with auto-open browser functionality