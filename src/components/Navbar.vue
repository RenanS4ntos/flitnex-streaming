<script setup>
import logo from '../assets/logo.png'
import { PhMagnifyingGlass, PhBell } from "@phosphor-icons/vue"
</script>

<template>
  <div class="w-full py-5 px-[6%] flex justify-between fixed text-lg text-[#e5e5e5] bg-custom-gradient z-[1]">
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
    <PhMagnifyingGlass size="24"/>
    <PhBell size="24" />
   </div>
  </div>
</template>