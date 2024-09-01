<script setup>
import { PhCaretCircleLeft } from '@phosphor-icons/vue'
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center px-2 py-4">
    <button
      class="top-5 left-5 absolute border-none bg-transparent rounded-full flex items-center justify-center hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition duration-200"
      aria-label="Previous"
    >
    <PhCaretCircleLeft :size="50" />
    </button>
    <iframe
      class="rounded-xl"
      width="90%" 
      height="90%"
      src="https://www.youtube.com/embed/tgbNymZ7vqY"
      title="trailer"
      frameborder="0"
      allowFullScreen
    ></iframe>
    <div class="p-10 flex items-center justify-between w-[90%] card mt-3">
      <p>Published Date</p>
      <p>Name</p>
      <p>Type</p>
    </div>
  </div>
</template>