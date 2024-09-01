<script setup >
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMoviesStore } from '../store/movies'

import hero_banner from '../assets/hero_banner.jpg'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import NavBar from '../components/Navbar.vue'
import TitleCards from '../components/TitleCards.vue'

const route = useRoute()
const routeName = route.name

const moviesStore = useMoviesStore()

onMounted(async () => {
  setTimeout(() => moviesStore.init(), 3000)
})
</script>

<template>
  <div class="w-full h-screen flex flex-col">
    <div v-if="moviesStore.loading" class="flex justify-center items-center h-full">
      <LoadingSpinner />
    </div>
    <div v-else>
      <NavBar />
      <div class="relative">
        <img :src="hero_banner" alt="banner-image" class="w-full h-[500px] mask-gradient object-cover">
        <div class="absolute w-full bottom-0 pl-[6%]">
          <TitleCards 
            v-if="moviesStore.movies_popular && moviesStore.movies_popular.results && moviesStore.movies_popular.results.length" 
            title="Popular" 
            :movies="moviesStore.movies_popular.results" 
          />
        </div>
      </div>

      <div class="pl-[6%]">
        <div v-if="routeName === 'home'">
          <TitleCards 
            v-if="moviesStore.movies_top_rated && moviesStore.movies_top_rated.results && moviesStore.movies_top_rated.results.length" 
            title="Melhores filmes da semana" 
            :movies="moviesStore.movies_top_rated.results" 
          />
          <TitleCards 
            v-if="moviesStore.movies && moviesStore.movies.results && moviesStore.movies.results.length" 
            title="Principais escolhas para você" 
            :movies="moviesStore.movies.results" 
          />
          <TitleCards 
            v-if="moviesStore.series && moviesStore.series.results && moviesStore.series.results.length" 
            title="Principais séries da semana" 
            :movies="moviesStore.series.results"
          />
        </div>
        <div v-else-if="routeName === 'movies'">
          <TitleCards 
            v-if="moviesStore.movies_top_rated && moviesStore.movies_top_rated.results && moviesStore.movies_top_rated.results.length" 
            title="Melhores filmes da semana" 
            :movies="moviesStore.movies_top_rated.results" 
          />
          <TitleCards 
            v-if="moviesStore.movies && moviesStore.movies.results && moviesStore.movies.results.length" 
            title="Principais escolhas para você" 
            :movies="moviesStore.movies.results" 
          />
        </div>
        <div v-else-if="routeName === 'series'">
          <TitleCards 
            v-if="moviesStore.series && moviesStore.series.results && moviesStore.series.results.length" 
            title="Principais séries da semana" 
            :movies="moviesStore.series.results"
          />
        </div>
      </div>
    </div>
  </div>
</template>