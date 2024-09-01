<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logo from '../assets/logo.png'
import { PhMagnifyingGlass, PhBell } from "@phosphor-icons/vue"

const navbarClass = ref('')

const handleScroll = () => {
  if (window.scrollY >= 60) {
    navbarClass.value = 'bg-[#202024] z-50'
  } else {
    navbarClass.value = ''
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div :class="['w-full py-1 px-[6%] flex justify-between fixed text-lg text-[#e5e5e5] bg-custom-gradient z-[1]', navbarClass]">
   <div class="flex items-center gap-10">
    <img :src="logo" alt="flitnex-logo" class="w-[90]">
    <ul class="flex gap-5">
      <router-link to="/">
        <li class="py-2 px-4 cursor-pointer hover:bg-white/5 hover:rounded-full" >Home</li>
      </router-link>
      <router-link to="/movies">
        <li class="py-2 px-4 cursor-pointer hover:bg-white/5 hover:rounded-full" >Filmes</li>
      </router-link>
      <router-link to="/series">
        <li class="py-2 px-4 cursor-pointer hover:bg-white/5 hover:rounded-full" >Séries</li>
      </router-link>
    </ul>
   </div>
   <div class="flex gap-5 items-center">
    <div class="p-2 cursor-pointer hover:bg-white/5 hover:rounded-full">
      <PhMagnifyingGlass size="30" />
    </div>
    <div class="p-2 cursor-pointer hover:bg-white/5 hover:rounded-full">
      <PhBell size="30" />
    </div>
   </div>
  </div>
</template>