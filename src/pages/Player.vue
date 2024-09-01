<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMoviesStore } from '../store/movies'
import { PhCaretCircleLeft } from '@phosphor-icons/vue'

const route = useRoute()
const router = useRouter()
const movieId = route.params.id
const moviesStore = useMoviesStore()
const movie = ref(null)

const goBack = () => {
  router.back()
}

onMounted(async () => {
  await moviesStore.fetchMovieById(movieId)
  movie.value = moviesStore.movie.results.filter(movie => movie.type === "Trailer")[0]
})
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center px-2 py-4">
    <button
      @click="goBack"
      class="top-5 left-5 absolute border-none bg-transparent rounded-full flex items-center justify-center hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition duration-200"
      aria-label="Back"
    >
      <PhCaretCircleLeft :size="50" />
    </button>
    <iframe
      class="rounded-xl"
      width="90%" 
      height="90%"
      :src="`https://www.youtube.com/embed/${movie?.key}`"
      title="trailer"
      frameborder="0"
      allowFullScreen
    ></iframe>
    <div class="p-10 flex items-center justify-between w-[90%] card mt-3">
      <p>{{ movie?.published_at.slice(0,10) }}</p>
      <p>{{ movie?.name }}</p>
      <p>{{ movie?.type }}</p>
    </div>
  </div>
</template>