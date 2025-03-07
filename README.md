# Pomodoro Timer

A responsive, customizable, and accessible productivity timer built with **React**, **Tailwind CSS**, and **Context API** — designed to help users stay focused using the **Pomodoro technique**.
It features animated circular progress tracking, theme and sound customization, and persistent user preferences — all crafted with clean architecture, **custom audio hooks**, **scoped context providers**, and modern UI/UX best practices.

## 🚀 Demo

[View Live](https://pomodoro-pro-timer.netlify.app/)

## ✨ Features

- **Timer Modes** - Pomodoro (25 min), Short Break (5 min), Long Break (15 min)

- **Animated Circular Progress Ring** - Visually track time left with a glowing circular timer

- **Dark/Light Mode Toggle** - Switch between dark and light modes for visual comfort

- **Theme Customization** - Choose from 5 color palettes to personalize the UI

- **Sound Effects** - Start, Pause, and Completion sounds

- **Settings Modal with Tabs**:

  - **Timers** - Customize durations for each timer mode

  - **Theme** - Select from 5 preset color themes

  - **Sounds** - Mute/unmute sounds, adjust volume, and choose a custom completion alert (with instant preview)

- **Reset Controls**:

  - **Quick Reset icon** - Instantly resets the active timer

  - **Reset All** - Restore all preferences to default — including theme, mode, durations, and sounds

- **LocalStorage Persistence** - User preferences are saved across sessions

- **Context API for State Management** - Modular logic via `TimerContext`, `ThemeContext`, and `SoundContext`

- **Responsive UI** - Optimized for mobile, tablet, and desktop screen sizes

## 💡 UX Highlights

- Timer auto-pauses when settings modal is opened, and resumes upon closing if it was previously running

- Timer continues running in the background — even when the tab is inactive or minimized — and plays the alert sound upon completion

- Users get instant audio preview while adjusting the volume or selecting a timer completion alert

- Users can instantly reset the active timer with a single click (⟳ icon)

- A “Reset All” button in Settings allows users to restore all configurations — timer durations, theme, mode, and sounds — back to default in one tap

## 🛠️ Tech Stack

- React (Vite)

- Tailwind CSS

- Lucide React (for Icon)

- react-circular-progressbar (SVG-based circular progress bar)

- Context API

- localStorage API

- Netlify

## 🏁 Getting Started

1. Clone the repository

```bash
  git clone https://github.com/prerna-saraogi/pomodoro-timer-app.git
```

```bash
  cd pomodoro-timer-app
```

2. Install dependencies

```bash
  npm install
```

3. Start the development server

```bash
  npm run dev
```

## 📄 License

[MIT](LICENSE)
