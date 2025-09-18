<br />
<div align="center">
  <a href="https://github.com/Jx1126">
    <img src="./frontend/public/nexttrack-logo.svg" alt="Logo" width="200" height="200">
  </a>

<h1 align="center" style="border-bottom: none;">NextTrack</h1>

  <p align="center">
    A Stateless Music Recommendation API built for<br>CM3070 – Computer Science Final Year Project
    <br />
    <a href="https://github.com/Jx1126/next-track"><strong>Repository Source »</strong></a>
    <br />
    <br />
    <a href="#getting-started">Quick Start</a>
    ·
    <a href="#algorithms">Algorithms</a>
    ·
    <a href="#privacy--security">Privacy & Security</a>
    ·
    <a href="#acknowledgments">Acknowledgments</a>
  </p>
</div>

## Overview

NextTrack is a **completely stateless** music recommendation API developed as part of the CM3070 Final Year Project that generates personalised suggestions without storing any user data.

Built as a foundational concept for privacy-preserving recommendation systems, it demonstrates that effective music discovery can be achieved through algorithms and metadata analysis, eliminating the need for user tracking, databases, or persistent storage.

### Key Features

- ⚡ Zero Data Storage - No databases, user profiles, or session tracking
- ⚡ Six Recommendation Algorithms - Artist-based, tag-based, temporal, length-based, hybrid, and random
- ⚡ Real-time Processing - Each request processed independently in memory
- ⚡ RESTful API - Clean, stateless HTTP endpoints
- ⚡ Modern Frontend - Vue.js interface for easy API interactions
- ⚡ Cold Start Friendly - No warmup period required
- ⚡ Shared Account Safe - No cross-contamination between users
- ⚡ Privacy by Design - GDPR-compliant architecture

## Tech Stack

**Frontend**

<img alt="Vue" src="https://img.shields.io/badge/vuejs-%2335495e.svg?logo=vuedotjs&logoColor=%234FC08D">
<img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF.svg?logo=vite&logoColor=white">
<img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white">

<br>

**Backend**

<img alt="Node" src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white">
<img alt="Express" src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white">
<img alt="MusicBrainz" src="https://img.shields.io/badge/MusicBrainz-BA478F?logo=musicbrainz&logoColor=white">

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Internet access for third-party metadata

> [!NOTE]
> Default dev ports:
> - **Backend:** http://localhost:3000
> - **Frontend (Vite):** http://localhost:5173

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jx1126/next-track.git
   cd next-track
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

### Manual Setup (Alternative)

**Backend Setup**
```bash
cd backend
npm install
npm start
```

**Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

## Algorithms

### 1. Artist-Based Algorithm
- `artist-based`
- Analyses artist relationships and collaborations
- Uses enhanced Jaccard similarity on artist metadata
- Promotes discovery by penalising exact artist matches

### 2. Tag-Based Algorithm
- `tag-based`
- Processes genre, mood, and style tags
- Implements playlist-level tag profiling
- Supports semantic tag relationships

### 3. Temporal Algorithm
- `temporal`
- Considers release years and musical eras
- Performs decade-based clustering
- Handles missing date information gracefully

### 4. Length-Based Algorithm
- `length-based`
- Clusters tracks by duration patterns
- Maintains playlist flow consistency
- Statistical analysis of duration distributions

### 5. Hybrid Algorithm
- `hybrid`
- Dynamically weights all algorithms based on playlist characteristics
- Analyses artist diversity, tag entropy, temporal variance
- Adaptive personalisation without user data

### 6. Random Algorithm
- `random`
- Baseline algorithm for evaluation purposes
- Ensures unbiased recommendation sampling

## Privacy & Security

NextTrack implements **Privacy by Design** principles:

- ⚡ No Data Persistence - Zero user data stored between requests
- ⚡ Stateless Processing - Each request handled independently
- ⚡ No User Tracking - No cookies, sessions, or identifiers
- ⚡ Memory-Only Operations - All processing occurs in RAM
- ⚡ GDPR Compliant - No personal data collection or processing

<br>

>[!IMPORTANT]
> The frontend will send HTTP requests to the backend running on localhost:3000.<br>
> Make sure both servers are running concurrently for proper functionality.

>[!WARNING]
> External APIs like MusicBrainz may throttle or block repeated requests.<br>
> Avoid spamming to ensure smooth use.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [MusicBrainz](https://musicbrainz.org/) for providing comprehensive music metadata
- [Vue.js](https://vuejs.org/) and [Express.js](https://expressjs.com/) communities
- University of London for academic supervision