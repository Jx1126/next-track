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
          <span class="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text font-medium">Privacy-First</span>
          <span class="text-neutral-300"> Music </span>
          <span class="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-medium">Discovery</span>
          <span class="text-neutral-300"> Platform</span>
        </p>
      </div>

      <!-- description -->
      <div class="space-y-6">
        <p class="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-poppins font-normal">
          Discover music without leaving a trace. Completely stateless with zero data retention across sessions.
        </p>
        
        <!-- feature highlights -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-6 hover:scale-102 transition-all duration-300 shadow-xl">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-cyan-500 to-blue-500 shadow-xl shadow-blue-700/50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium font-poppins text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-2">Stateless Search</h3>
            <p class="text-neutral-400 text-sm font-poppins font-light tracking-wide">Real-time MusicBrainz API calls with zero persistence</p>
          </div>
          
          <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-6 hover:scale-102 transition-all duration-300 shadow-xl">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-red-500 to-orange-500 shadow-xl shadow-orange-700/50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium font-poppins text-transparent bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text mb-2">Zero Storage</h3>
            <p class="text-neutral-400 text-sm font-poppins font-light tracking-wide">No databases, no local storage, no session persistence</p>
          </div>
          
          <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-6 hover:scale-102 transition-all duration-300 shadow-xl">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-pink-700/50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <h3 class="text-xl font-medium font-poppins text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text mb-2">Session-Only</h3>
            <p class="text-neutral-400 text-sm font-poppins font-light tracking-wide">Temporary playlists that vanish when you close the browser</p>
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
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Start Discovering Music
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
            Learn More
          </div>
        </router-link>
      </div>
    </div>
  </div>

  <!-- how it works section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold font-poppins mb-4">
          <span class="text-neutral-200">How </span>
          <span class="text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text">NextTrack</span>
          <span class="text-neutral-200"> Works</span>
        </h2>
        <p class="text-lg text-neutral-400 max-w-2xl mx-auto font-poppins">
          Seamless music discovery through privacy-focused architecture
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center space-y-4">
          <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-700/50 rounded-2xl flex items-center justify-center mx-auto">
            <span class="text-xl font-semibold text-white">1</span>
          </div>
          <h3 class="text-xl font-semibold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text font-poppins">Build Playlist</h3>
          <p class="text-neutral-400 font-poppins">Create a new playlist and search for songs to add to it</p>
        </div>

        <div class="text-center space-y-4">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-pink-700/50 rounded-2xl flex items-center justify-center mx-auto">
            <span class="text-xl font-semibold text-white">2</span>
          </div>
          <h3 class="text-xl font-semibold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text font-poppins">Select Seed</h3>
          <p class="text-neutral-400 font-poppins">Choose your playlist as the foundation for recommendations</p>
        </div>

        <div class="text-center space-y-4">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-emerald-700/50 rounded-2xl flex items-center justify-center mx-auto">
            <span class="text-xl font-semibold text-white">3</span>
          </div>
          <h3 class="text-xl font-semibold text-transparent bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text font-poppins">Get Recommendations</h3>
          <p class="text-neutral-400 font-poppins">Generate similar songs based on your playlist content</p>
        </div>
      </div>
    </div>
  </div>

  <!-- technology stack section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold font-poppins mb-4">
          <span class="text-neutral-200">Built With </span>
          <span class="text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text">Modern Technology</span>
        </h2>
        <p class="text-lg text-neutral-400 max-w-2xl mx-auto font-poppins">
          Powered by reliable technologies for optimal performance
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/30 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 shadow-xl shadow-emerald-700/50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 drop-shadow-lg" viewBox="0 0 512 512">
              <path fill="white" d="M256 144.03l-55.49-96.11h-79.43L256 281.61 390.92 47.92h-79.43L256 144.03z"/>
              <path fill="white" d="M409.4 47.92L256 313.61 102.6 47.92H15.74L256 464.08 496.26 47.92H409.4z"/>
            </svg>
          </div>
          <h3 class="font-medium text-neutral-200 font-poppins">Vue.js 3</h3>
          <p class="text-sm text-neutral-400 font-poppins">Progressive framework</p>
        </div>

        <div class="bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/30 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 shadow-xl shadow-cyan-700/50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 drop-shadow-lg" viewBox="0 0 512 512">
              <path fill="white" d="M429.76 130.07L274.33 36.85a37 37 0 00-36.65 0L82.24 130.06A38.2 38.2 0 0064 162.83V349a38.26 38.26 0 0018.24 32.8L123 406.14l.23.13c20.58 10.53 28.46 10.53 37.59 10.53 32.14 0 52.11-20.8 52.11-54.29V182a8.51 8.51 0 00-8.42-8.58h-22.38a8.51 8.51 0 00-8.42 8.58v180.51a15 15 0 01-6.85 13.07c-5.9 3.6-14.47 2.84-24.14-2.15l-39.06-23.51a1.1 1.1 0 01-.48-.92V165.46a1.32 1.32 0 01.59-1.06l151.84-93a.82.82 0 01.73 0l151.93 93a1.34 1.34 0 01.55 1.1V349a1.28 1.28 0 01-.45 1l-152.06 90.65a1.22 1.22 0 01-.8 0l-38.83-23.06a7.8 7.8 0 00-7.83-.41l-.34.2c-10.72 6.35-13.6 8-23.54 11.62-1.62.59-5.43 2-5.76 5.77s3.29 6.45 6.51 8.32l51.9 31.87a35.67 35.67 0 0018.3 5.07h.58a35.87 35.87 0 0017.83-5.07l155.43-93.13A38.37 38.37 0 00448 349V162.83a38.21 38.21 0 00-18.24-32.76z"/>
              <path fill="white" d="M307.88 318.05c-37.29 0-45.24-10.42-47.6-27.24a8.43 8.43 0 00-8.22-7.32h-19.8a8.44 8.44 0 00-8.26 8.58c0 14.58 5.12 62.17 83.92 62.17 24.38 0 44.66-5.7 58.63-16.49S388 311.26 388 292.55c0-37.55-24.5-47.83-72.75-54.55-49.05-6.82-49.05-10.29-49.05-17.89 0-5.47 0-18.28 35.46-18.28 25.23 0 38.74 3.19 43.06 20a8.35 8.35 0 008.06 6.67h19.87a8.24 8.24 0 006.16-2.86 8.91 8.91 0 002.12-6.44c-2.57-35.55-28.56-53.58-79.24-53.58-46.06 0-73.55 20.75-73.55 55.5 0 38.1 28.49 48.87 71.29 53.33 50 5.17 50 12.71 50 19.37.03 10.38-4.28 24.23-41.55 24.23z"/>
            </svg>
          </div>
          <h3 class="font-medium text-neutral-200 font-poppins">Node.js</h3>
          <p class="text-sm text-neutral-400 font-poppins">Runtime environment</p>
        </div>

        <div class="bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/30 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 shadow-xl shadow-red-700/50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg fill="white" class="h-8 w-8 drop-shadow-lg" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>MusicBrainz icon</title><path d="M11.582 0L1.418 5.832v12.336L11.582 24V10.01L7.1 12.668v3.664c.01.111.01.225 0 .336-.103.435-.54.804-1 1.111-.802.537-1.752.509-2.166-.111-.413-.62-.141-1.631.666-2.168.384-.28.863-.399 1.334-.332V6.619c0-.154.134-.252.226-.308L11.582 3zm.836 0v6.162c.574.03 1.14.16 1.668.387a2.225 2.225 0 0 0 1.656-.717 1.02 1.02 0 1 1 1.832-.803l.004.006a1.022 1.022 0 0 1-1.295 1.197c-.34.403-.792.698-1.297.85.34.263.641.576.891.928a1.04 1.04 0 0 1 .777.125c.768.486.568 1.657-.318 1.857-.886.2-1.574-.77-1.09-1.539.02-.03.042-.06.065-.09a3.598 3.598 0 0 0-1.436-1.166 4.142 4.142 0 0 0-1.457-.369v4.01c.855.06 1.256.493 1.555.834.227.256.356.39.578.402.323.018.568.008.806 0a5.44 5.44 0 0 1 .895.022c.94-.017 1.272-.226 1.605-.446a2.533 2.533 0 0 1 1.131-.463 1.027 1.027 0 0 1 .12-.263 1.04 1.04 0 0 1 .105-.137c.023-.025.047-.044.07-.066a4.775 4.775 0 0 1 0-2.405l-.012-.01a1.02 1.02 0 1 1 .692.272h-.057a4.288 4.288 0 0 0 0 1.877h.063a1.02 1.02 0 1 1-.545 1.883l-.047-.033a1 1 0 0 1-.352-.442 1.885 1.885 0 0 0-.814.354 3.03 3.03 0 0 1-.703.365c.757.555 1.772 1.6 2.199 2.299a1.03 1.03 0 0 1 .256-.033 1.02 1.02 0 1 1-.545 1.88l-.047-.03a1.017 1.017 0 0 1-.27-1.376.72.72 0 0 1 .051-.072c-.445-.775-2.026-2.28-2.46-2.387a4.037 4.037 0 0 0-1.31-.117c-.24.008-.513.018-.866 0-.515-.027-.783-.333-1.043-.629-.26-.296-.51-.56-1.055-.611V18.5a1.877 1.877 0 0 0 .426-.135.333.333 0 0 1 .058-.027c.56-.267 1.421-.91 2.096-2.447a1.02 1.02 0 0 1-.27-1.344 1.02 1.02 0 1 1 .915 1.54 6.273 6.273 0 0 1-1.432 2.136 1.785 1.785 0 0 1 .691.306.667.667 0 0 0 .37.168 3.31 3.31 0 0 0 .888-.222 1.02 1.02 0 0 1 1.787-.79v-.005a1.02 1.02 0 0 1-.773 1.683 1.022 1.022 0 0 1-.719-.287 3.935 3.935 0 0 1-1.168.287h-.05a1.313 1.313 0 0 1-.71-.275c-.262-.177-.51-.345-1.402-.12a2.098 2.098 0 0 1-.707.2V24l10.164-5.832V5.832zm4.154 4.904a.352.352 0 0 0-.197.639l.018.01c.163.1.378.053.484-.108v-.002a.352.352 0 0 0-.303-.539zm-4.99 1.928L7.082 9.5v2l4.5-2.668zm8.385.38a.352.352 0 0 0-.295.165v.002a.35.35 0 0 0 .096.473l.013.01a.357.357 0 0 0 .487-.108.352.352 0 0 0-.301-.541zM16.09 8.647a.352.352 0 0 0-.277.163.355.355 0 0 0 .296.54c.482 0 .463-.73-.02-.703zm3.877 2.477a.352.352 0 0 0-.295.164.35.35 0 0 0 .094.475l.015.01a.357.357 0 0 0 .485-.11.352.352 0 0 0-.3-.539zm-4.375 3.594a.352.352 0 0 0-.291.172.35.35 0 0 0-.04.265.352.352 0 1 0 .33-.437zm4.375.789a.352.352 0 0 0-.295.164v.002a.352.352 0 0 0 .094.473l.015.01a.357.357 0 0 0 .485-.108.352.352 0 0 0-.3-.54zm-2.803 2.488v.002a.347.347 0 0 0-.223.084.352.352 0 0 0 .23.62.347.347 0 0 0 .23-.085.348.348 0 0 0 .12-.24.353.353 0 0 0-.35-.38.347.347 0 0 0-.007 0Z"/></svg>
          </div>
          <h3 class="font-medium text-neutral-200 font-poppins">MusicBrainz</h3>
          <p class="text-sm text-neutral-400 font-poppins">Music database</p>
        </div>

        <div class="bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/30 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl shadow-pink-700/50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg fill="white" class="h-8 w-8 drop-shadow-lg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"/>
            </svg>
          </div>
          <h3 class="font-medium text-neutral-200 font-poppins">TailwindCSS</h3>
          <p class="text-sm text-neutral-400 font-poppins">Utility-first CSS</p>
        </div>
      </div>
    </div>
  </div>

  <!-- benefits section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold font-poppins mb-4">
          <span class="text-neutral-200">Why Choose </span>
          <span class="text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">NextTrack</span>
          <span class="text-neutral-200">?</span>
        </h2>
        <p class="text-lg text-neutral-400 max-w-2xl mx-auto font-poppins">
          Music discovery without compromising your digital privacy
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-8 hover:scale-102 transition-all duration-300">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-green-500 to-emerald-500 shadow-xl shadow-emerald-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium font-poppins mb-2">
                <span class="text-transparent bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text">Complete Privacy</span>
              </h3>
              <p class="text-neutral-400 font-poppins">No accounts, no tracking, no profiling. Your music taste stays private.</p>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-8 hover:scale-102 transition-all duration-300">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl shadow-cyan-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium font-poppins mb-2">
                <span class="text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text">Lightning Fast</span>
              </h3>
              <p class="text-neutral-400 font-poppins">Direct API integration for instant search results and recommendations.</p>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-8 hover:scale-102 transition-all duration-300">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-pink-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium font-poppins mb-2">
                <span class="text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">Smart Discovery</span>
              </h3>
              <p class="text-neutral-400 font-poppins">Algorithms analyse musical relationships to find tracks you'll love.</p>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-8 hover:scale-102 transition-all duration-300">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 text-white bg-gradient-to-br from-orange-500 to-red-500 shadow-xl shadow-red-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium font-poppins mb-2">
                <span class="text-transparent bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text">Zero Data Retention</span>
              </h3>
              <p class="text-neutral-400 font-poppins">Stateless architecture means session data is never stored anywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- faq section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold font-poppins mb-4">
          <span class="text-transparent bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text">Frequently Asked</span>
          <span class="text-neutral-200"> Questions</span>
        </h2>
        <p class="text-lg text-neutral-400 font-poppins">
          Everything you need to know about NextTrack
        </p>
      </div>

      <div class="space-y-6">
        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-6">
          <h3 class="text-lg font-semibold text-neutral-200 font-poppins mb-2">How does NextTrack protect my privacy?</h3>
          <p class="text-neutral-400 font-poppins">Completely stateless - no user data storage, no tracking cookies, no accounts required. Each session is independent and all data clears when you close your browser.</p>
        </div>
        
        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-6">
          <h3 class="text-lg font-semibold text-neutral-200 font-poppins mb-2">Where does the music data come from?</h3>
          <p class="text-neutral-400 font-poppins">All music metadata comes from MusicBrainz, an open-source music encyclopedia that collects and shares music data publicly.</p>
        </div>

        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-6">
          <h3 class="text-lg font-semibold text-neutral-200 font-poppins mb-2">Can I save my playlists permanently?</h3>
          <p class="text-neutral-400 font-poppins">No, all playlists are session-only and disappear when you close your browser. This maintains complete privacy and the stateless design.</p>
        </div>

        <div class="bg-neutral-900/40 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-6">
          <h3 class="text-lg font-semibold text-neutral-200 font-poppins mb-2">How accurate are the recommendations?</h3>
          <p class="text-neutral-400 font-poppins">Recommendations analyse musical relationships, artist connections, and genre patterns within the MusicBrainz database for relevant suggestions.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- call to action section -->
  <div class="relative z-10 py-24 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold font-poppins mb-6">
        <span class="text-neutral-200">Ready to </span>
        <span class="text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text">Discover Music</span>
        <span class="text-neutral-200"> Privately?</span>
      </h2>
      <p class="text-xl text-neutral-300 mb-8 font-poppins">
        Start exploring music without leaving a digital footprint
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/search" 
          class="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium font-poppins px-10 py-4 rounded-2xl shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
        >
          <div class="flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Begin Your Journey
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
            Explore Documentation
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
