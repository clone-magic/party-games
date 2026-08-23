# 🎮 ARCADE PARTY

**A complete offline multiplayer party game platform - 8 games, team management, scoring, and full customization.**

> Built as a single HTML file. No installation required. Just open in any browser and play!

![ARCADE PARTY](https://img.shields.io/badge/version-2.0-blue) ![Platform](https://img.shields.io/badge/platform-web-brightgreen) ![License](https://img.shields.io/badge/license-MIT-orange)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Quick Start](#-quick-start)
- [Game Library](#-game-library)
- [Game Master](#-game-master)
- [Team Mode](#-team-mode)
- [Scoring System](#-scoring-system)
- [Themes & Customization](#-themes--customization)
- [Data Management](#-data-management)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Browser Support](#-browser-support)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

**ARCADE PARTY** is a full-featured party game platform designed for gatherings with friends and family. It includes 8 unique games, team management, customizable content, and a robust scoring system—all in a single, self-contained HTML file.

### Key Features

- ✅ **8 Unique Games** - Charades, Hangman, Truth & Lie, Pictionary, Karaoke, Fast Talk, Roast Battle, Who Am I?
- ✅ **Offline Ready** - No internet connection needed after initial load
- ✅ **Team Mode** - Play in teams with automatic scoring
- ✅ **Game Master** - Customize game content (words, songs, categories, questions)
- ✅ **Persistent Data** - All scores and custom content saved in your browser
- ✅ **Export/Import** - Save and share your game data
- ✅ **Sound Effects** - Toggle on/off with multiple sound options
- ✅ **Themes** - 12 professional color themes to choose from

---

## 🚀 Quick Start

### Running the Game

1. Download `index.html` to your computer
2. (Optional) Place a `data.json` file in the same folder for custom content
3. Double-click `index.html` to open in your browser
4. Start adding players and playing!

### First Steps

1. **Add Players** - On the Home page, enter names and click "ADD"
2. **Assign Teams** (optional) - Toggle Team Mode and auto-assign
3. **Launch a Game** - Click any game card from the Games page
4. **Score Points** - Use the scoring buttons during gameplay
5. **Next Turn** - Automatically advances to the next player/team

---

## 🎮 Game Library

| Game | Description | Best For |
|------|-------------|----------|
| 🎭 **Charades** | Act out the word silently while others guess | Creative players |
| 🧩 **Hangman** | Guess letters to reveal the hidden word | Word lovers |
| 🤥 **Truth & Lie** | Identify which statement is the lie | Critical thinkers |
| 🎨 **Pictionary** | Draw the word while others guess | Artists |
| 🎤 **Karaoke** | Sing the song and rate your performance | Singers |
| ⏱️ **Fast Talk** | Name as many items in the category as you can | Quick thinkers |
| 🔥 **Roast Battle** | Assign roast lines, see who gets roasted most | Comedians |
| 🕵️ **Who Am I?** | Ask YES/NO questions to figure out who you are | Detectives |

### Game Details

#### 🎭 Charades
- Timer: 15-90 seconds
- 3 word changes per turn
- Word tracking prevents repeats

#### 🧩 Hangman
- 4 difficulty levels (Easy → Expert)
- Hint system (reveals a letter or definition)
- 6 wrong guesses allowed
- Win bonus: +1 point
- Clean SVG drawing (no background, no glow)

#### 🤥 Truth & Lie
- Random facts from your custom data bank
- Instant feedback on correct/incorrect answers
- 3 randomizations per turn

#### 🎨 Pictionary
- Timer: 15-90 seconds
- 3 word changes per turn
- Word tracking prevents repeats

#### 🎤 Karaoke
- 5-star rating system
- 3 song changes per turn
- Celebratory confetti on rating

#### ⏱️ Fast Talk
- **Random category flipping** - categories change randomly
- NEXT TURN advances player AND picks a random new category
- CHANGE CATEGORY picks a random new category (3 changes per turn)
- REVEAL ALL shows all items in the current category

#### 🔥 Roast Battle
- Individual game (Team Mode disabled)
- Customizable rounds (1-5) and roasts per round (5-20)
- Winners announced with funny responses
- Tracks roast counts per player

#### 🕵️ Who Am I?
- One player closes eyes, others see the name
- 3 character changes per turn
- Name tracking prevents repeats

---

## 👑 Game Master

**Access:** Click the "Game Master" button in the sidebar

**Password:** `clone1234#`


### What You Can Customize

| Tab | Content |
|-----|---------|
| 🎭 Charades | Add/remove acting words |
| 🎤 Karaoke | Add/remove songs with artists |
| ⏱️ Fast Talk | Add/remove categories with items |
| 🎨 Pictionary | Add/remove drawing words |
| 🧩 Hangman | Add/remove words with definitions & difficulty |
| 🤥 Truth & Lie | Add/remove truths and lies |
| 🔥 Roast | Add/remove roast lines |
| 🕵️ Who Am I | Add/remove character names |
| 🧠 Brain Games | Add/remove quiz questions (multiple choice) |

### Adding Brain Games Questions
1. Go to Game Master → Brain Games tab
2. Fill in: Question text, 4 options, correct answer, category
3. Click "Add Question"
4. Questions appear in the Brain Games game mode

---

## 👥 Team Mode

**Enable:** Toggle "TEAM MODE" on the Home page

### Features
- Auto-assign players to teams
- Manual team assignment via dropdown on each player
- Team-based scoring (points apply to all team members)
- Team turn rotation
- Visual team indicators in the header

### Team Controls
- **ADD TEAM** - Creates a new team
- **AUTO-ASSIGN** - Distributes players evenly across teams
- **SET TURN** - Make a team the active turn
- **Edit Team Name** - Click the ✏️ icon on any team card

---

## ⚡ Scoring System

### Point Values
- **Presets:** +1, +3, +5, -1
- **Custom:** Any value between -10 and +20

### Scoring Buttons
During any game, use the scoring section at the bottom:
- **−1** - Subtract 1 point
- **+N** - Add the current point value (1, 3, or 5)
- **+3N** - Add triple the current point value
- **+5N** - Add 5× the current point value

### Achievements
Players earn achievements for milestones:
- 🆕 First 10 points
- 🔥 5-point streak
- ⚡ 10-point streak
- 🌟 50 points total
- 💎 100 points total
- 🎯 20 correct guesses

---

## 🎨 Themes & Customization

### Available Themes (12 total)
- Gothic Noir (Default)
- Quiet Luxury
- Lush Forest
- Autumn Leaves
- Ocean Tide
- Urban Loft
- Retro Arcade
- Minimalist White
- Corporate Blue
- Dark Professional
- Soft Pastel Professional
- Professional Gradient

### Sound Settings
- **Master Sound** - Toggle all sounds on/off
- **Customizable Sounds** - Point, Level Up, Timer, Success, Error, Roast
- **Preview** - Click ▶ to hear each sound

---

## 💾 Data Management

### Automatic Save
All data is automatically saved to your browser's localStorage:
- Players and scores
- Team assignments
- Game Master custom content
- Theme preferences
- Sound preferences

### Export/Import
- **EXPORT** - Download all data as a JSON file
- **IMPORT** - Upload a JSON file to restore data
- **SHARE** - Copy leaderboard results to clipboard

### Reset
- **RESET** - Clear all scores (keeps players and custom content)

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Submit/Confirm (varies by context) |
| `Escape` | Close modal or lock screen |
| `Ctrl+F5` | Force refresh (clears cache) |

### Console Commands (for developers)
```javascript
// Force reload all data from data.json
localStorage.removeItem('arcadeGMData');
localStorage.removeItem('arcadeBGQuestions');
localStorage.removeItem('arcadePlayers');
location.reload(true);

// Reset only players and scores
localStorage.removeItem('arcadePlayers');
location.reload(true);

// Clear all game data
localStorage.clear();
location.reload(true);
