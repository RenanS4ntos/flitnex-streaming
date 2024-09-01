<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  movies: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item => typeof item === 'object');
    }
  }
})
</script>

<template>
  <div class="mb-[50px]">
    <h2 class="mb-2 text-2xl font-bold">{{ title }}</h2>
    <Swiper
      :space-between="10"
      :slides-per-view="6"
      :navigation="false"
      :pagination="{ clickable: true }"
      :loop="false"
    >
      <SwiperSlide
        v-for="movie in movies"
        :key="movie.id"
      >
        <router-link :to="`/player/${movie.id}`">
          <div 
            class="relative movie-card cursor-pointer"
          >
            <img 
              :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" 
              alt="Card Image" 
              class="w-[300px] rounded transition-opacity duration-300 ease-in-out hover:opacity-60" 
            />
            <p 
              class="absolute bottom-[10px] ml-4 text-white bg-black bg-opacity-75 p-2 rounded"
            >
              {{ movie.name || movie.title }}
            </p>
          </div>
        </router-link>
      </SwiperSlide>
    </Swiper>
  </div>
</template>