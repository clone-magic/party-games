# 🎮 ARCADE PARTY

**A multiplayer party game platform with 8 exciting games!**

---

## 📖 Table of Contents

- [Overview](#overview)
- [Games](#games)
- [How to Play](#how-to-play)
- [Installation](#installation)
- [Game Master](#game-master)
- [Scoring System](#scoring-system)
- [Team Mode](#team-mode)
- [Data Management](#data-management)
- [Themes](#themes)
- [File Structure](#file-structure)
- [Technologies](#technologies)
- [License](#license)

---

## 🎯 Overview

ARCADE PARTY is a web-based multiplayer party game platform designed for game nights, parties, and group hangouts. It features 8 unique games that test creativity, knowledge, and quick thinking—all in one place!

**Key Features:**
- 🎮 **8 Unique Games** - From charades to karaoke
- 👥 **Player Management** - Add/remove players, track scores
- 👑 **Team Mode** - Play in teams with shared scores
- ⏱️ **Timed Rounds** - Customizable timers for each game
- 🎨 **Themes** - Choose from 10+ color themes
- 💾 **Data Persistence** - Save/load game data via JSON
- 📱 **Mobile Responsive** - Play on any device
- 🕵️ **Game Master Mode** - Customize word lists and prompts

---

## 🎮 Games

### 1. 🎭 Charades
**Act it out!** Players act out words silently while others guess. Perfect for parties!

- 📝 **Custom Words** - Add your own words in Game Master
- ⏱️ **Timed Rounds** - 30-90 seconds per turn
- 🔄 **Change Word** - Up to 3 changes per turn

### 2. 🧩 Hangman
**Guess the word!** Classic hangman with a modern twist.

- 📝 **Custom Words** - Add your own words (5+ letters)
- 💡 **Hint System** - Get letter hints when stuck
- ⏱️ **Timed Rounds** - Race against the clock

### 3. 🤥 Truth & Lie
**Find the lie!** Two truths and one lie - can you spot the deception?

- 📝 **Custom Facts** - Add your own truths and lies
- 🎲 **Randomize** - Change facts mid-turn (3 per turn)
- ✅ **Auto-check** - Click to reveal the lie

### 4. 🎨 Pictionary
**Draw & guess!** Draw words while others guess what you're drawing.

- 📝 **Custom Words** - Add your own drawing prompts
- 🔄 **Change Word** - Up to 3 changes per turn
- ⏱️ **Timed Rounds** - 30-90 seconds per turn

### 5. 🎤 Karaoke
**Sing it loud!** Show off your singing skills and get rated!

- 📝 **Custom Songs** - Add your own songs with artist
- ⭐ **Rating System** - Rate performances 1-5 stars
- 🎵 **Change Song** - Up to 3 changes per turn

### 6. ⏱️ Fast Talk
**Think fast!** Name items in a category as quickly as you can.

- 📝 **Custom Categories** - Add your own categories with items
- 📂 **Change Category** - Up to 3 changes per turn
- ⏱️ **Timed Rounds** - 30-90 seconds per turn

### 7. 🔥 Roast
**Bring the heat!** Deliver your best roasts on command.

- 📝 **Custom Prompts** - Add your own roast prompts
- 🎯 **Target System** - Set who you're roasting
- ⏱️ **Timed Rounds** - Prepare and deliver your roast

### 8. 🕵️ Who Am I?
**Guess the character!** Ask YES/NO questions to figure out who you are.

- 📝 **Custom Names** - Add your own characters/people
- 🔄 **Change Character** - Up to 3 changes per turn
- 🙈 **Blind Mode** - Current player can't see the screen
- ⏱️ **Timed Rounds** - 30-90 seconds per turn

---

## 🎮 How to Play

### Getting Started
1. **Add Players** - Enter player names on the Home page
2. **Choose a Game** - Click any game card on the Games page
3. **Set Timer** - Select a timer duration (15-90 seconds)
4. **Start Game** - Click "START GAME" to begin
5. **Score** - Use the scoring buttons after each round

### Basic Controls
- **➕ ADD** - Add a new player
- **✕ CLEAR** - Remove all players
- **⏭️ NEXT TURN** - Advance to the next player
- **🔄 CHANGE [ITEM]** - Change the current word/song/category (3 per turn)
- **Scoring Buttons** - [+1], [+3], [+5], [−1]

### Timer Controls
- **Presets** - 15s, 30s, 45s, 60s, 90s
- **Custom** - Set any time between 5-300 seconds
- **Auto-restart** - Timer restarts automatically on NEXT TURN

---

## 📥 Installation

### Option 1: Local File (No Internet Required)
1. Download all files to a folder
2. Open `index.html` in your browser
3. That's it! No server needed

### Option 2: GitHub Pages
1. Push to a GitHub repository
2. Enable GitHub Pages in Settings
3. Visit `https://clone-magic.github.io/party-games/`

### Option 3: Web Hosting
1. Upload all files to your web host
2. Ensure `data.json` is in the same folder
3. Visit your domain

---

## 👑 Game Master

Customize every game with your own content!

### Charades Words
- Add words to the charades pool
- Delete or clear all words
- Words are used randomly during gameplay

### Karaoke Songs
- Add songs with title and artist
- Songs are used randomly during gameplay

### Hangman Words
- Add words (5+ letters, letters only)
- Words are used randomly during gameplay

### Pictionary Words
- Add words to the drawing pool
- Words are used randomly during gameplay

### Fast Talk Categories
- Create categories with multiple items
- Categories and items are used randomly

### Truth & Lie
- Add truths and lies to the pool
- The game randomly selects 2 truths and 1 lie

### Roast Prompts
- Add custom roast prompts
- Prompts are used randomly during gameplay

### Who Am I
- Add character/people names
- Names are used randomly during gameplay

---

## 📊 Scoring System

### Point Values
- **+1** - Standard point value
- **+3** - Triple points
- **+5** - Bonus points
- **−1** - Penalty

### Custom Points
- Edit to any value between -10 and +20
- Set custom values in the Rankings page

### Scoring Rules
- Points are awarded manually using buttons
- Works in both Individual and Team modes
- Scores persist until reset

---

## 👥 Team Mode

### Setup
1. Click "TEAM MODE" button to enable
2. Add teams using "ADD TEAM"
3. Auto-assign players with "AUTO-ASSIGN"

### Team Play
- Scores are shared across team members
- Click "SET TURN" on a team to set their turn
- Team scores update in real-time

### Manage Teams
- Edit team names by clicking the ✏️ button
- Remove teams with the 🗑️ button
- Teams are saved automatically

---

## 💾 Data Management

### Auto-Save
All data is automatically saved to your browser's localStorage:
- ✅ Player names and scores
- ✅ Team configurations
- ✅ Game Master data
- ✅ Theme preferences

### Import / Export
- **Export** - Save all data as a JSON file
- **Import** - Load a previously exported JSON file

### Reset
- **Reset Scores** - Reset all player scores to 0
- **Clear Players** - Remove all players from the game

---

## 🎨 Themes

Choose from 10+ color themes to set the mood!

| Theme | Mood |
|-------|------|
| 🖤 Gothic Noir | Sophisticated · Moody · Dramatic |
| 💜 Neon Noir | Futuristic · Edgy · Cyberpunk |
| 🤍 Quiet Luxury | Elegant · Soft · Timeless |
| 🌿 Lush Forest | Natural · Grounded · Organic |
| 🍋 Zesty Lemon | Cheerful · Sunny · Playful |
| 🍂 Autumn Leaves | Warm · Cozy · Nostalgic |
| 🎨 Pop Art | Bold · Playful · High-Energy |
| 🌊 Ocean Tide | Calming · Peaceful · Refreshing |
| 🏙️ Urban Loft | Modern · Industrial · Clean |
| 🍭 Cotton Candy | Whimsical · Dreamy · Soft |

### How to Apply
1. Go to the Themes page
2. Click any theme card
3. The theme applies instantly
4. Your preference is saved automatically

---

## 📁 File Structure
