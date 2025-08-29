<template>
  <!-- hero section -->
  <div class="z-10 flex flex-col items-center justify-center min-h-screen px-6">
    <div class="text-center space-y-8 max-w-4xl mx-auto">
      <!-- brand -->
      <div class="space-y-4">
        <div class="w-fit h-fit mx-auto flex items-center justify-center">
          <img src="/nexttrack-logo.svg" alt="NextTrack Logo" class="w-32 h-32 animate-pulse" style="filter: drop-shadow(0 0 50px rgb(14, 116, 144));" />
        </div>
        <h1 class="text-6xl font-bold font-poppins text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-500 bg-clip-text tracking-wide">
          NextTrack
        </h1>
        <p class="text-2xl font-light font-poppins">
          <span class="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text font-medium">Stateless</span>
          <span class="text-neutral-300"> Music Recommendation </span>
          <span class="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-medium">API</span>
        </p>
      </div>

      <!-- description -->
      <div class="space-y-6">
        <p class="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-poppins font-normal">
          A RESTful API that generates music recommendations without user tracking or persistent data storage. Experience the API through this interactive demo interface.
        </p>
        
        <!-- feature highlights -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-6 hover:scale-102 transition-all duration-300 shadow-xl">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-cyan-500 to-blue-500 shadow-xl shadow-blue-700/50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium font-poppins text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-2">RESTful API</h3>
            <p class="text-neutral-400 text-sm font-poppins font-light tracking-wide">Standard HTTP endpoints for seamless integration</p>
          </div>
          
          <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-6 hover:scale-102 transition-all duration-300 shadow-xl">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-red-500 to-orange-500 shadow-xl shadow-orange-700/50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium font-poppins text-transparent bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text mb-2">Stateless Design</h3>
            <p class="text-neutral-400 text-sm font-poppins font-light tracking-wide">Each request is self-contained and independent</p>
          </div>
          
          <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-6 hover:scale-102 transition-all duration-300 shadow-xl">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-pink-700/50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
            </div>
            <h3 class="text-xl font-medium font-poppins text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text mb-2">Metadata-Driven</h3>
            <p class="text-neutral-400 text-sm font-poppins font-light tracking-wide">Powered by MusicBrainz, an open music encyclopedia</p>
          </div>
        </div>
      </div>

      <!-- cta buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <router-link
          to="/search" 
          class="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium font-poppins px-8 py-4 rounded-2xl shadow-lg hover:shadow-cyan-500/25 hover:scale-102 transition-all duration-300 relative overflow-hidden"
        >
          <div class="flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            Try the API Demo
          </div>
        </router-link>
        
        <router-link
          to="/docs" 
          class="group px-8 py-4 rounded-2xl font-medium font-poppins text-neutral-300 border border-neutral-700/50 bg-neutral-800/50 hover:bg-neutral-700/50 hover:border-neutral-600/50 hover:scale-102 transition-all duration-300"
        >
          <div class="flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            API Documentation
          </div>
        </router-link>
      </div>
    </div>
  </div>

  <!-- why use nexttrack section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold font-poppins mb-4">
          <span class="text-neutral-200">Why Use the </span>
          <span class="text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">NextTrack API</span>
          <span class="text-neutral-200">?</span>
        </h2>
        <p class="text-lg text-neutral-400 max-w-2xl mx-auto font-poppins">
          Privacy-first music recommendations for modern applications
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-8 hover:scale-102 transition-all duration-300">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-green-500 to-emerald-500 shadow-xl shadow-emerald-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium font-poppins mb-2">
                <span class="text-transparent bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text">Privacy by Design</span>
              </h3>
              <p class="text-neutral-400 font-poppins">Stateless architecture ensures zero user data storage or tracking on the server. This demo uses client-side localStorage only.</p>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-8 hover:scale-102 transition-all duration-300">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl shadow-cyan-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium font-poppins mb-2">
                <span class="text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text">RESTful Integration</span>
              </h3>
              <p class="text-neutral-400 font-poppins">Standard HTTP endpoints make integration simple for any application or platform.</p>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-8 hover:scale-102 transition-all duration-300">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-pink-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium font-poppins mb-2">
                <span class="text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">Cold Start Friendly</span>
              </h3>
              <p class="text-neutral-400 font-poppins">No user profiles needed, generate recommendations from any track input immediately.</p>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-8 hover:scale-102 transition-all duration-300">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-orange-500 to-red-500 shadow-xl shadow-red-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium font-poppins mb-2">
                <span class="text-transparent bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text">No Setup Required</span>
              </h3>
              <p class="text-neutral-400 font-poppins">Start making API calls immediately, no authentication, configuration, or complex setup needed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- how it works section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold font-poppins mb-4">
          <span class="text-neutral-200">How the </span>
          <span class="text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text">API</span>
          <span class="text-neutral-200"> Works</span>
        </h2>
        <p class="text-lg text-neutral-400 max-w-2xl mx-auto font-poppins">
          Stateless recommendation generation through RESTful endpoints
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center space-y-4">
          <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-700/50 rounded-2xl flex items-center justify-center mx-auto">
            <span class="text-xl font-semibold text-white">1</span>
          </div>
          <h3 class="text-xl font-semibold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text font-poppins">Provide Input</h3>
          <p class="text-neutral-400 font-poppins">Send track identifiers and optional preferences to the API</p>
        </div>

        <div class="text-center space-y-4">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-pink-700/50 rounded-2xl flex items-center justify-center mx-auto">
            <span class="text-xl font-semibold text-white">2</span>
          </div>
          <h3 class="text-xl font-semibold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text font-poppins">Analyse Patterns</h3>
          <p class="text-neutral-400 font-poppins">System analyses music metadata and identifies relationships</p>
        </div>

        <div class="text-center space-y-4">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-emerald-700/50 rounded-2xl flex items-center justify-center mx-auto">
            <span class="text-xl font-semibold text-white">3</span>
          </div>
          <h3 class="text-xl font-semibold text-transparent bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text font-poppins">Get Recommendations</h3>
          <p class="text-neutral-400 font-poppins">Receive relevant track suggestions based on your input</p>
        </div>
      </div>
    </div>
  </div>

  <!-- built with section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold font-poppins mb-4">
          <span class="text-neutral-200">Built with </span>
          <span class="text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text">Modern Technology</span>
        </h2>
        <p class="text-lg text-neutral-400 max-w-2xl mx-auto font-poppins">
          RESTful architecture built with modern web technologies
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/30 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 shadow-xl shadow-cyan-700/50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 drop-shadow-lg" viewBox="0 0 512 512">
              <path fill="white" d="M429.76 130.07L274.33 36.85a37 37 0 00-36.65 0L82.24 130.06A38.2 38.2 0 0064 162.83V349a38.26 38.26 0 0018.24 32.8L123 406.14l.23.13c20.58 10.53 28.46 10.53 37.59 10.53 32.14 0 52.11-20.8 52.11-54.29V182a8.51 8.51 0 00-8.42-8.58h-22.38a8.51 8.51 0 00-8.42 8.58v180.51a15 15 0 01-6.85 13.07c-5.9 3.6-14.47 2.84-24.14-2.15l-39.06-23.51a1.1 1.1 0 01-.48-.92V165.46a1.32 1.32 0 01.59-1.06l151.84-93a.82.82 0 01.73 0l151.93 93a1.34 1.34 0 01.55 1.1V349a1.28 1.28 0 01-.45 1l-152.06 90.65a1.22 1.22 0 01-.8 0l-38.83-23.06a7.8 7.8 0 00-7.83-.41l-.34.2c-10.72 6.35-13.6 8-23.54 11.62-1.62.59-5.43 2-5.76 5.77s3.29 6.45 6.51 8.32l51.9 31.87a35.67 35.67 0 0018.3 5.07h.58a35.87 35.87 0 0017.83-5.07l155.43-93.13A38.37 38.37 0 00448 349V162.83a38.21 38.21 0 00-18.24-32.76z"/>
              <path fill="white" d="M307.88 318.05c-37.29 0-45.24-10.42-47.6-27.24a8.43 8.43 0 00-8.22-7.32h-19.8a8.44 8.44 0 00-8.26 8.58c0 14.58 5.12 62.17 83.92 62.17 24.38 0 44.66-5.7 58.63-16.49S388 311.26 388 292.55c0-37.55-24.5-47.83-72.75-54.55-49.05-6.82-49.05-10.29-49.05-17.89 0-5.47 0-18.28 35.46-18.28 25.23 0 38.74 3.19 43.06 20a8.35 8.35 0 008.06 6.67h19.87a8.24 8.24 0 006.16-2.86 8.91 8.91 0 002.12-6.44c-2.57-35.55-28.56-53.58-79.24-53.58-46.06 0-73.55 20.75-73.55 55.5 0 38.1 28.49 48.87 71.29 53.33 50 5.17 50 12.71 50 19.37.03 10.38-4.28 24.23-41.55 24.23z"/>
            </svg>
          </div>
          <h3 class="font-medium text-neutral-200 font-poppins">Node.js + Express</h3>
          <p class="text-sm text-neutral-400 font-poppins">Backend API server</p>
        </div>

        <div class="bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/30 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 shadow-xl shadow-red-700/50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg fill="white" class="h-8 w-8 drop-shadow-lg" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>MusicBrainz icon</title><path d="M11.582 0L1.418 5.832v12.336L11.582 24V10.01L7.1 12.668v3.664c.01.111.01.225 0 .336-.103.435-.54.804-1 1.111-.802.537-1.752.509-2.166-.111-.413-.62-.141-1.631.666-2.168.384-.28.863-.399 1.334-.332V6.619c0-.154.134-.252.226-.308L11.582 3zm.836 0v6.162c.574.03 1.14.16 1.668.387a2.225 2.225 0 0 0 1.656-.717 1.02 1.02 0 1 1 1.832-.803l.004.006a1.022 1.022 0 0 1-1.295 1.197c-.34.403-.792.698-1.297.85.34.263.641.576.891.928a1.04 1.04 0 0 1 .777.125c.768.486.568 1.657-.318 1.857-.886.2-1.574-.77-1.09-1.539.02-.03.042-.06.065-.09a3.598 3.598 0 0 0-1.436-1.166 4.142 4.142 0 0 0-1.457-.369v4.01c.855.06 1.256.493 1.555.834.227.256.356.39.578.402.323.018.568.008.806 0a5.44 5.44 0 0 1 .895.022c.94-.017 1.272-.226 1.605-.446a2.533 2.533 0 0 1 1.131-.463 1.027 1.027 0 0 1 .12-.263 1.04 1.04 0 0 1 .105-.137c.023-.025.047-.044.07-.066a4.775 4.775 0 0 1 0-2.405l-.012-.01a1.02 1.02 0 1 1 .692.272h-.057a4.288 4.288 0 0 0 0 1.877h.063a1.02 1.02 0 1 1-.545 1.883l-.047-.033a1 1 0 0 1-.352-.442 1.885 1.885 0 0 0-.814.354 3.03 3.03 0 0 1-.703.365c.757.555 1.772 1.6 2.199 2.299a1.03 1.03 0 0 1 .256-.033 1.02 1.02 0 1 1-.545 1.88l-.047-.03a1.017 1.017 0 0 1-.27-1.376.72.72 0 0 1 .051-.072c-.445-.775-2.026-2.28-2.46-2.387a4.037 4.037 0 0 0-1.31-.117c-.24.008-.513.018-.866 0-.515-.027-.783-.333-1.043-.629-.26-.296-.51-.56-1.055-.611V18.5a1.877 1.877 0 0 0 .426-.135.333.333 0 0 1 .058-.027c.56-.267 1.421-.91 2.096-2.447a1.02 1.02 0 0 1-.27-1.344 1.02 1.02 0 1 1 .915 1.54 6.273 6.273 0 0 1-1.432 2.136 1.785 1.785 0 0 1 .691.306.667.667 0 0 0 .37.168 3.31 3.31 0 0 0 .888-.222 1.02 1.02 0 0 1 1.787-.79v-.005a1.02 1.02 0 0 1-.773 1.683 1.022 1.022 0 0 1-.719-.287 3.935 3.935 0 0 1-1.168.287h-.05a1.313 1.313 0 0 1-.71-.275c-.262-.177-.51-.345-1.402-.12a2.098 2.098 0 0 1-.707.2V24l10.164-5.832V5.832zm4.154 4.904a.352.352 0 0 0-.197.639l.018.01c.163.1.378.053.484-.108v-.002a.352.352 0 0 0-.303-.539zm-4.99 1.928L7.082 9.5v2l4.5-2.668zm8.385.38a.352.352 0 0 0-.295.165v.002a.35.35 0 0 0 .096.473l.013.01a.357.357 0 0 0 .487-.108.352.352 0 0 0-.301-.541zM16.09 8.647a.352.352 0 0 0-.277.163.355.355 0 0 0 .296.54c.482 0 .463-.73-.02-.703zm3.877 2.477a.352.352 0 0 0-.295.164.35.35 0 0 0 .094.475l.015.01a.357.357 0 0 0 .485-.11.352.352 0 0 0-.3-.539zm-4.375 3.594a.352.352 0 0 0-.291.172.35.35 0 0 0-.04.265.352.352 0 1 0 .33-.437zm4.375.789a.352.352 0 0 0-.295.164v.002a.352.352 0 0 0 .094.473l.015.01a.357.357 0 0 0 .485-.108.352.352 0 0 0-.3-.54zm-2.803 2.488v.002a.347.347 0 0 0-.223.084.352.352 0 0 0 .23.62.347.347 0 0 0 .23-.085.348.348 0 0 0 .12-.24.353.353 0 0 0-.35-.38.347.347 0 0 0-.007 0Z"/></svg>
          </div>
          <h3 class="font-medium text-neutral-200 font-poppins">MusicBrainz API</h3>
          <p class="text-sm text-neutral-400 font-poppins">Metadata source</p>
        </div>

        <div class="bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/30 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 shadow-xl shadow-emerald-700/50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 drop-shadow-lg" viewBox="0 0 512 512">
              <path fill="white" d="M256 144.03l-55.49-96.11h-79.43L256 281.61 390.92 47.92h-79.43L256 144.03z"/>
              <path fill="white" d="M409.4 47.92L256 313.61 102.6 47.92H15.74L256 464.08 496.26 47.92H409.4z"/>
            </svg>
          </div>
          <h3 class="font-medium text-neutral-200 font-poppins">Vue.js 3</h3>
          <p class="text-sm text-neutral-400 font-poppins">Demo frontend</p>
        </div>

        <div class="bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/30 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl shadow-pink-700/50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg fill="white" class="h-8 w-8 drop-shadow-lg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"/>
            </svg>
          </div>
          <h3 class="font-medium text-neutral-200 font-poppins">TailwindCSS</h3>
          <p class="text-sm text-neutral-400 font-poppins">UI styling</p>
        </div>
      </div>
    </div>
  </div>

  <!-- what's included section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold font-poppins mb-4">
          <span class="text-transparent bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text">What's</span>
          <span class="text-neutral-200"> Included</span>
        </h2>
        <p class="text-lg text-neutral-400 font-poppins">
          Complete API functionality and demonstration interface
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br text-white from-cyan-500 to-blue-500 shadow-lg shadow-blue-700/50 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text font-poppins">NextTrack API</h3>
          </div>
          <ul class="text-neutral-400 font-poppins space-y-2">
            <li class="flex items-center gap-4">
              <span class="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              RESTful music recommendation endpoints
            </li>
            <li class="flex items-center gap-4">
              <span class="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              Track search and metadata retrieval
            </li>
            <li class="flex items-center gap-4">
              <span class="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              Stateless architecture for privacy
            </li>
            <li class="flex items-center gap-4">
              <span class="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              MusicBrainz integration
            </li>
          </ul>
        </div>

        <div class="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-pink-700/50 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text font-poppins">Demo Frontend</h3>
          </div>
          <ul class="text-neutral-400 font-poppins space-y-2">
            <li class="flex items-center gap-4">
              <span class="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              Interactive API testing interface
            </li>
            <li class="flex items-center gap-4">
              <span class="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              Playlist management and organisation
            </li>
            <li class="flex items-center gap-4">
              <span class="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              Real-time recommendation display
            </li>
            <li class="flex items-center gap-4">
              <span class="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              Vue.js 3 implementation example
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- faq section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold font-poppins mb-4">
          <span class="text-transparent bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text">Frequently Asked</span>
          <span class="text-neutral-200"> Questions</span>
        </h2>
        <p class="text-lg text-neutral-400 font-poppins">
          Common questions about the NextTrack API
        </p>
      </div>

      <div class="space-y-6">
        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-6">
          <h3 class="text-lg font-medium tracking-wide text-neutral-200 font-poppins mb-2">How does the stateless architecture work?</h3>
          <p class="text-neutral-400 font-poppins">Each API request contains all necessary information. No session state or user data is stored server-side, ensuring complete privacy.</p>
        </div>

        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-6">
          <h3 class="text-lg font-medium tracking-wide text-neutral-200 font-poppins mb-2">Does the API require authentication?</h3>
          <p class="text-neutral-400 font-poppins">No authentication required. The API is designed for open access while maintaining privacy through its stateless architecture.</p>
        </div>
        
        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-6">
          <h3 class="text-lg font-medium tracking-wide text-neutral-200 font-poppins mb-2">What about localStorage in this demo?</h3>
          <p class="text-neutral-400 font-poppins">This frontend demo uses client-side localStorage for convenience, no data is ever sent to the server. The API itself remains completely stateless.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- bottom cta section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold font-poppins mb-6">
        <span class="text-neutral-200">Ready to </span>
        <span class="text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text">Integrate</span>
        <span class="text-neutral-200"> the API?</span>
      </h2>
      <p class="text-xl text-neutral-300 mb-8 font-poppins">
        Start building privacy-focused music applications with NextTrack
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/search" 
          class="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium font-poppins px-10 py-4 rounded-2xl shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
        >
          <div class="flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            Test API Demo
          </div>
        </router-link>
        
        <router-link
          to="/docs" 
          class="group px-10 py-4 rounded-2xl font-medium font-poppins text-neutral-300 border border-neutral-700/50 bg-neutral-800/50 hover:bg-neutral-700/50 hover:border-neutral-600/50 hover:scale-105 transition-all duration-300"
        >
          <div class="flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            View Documentation
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.animate-pulse {
  animation: glow-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 40px rgb(14, 116, 144));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(14, 116, 144, 0.6));
  }
}
</style>
