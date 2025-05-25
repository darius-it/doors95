<template>
  <div class="min-h-[55vh] flex items-center justify-center px-4 wallpaper">
    <div
      class="bg-white shadow-lg p-8 rounded-lg w-full max-w-md text-center select-none"
      style="user-select: none;"
    >
      <h1 class=" text-green-700 mb-6">
        Download Minecraft
      </h1>
      <p class="mb-8 text-gray-600 text-sm md:text-base">
        Experience the blocky adventure!
      </p>

      <button
        @click="startDownload"
        :disabled="isDownloading"
        class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded transition duration-300 disabled:opacity-50 uppercase tracking-wide text-xs md:text-sm"
      >
        {{ isDownloading ? 'Downloading...' : 'Download' }}
      </button>

      <div v-if="isDownloading" class="mt-8">
        <div class="w-full bg-gray-300 h-5 rounded overflow-hidden shadow-inner">
          <div
            class="h-full bg-green-500 transition-all duration-200"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <p class="mt-2 text-gray-700 font-mono text-xs md:text-sm">
          {{ progress }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const progress = ref(0);
const isDownloading = ref(false);
let intervalId;
const windows = useOpenWindowsStore();

function startDownload() {
  if (isDownloading.value) return;

  isDownloading.value = true;
  progress.value = 0;

  intervalId = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(intervalId);
      isDownloading.value = false;
      windows.openWindow("Minecraft Installer");
    } else {
      // Increase by 5-15% per tick for visible progress
      progress.value += Math.floor(Math.random() * 11) + 5;
      if (progress.value > 100) progress.value = 100;
    }
  }, 300);
}
</script>

<style scoped>
.pixel-font {
  font-family: 'Press Start 2P', monospace;
  letter-spacing: 2px;
  text-shadow:
    1px 1px 0 #000,
    2px 2px 0 #000;
  /* For a subtle pixel bold effect */
}

button.pixel-font {
  /* Slightly smaller letter spacing on button text */
  letter-spacing: 1.5px;
  text-shadow:
    1px 1px 0 #000;
}

.wallpaper{
    background-image: url("/images/wallpaper.png");
    background-size: cover;
}
</style>
