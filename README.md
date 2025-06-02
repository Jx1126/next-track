<br />
<div align="center">
  <a href="https://github.com/Jx1126">
    <img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/147470595?s=200&v=4&h=300&w=300&fit=cover&mask=circle&maxage=7d" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">NextTrack – A Stateless Music Recommendation API</h3>

  <p align="center">
    CM3070 – Computer Science Final Year Project
    <br />
    <a href="https://github.com/Jx1126/next-track"><strong>Repository Source »</strong></a>
    <br />
  </p>
</div>

## 📜 Project Overview

### ℹ️ About the Project
**NextTrack** is a stateless, privacy-focused music recommendation API developed as part of the CM3070 Final Year Project. It allows users to get music recommendations without any user profiling, session tracking, or persistent data storage. The system uses external metadata sources such as MusicBrainz to recommend the next track based on user-provided track identifiers and preference parameters.

The project aims to deliver quality recommendations while respecting user privacy and avoiding account-based personalisation. All recommendations are made based on real-time input and publicly available metadata only.

### 📁 Project Structure

- `backend/`: Node.js + ExpressJS
- `frontend/`: Vue 3 + Vite

### 🗝️ Key Features

-  Stateless and RESTful API design
-  No user tracking or account requirement
-  Recommendations based on external metadata (e.g., MusicBrainz)
-  Cold-start and shared-account friendly
-  Frontend for input and result display

### 🛠️ Built With
* Frontend
  * ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
  * ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  * ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

* Backend
  * ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  * ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

* External API
  * ![MusicBrainz](https://img.shields.io/badge/Musicbrainz-EB743B?style=for-the-badge&logo=musicbrainz&logoColor=BA478F)

<br>


## 🚀 Getting Started

### 📦 Backend Setup (Node.js + Express)

1. Navigate to the `backend/` folder:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   npm install
3. Start the API server:
   ```bash
   npm start
   ```

### 🌐 Frontend Setup (Vue + Vite)

1. Navigate to the `frontend/` folder:
   ```bash
   cd frontend
2. Install frontend dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm run dev
4. Open browser and visit:
   ```bash
   http://localhost:5173
   ```

<br>

>[!IMPORTANT]
> The frontend will send HTTP requests to the backend running on localhost:3000.<br>
> Make sure both servers are running concurrently for proper functionality.


>[!WARNING]
> External APIs like MusicBrainz may throttle or block repeated requests.<br>
> Avoid spamming to ensure smooth use.