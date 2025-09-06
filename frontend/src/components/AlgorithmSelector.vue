<template>
  <div class="grid gap-3">
    <div 
      v-for="algorithm in algorithms" 
      :key="algorithm.value"
      class="group relative bg-neutral-800/40 backdrop-blur-sm border border-neutral-600/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-neutral-700/60 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
      :class="[
        selectedAlgorithm === algorithm.value 
          ? 'border-cyan-400/60 bg-gradient-to-r from-cyan-900/30 to-blue-900/20 shadow-md shadow-cyan-700/30' 
          : ''
      ]"
      @click="selectAlgorithm(algorithm.value)"
    >
      <!-- selection indicator -->
      <div v-if="selectedAlgorithm === algorithm.value" 
           class="absolute top-1/2 right-4 transform -translate-y-1/2">
        <svg class="size-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </div>

      <div class="flex items-center gap-3">
        <!-- icon -->
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-700/80 to-neutral-600/60 border border-neutral-500/50 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-500/40 group-hover:shadow-lg group-hover:shadow-cyan-500/10"
             :class="selectedAlgorithm === algorithm.value ? 'border-cyan-400/60 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-lg shadow-cyan-500/10' : ''">
          <svg
            class="size-5 transition-colors duration-300"
            :class="selectedAlgorithm === algorithm.value ? 'text-cyan-300' : 'text-neutral-300 group-hover:text-cyan-400'"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path v-if="algorithm.value === 'hybrid'"  
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
            />
            <path v-else-if="algorithm.value === 'artist_based'"
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
            <path v-else-if="algorithm.value === 'tag_based'"
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
            />
            <path v-else-if="algorithm.value === 'temporal'"
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
            <path v-else-if="algorithm.value === 'length_based'"
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path v-else
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
          </svg>
        </div>

        <!-- algorithms -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2">
            <h5 class="font-semibold text-base text-neutral-100 transition-colors duration-300 font-poppins"
                :class="selectedAlgorithm === algorithm.value ? 'text-white' : 'group-hover:text-cyan-200'">
              {{ algorithm.title }}
            </h5>
            <div v-if="algorithm.recommended" 
                 class="px-2 py-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-xs font-medium text-cyan-300 shadow-sm">
              Recommended
            </div>
          </div>
          <p class="text-neutral-400 text-sm font-poppins leading-relaxed pr-8">{{ algorithm.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlgorithmSelector',
  props: {
    modelValue: {
      type: String,
      default: 'hybrid'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      algorithms: [
        {
          value: 'hybrid',
          title: 'Smart Mix',
          description: 'Combines multiple techniques for the best overall recommendations',
          recommended: true
        },
        {
          value: 'artist_based',
          title: 'Similar Artists',
          description: 'Finds music from artists similar to those in your playlist'
        },
        {
          value: 'tag_based',
          title: 'Tag Matching',
          description: 'Discovers tracks that match your playlist\'s musical style'
        },
        {
          value: 'temporal',
          title: 'Era Discovery',
          description: 'Finds music from similar time periods and musical eras'
        },
        {
          value: 'length_based',
          title: 'Duration Matching',
          description: 'Recommends tracks with similar lengths for consistent flow'
        },
        {
          value: 'random',
          title: 'Random Discovery',
          description: 'Completely random selection for exploring new music outside your comfort zone'
        }
      ]
    };
  },
  computed: {
    selectedAlgorithm() {
      return this.modelValue;
    }
  },
  methods: {
    selectAlgorithm(value) {
      this.$emit('update:modelValue', value);
    }
  }
};
</script>
