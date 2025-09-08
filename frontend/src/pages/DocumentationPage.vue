<template>
  <div class="min-h-screen overflow-hidden">
    <div class="relative z-10 p-8 max-w-6xl mx-auto">
      <!-- header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide mb-4 font-poppins">
          NextTrack Documentation
        </h1>
        <p class="text-neutral-400 text-lg max-w-2xl mx-auto font-poppins">
          Privacy-first music discovery API with intelligent recommendation algorithms
        </p>
      </div>

      <!-- quick navigation -->
      <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-6 mb-8 shadow-xl">
        <h2 class="text-xl font-semibold text-neutral-200 mb-4 font-poppins">Quick Navigation</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#getting-started" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800/50 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 text-neutral-300 hover:text-cyan-300 border border-neutral-700/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            Getting Started
          </a>
          <a href="#algorithms" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800/50 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 text-neutral-300 hover:text-cyan-300 border border-neutral-700/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Algorithms
          </a>
          <a href="#api-reference" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800/50 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 text-neutral-300 hover:text-cyan-300 border border-neutral-700/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            API Reference
          </a>
          <a href="#technical" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800/50 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 text-neutral-300 hover:text-cyan-300 border border-neutral-700/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            Technical Info
          </a>
        </div>
      </div>

      <!-- getting started section -->
      <div id="getting-started" class="mb-12">
        <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-8 shadow-xl">
          <h2 class="text-2xl font-bold text-neutral-100 mb-6 flex items-center gap-3 font-poppins">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            Getting Started
          </h2>
          
          <div class="space-y-6">
            <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-cyan-300 mb-3 font-poppins">What is NextTrack?</h3>
              <p class="text-neutral-300 mb-4 font-poppins">
                NextTrack is a <span class="text-cyan-300 font-medium">privacy-first music discovery API</span> that provides intelligent recommendations without storing any user data. 
                It analayses your music preferences in real-time and suggests new tracks using advanced algorithms.
              </p>
              <div class="bg-cyan-900/20 border border-cyan-700/50 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-cyan-300 font-medium font-poppins">Zero Data Storage</span>
                </div>
                <p class="text-neutral-400 text-sm font-poppins">
                  No accounts, no tracking, no data persistence. Your music preferences stay with you.
                </p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 text-white bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-700/50 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 class="text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text font-semibold font-poppins">How It Works</h4>
                </div>
                <ol class="space-y-3 text-neutral-300 text-sm font-poppins">
                  <li class="flex items-start gap-3">
                    <div class="w-6 h-6 bg-neutral-700 border border-neutral-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span class="text-neutral-300 text-xs font-bold">1</span>
                    </div>
                    <span>Create playlists with your favorite tracks</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-6 h-6 bg-neutral-700 border border-neutral-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span class="text-neutral-300 text-xs font-bold">2</span>
                    </div>
                    <span>Choose a recommendation algorithm</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-6 h-6 bg-neutral-700 border border-neutral-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span class="text-neutral-300 text-xs font-bold">3</span>
                    </div>
                    <span>Get personalised music suggestions</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-6 h-6 bg-neutral-700 border border-neutral-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span class="text-neutral-300 text-xs font-bold">4</span>
                    </div>
                    <span>Listen instantly via YouTube links</span>
                  </li>
                </ol>
              </div>

              <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 text-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-700/50 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h4 class="text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text font-semibold font-poppins">Key Features</h4>
                </div>
                <ul class="space-y-3 text-neutral-300 text-sm font-poppins">
                  <li class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-sm shadow-cyan-400/50"></div>
                    <span>6 intelligent recommendation algorithms with mathematical foundations</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-sm shadow-purple-400/50"></div>
                    <span>Real-time MusicBrainz integration with metadata enrichment</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-sm shadow-emerald-400/50"></div>
                    <span>Stateless RESTful API design with no data persistence</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full shadow-sm shadow-orange-400/50"></div>
                    <span>Instant YouTube streaming links with dynamic generation</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full shadow-sm shadow-red-400/50"></div>
                    <span>Privacy-first architecture with zero user tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- algorithms section -->
      <div id="algorithms" class="mb-12">
        <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-8 shadow-xl">
          <h2 class="text-2xl font-bold text-neutral-100 mb-6 flex items-center gap-3 font-poppins">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Recommendation Algorithms
          </h2>
          <p class="text-neutral-400 mb-6 font-poppins">
            Choose from 6 intelligent algorithms to discover music that matches your taste. Each algorithm uses sophisticated mathematical approaches for optimal recommendation quality.
          </p>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 h-32 flex flex-col justify-center">
                <h4 class="text-cyan-400 font-medium mb-2 font-poppins flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-sm shadow-cyan-400/50"></div>
                  Smart Mix (Recommended)
                </h4>
                <p class="text-neutral-400 text-sm font-poppins mb-1">Dynamic fusion combining all algorithms with adaptive weighting based on playlist analysis</p>
                <div class="text-xs text-neutral-500">
                  Uses artist diversity, tag distribution entropy, and temporal variance for optimal recommendations
                </div>
              </div>
              
              <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 h-32 flex flex-col justify-center">
                <h4 class="text-purple-400 font-medium mb-2 font-poppins flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-sm shadow-purple-400/50"></div>
                  Similar Artists
                </h4>
                <p class="text-neutral-400 text-sm font-poppins mb-1">Uses Jaccard similarity for categorical matching to discover artists with shared tag patterns</p>
                <div class="text-xs text-neutral-500">
                  Encourages diversity while maintaining genre familiarity
                </div>
              </div>
              
              <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 h-32 flex flex-col justify-center">
                <h4 class="text-emerald-400 font-medium mb-2 font-poppins flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-sm shadow-emerald-400/50"></div>
                  Tag Matching
                </h4>
                <p class="text-neutral-400 text-sm font-poppins mb-1">Comprehensive Jaccard similarity across all playlist tags for genre and mood consistency</p>
                <div class="text-xs text-neutral-500">
                  Analayses folksonomy tags and metadata for precise style matching
                </div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 h-32 flex flex-col justify-center">
                <h4 class="text-orange-400 font-medium mb-2 font-poppins flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full shadow-sm shadow-orange-400/50"></div>
                  Era Discovery
                </h4>
                <p class="text-neutral-400 text-sm font-poppins mb-1">Gaussian proximity calculations with era-based similarity and decade clustering</p>
                <div class="text-xs text-neutral-500">
                  Temporal spread analysis for era-specific playlists and nostalgia trips
                </div>
              </div>
              
              <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 h-32 flex flex-col justify-center">
                <h4 class="text-yellow-400 font-medium mb-2 font-poppins flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-sm shadow-yellow-400/50"></div>
                  Duration Matching
                </h4>
                <p class="text-neutral-400 text-sm font-poppins mb-1">Cosine similarity on normalized duration features with statistical distribution analysis</p>
                <div class="text-xs text-neutral-500">
                  Duration clustering and length variability for consistent playlist flow
                </div>
              </div>
              
              <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 h-32 flex flex-col justify-center">
                <h4 class="text-pink-400 font-medium mb-2 font-poppins flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-400 rounded-full shadow-sm shadow-pink-400/50"></div>
                  Random Discovery
                </h4>
                <p class="text-neutral-400 text-sm font-poppins mb-1">Deterministic random selection with timestamp-based seeding for serendipitous exploration</p>
                <div class="text-xs text-neutral-500">
                  Maximum diversity factor for breaking out of music bubbles
                </div>
              </div>
            </div>
          </div>

          <!-- mathematical foundations section -->
          <div class="mt-8 bg-gradient-to-r from-neutral-800/50 to-neutral-700/30 border border-neutral-600/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-neutral-200 mb-4 font-poppins">Mathematical Foundations</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-cyan-400 font-medium mb-3 font-poppins">Similarity Algorithms</h4>
                <ul class="space-y-3 text-neutral-300 text-sm font-poppins">
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span class="text-purple-300 font-medium">Jaccard Similarity:</span> 
                      <code class="ml-2 px-2 py-1 bg-neutral-900/60 rounded text-xs font-mono text-purple-200">
                        J(A,B) = |A ∩ B| / |A ∪ B|
                      </code>
                      <div class="text-xs text-neutral-400 mt-1">for categorical features (artists, tags)</div>
                    </div>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span class="text-yellow-300 font-medium">Cosine Similarity:</span> 
                      <code class="ml-2 px-2 py-1 bg-neutral-900/60 rounded text-xs font-mono text-yellow-200">
                        cos(θ) = A · B / (||A|| · ||B||)
                      </code>
                      <div class="text-xs text-neutral-400 mt-1">for continuous features (duration, year)</div>
                    </div>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span class="text-orange-300 font-medium">Gaussian Proximity:</span> 
                      <code class="ml-2 px-2 py-1 bg-neutral-900/60 rounded text-xs font-mono text-orange-200">
                        G(x,μ) = e^(-d²/2σ²)
                      </code>
                      <div class="text-xs text-neutral-400 mt-1">for temporal similarity</div>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 class="text-cyan-400 font-medium mb-3 font-poppins">Hybrid Algorithm Features</h4>
                <ul class="space-y-2 text-neutral-300 text-sm font-poppins">
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span class="text-cyan-300 font-medium">Dynamic Weighting:</span> Adaptive weights based on playlist characteristics
                    </div>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span class="text-emerald-300 font-medium">Entropy Analysis:</span> Shannon entropy for tag distribution diversity
                    </div>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span class="text-blue-300 font-medium">Consensus Scoring:</span> Multi-algorithm agreement for confidence scoring
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- api reference section -->
      <div id="api-reference" class="mb-12">
        <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-8 shadow-xl">
          <h2 class="text-2xl font-bold text-neutral-100 mb-6 flex items-center gap-3 font-poppins">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            API Reference
          </h2>
          <p class="text-neutral-400 mb-6 font-poppins">
            Complete API reference for NextTrack's stateless music discovery platform. 
            All endpoints are session-only with zero data persistence.
          </p>

          <div class="space-y-8">
            <!-- search endpoints -->
            <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
              <h3 class="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-3 font-poppins">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Search Endpoints
              </h3>
              
              <div class="space-y-4">
                <div class="bg-neutral-900/50 rounded-lg p-4">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono shadow-lg shadow-green-500/30">GET</span>
                    <code class="text-cyan-300 font-mono">/api/music/search</code>
                  </div>
                  <p class="text-neutral-300 text-sm font-poppins">Search for tracks using query parameters with MusicBrainz integration</p>
                </div>
              </div>
            </div>

            <!-- recommendation endpoints -->
            <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
              <h3 class="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-3 font-poppins">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Recommendation Endpoints
              </h3>
              
              <div class="bg-neutral-900/50 rounded-lg p-4">
                <div class="flex items-center gap-3 mb-2">
                  <span class="bg-blue-500 text-white px-2 py-1 rounded text-xs font-mono shadow-lg shadow-blue-500/30">POST</span>
                  <code class="text-cyan-300 font-mono">/api/music/recommend/</code>
                </div>
                <p class="text-neutral-300 text-sm mb-3 font-poppins">Generate recommendations based on a playlist</p>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="text-neutral-200 font-medium mb-2 font-poppins">Available Algorithms</h4>
                    <ul class="space-y-1 text-xs font-poppins">
                      <li><code class="text-cyan-400 bg-neutral-800/50 px-2 py-1 rounded">hybrid</code> <span class="text-neutral-300">- Dynamic fusion with adaptive weighting</span></li>
                      <li><code class="text-purple-400 bg-neutral-800/50 px-2 py-1 rounded">artist_based</code> <span class="text-neutral-300">- Jaccard similarity for artist discovery</span></li>
                      <li><code class="text-emerald-400 bg-neutral-800/50 px-2 py-1 rounded">tag_based</code> <span class="text-neutral-300">- Comprehensive tag matching</span></li>
                      <li><code class="text-orange-400 bg-neutral-800/50 px-2 py-1 rounded">temporal</code> <span class="text-neutral-300">- Gaussian proximity for era similarity</span></li>
                      <li><code class="text-yellow-400 bg-neutral-800/50 px-2 py-1 rounded">length_based</code> <span class="text-neutral-300">- Cosine similarity for duration matching</span></li>
                      <li><code class="text-pink-400 bg-neutral-800/50 px-2 py-1 rounded">random</code> <span class="text-neutral-300">- Deterministic random discovery</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="text-neutral-200 font-medium mb-2 font-poppins">Request Body Example</h4>
                    <div class="bg-neutral-800/50 rounded p-3 font-mono text-xs">
                      <pre><span class="text-neutral-400">{</span>
  <span class="text-blue-400">"playlist"</span><span class="text-neutral-400">: {</span>
    <span class="text-blue-400">"id"</span><span class="text-neutral-400">:</span> <span class="text-green-400">"uuid"</span><span class="text-neutral-400">,</span>
    <span class="text-blue-400">"tracks"</span><span class="text-neutral-400">: [</span>
      <span class="text-neutral-400">{</span>
        <span class="text-blue-400">"id"</span><span class="text-neutral-400">:</span> <span class="text-green-400">"uuid"</span><span class="text-neutral-400">,</span>
        <span class="text-blue-400">"title"</span><span class="text-neutral-400">:</span> <span class="text-green-400">"Track Name"</span><span class="text-neutral-400">,</span>
        <span class="text-blue-400">"artist"</span><span class="text-neutral-400">:</span> <span class="text-green-400">"Artist Name"</span><span class="text-neutral-400">,</span>
        <span class="text-blue-400">"tags"</span><span class="text-neutral-400">: [</span><span class="text-green-400">"rock"</span><span class="text-neutral-400">,</span> <span class="text-green-400">"alternative"</span><span class="text-neutral-400">],</span>
        <span class="text-blue-400">"release_year"</span><span class="text-neutral-400">:</span> <span class="text-yellow-400">2020</span><span class="text-neutral-400">,</span>
        <span class="text-blue-400">"duration"</span><span class="text-neutral-400">:</span> <span class="text-yellow-400">180000</span>
      <span class="text-neutral-400">}</span>
    <span class="text-neutral-400">]</span>
  <span class="text-neutral-400">},</span>
  <span class="text-blue-400">"algorithm"</span><span class="text-neutral-400">:</span> <span class="text-cyan-400">"hybrid"</span>
<span class="text-neutral-400">}</span></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- technical info section -->
      <div id="technical" class="mb-12">
        <div class="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700/50 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-3 font-poppins">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            Technical Information
          </h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-neutral-200 mb-4 font-poppins">Technology Stack</h3>
              <ul class="space-y-3 text-neutral-300 text-sm font-poppins">
                <li class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-sm shadow-cyan-400/50 mt-2"></div>
                  <div>
                    <span class="text-cyan-300 font-medium">Frontend:</span> Vue.js 3, TailwindCSS, Vite
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-sm shadow-emerald-400/50 mt-2"></div>
                  <div>
                    <span class="text-emerald-300 font-medium">Backend:</span> Node.js, Express.js
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-sm shadow-purple-400/50 mt-2"></div>
                  <div>
                    <span class="text-purple-300 font-medium">APIs:</span> MusicBrainz for metadata, YouTube Data API for streaming links
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full shadow-sm shadow-orange-400/50 mt-2"></div>
                  <div>
                    <span class="text-orange-300 font-medium">Architecture:</span> Stateless, zero persistence
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-neutral-200 mb-4 font-poppins">Privacy & Security</h3>
              <ul class="space-y-3 text-neutral-300 text-sm font-poppins">
                <li class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-sm shadow-green-400/50 mt-2"></div>
                  <div>No user accounts or registration required</div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-sm shadow-green-400/50 mt-2"></div>
                  <div>Session data stored only in browser memory</div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-sm shadow-green-400/50 mt-2"></div>
                  <div>Real-time API calls with no data logging</div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-sm shadow-green-400/50 mt-2"></div>
                  <div>Complete data reset on browser close</div>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-8 bg-neutral-800/30 border border-neutral-700/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-neutral-200 mb-4 font-poppins">Built for Developers</h3>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-neutral-900/50 rounded-lg p-4">
                <h4 class="text-cyan-400 font-medium mb-2 font-poppins">RESTful API</h4>
                <p class="text-neutral-400 text-xs font-poppins">Clean endpoints with JSON responses and standard HTTP methods</p>
              </div>
              <div class="bg-neutral-900/50 rounded-lg p-4">
                <h4 class="text-purple-400 font-medium mb-2 font-poppins">Stateless Design</h4>
                <p class="text-neutral-400 text-xs font-poppins">Self-contained requests with no server-side session management</p>
              </div>
              <div class="bg-neutral-900/50 rounded-lg p-4">
                <h4 class="text-emerald-400 font-medium mb-2 font-poppins">Academic Project</h4>
                <p class="text-neutral-400 text-xs font-poppins">Privacy-focused algorithms with comprehensive documentation and evaluation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentationPage'
}
</script>
