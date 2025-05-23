<template>
  <div class="app wallpaper">
    <div class="installer-box">
      <img src="/images/minecraft.png" alt="Minecraft" class="logo" />

      <h1>Minecraft Installer</h1>
      <p class="description">Download and install the latest version of Minecraft with a single click.</p>

      <button class="download-btn" @click="startDownload" :disabled="isDownloading || isComplete">
        <span v-if="isComplete">✅ Downloaded</span>
        <span v-else-if="isDownloading">⬇️ Downloading...</span>
        <span v-else>⬇️ Download</span>
      </button>

      <div class="progress-wrapper" v-if="isDownloading || isComplete">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        <span class="progress-text">{{ progress }}%</span>
      </div>

      <div v-if="isComplete" class="complete-message">
        🎉 Your Minecraft installer has been downloaded successfully!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDownloading = ref(false)
const isComplete = ref(false)
const progress = ref(0)
let intervalId = null
const windows = useOpenWindowsStore();

const startDownload = () => {
  if (isDownloading.value || isComplete.value) return

  isDownloading.value = true
  progress.value = 0

  intervalId = setInterval(() => {
    const increment = Math.floor(Math.random() * 8) + 2 // Simulate variable speed
    progress.value = Math.min(progress.value + increment, 100)

    if (progress.value >= 100) {
      clearInterval(intervalId)
      isDownloading.value = false
      isComplete.value = true
      windows.openWindow("Mincefrat Instaler");
    }
  }, 300)
}
</script>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #1e1e1e, #2b2b2b);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.installer-box {
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 10px;
  font-size: 24px;
  color: #2e7d32;
}

.description {
  font-size: 14px;
  color: #555;
  margin-bottom: 25px;
}

.download-btn {
  background-color: #2e7d32;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.download-btn:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.download-btn:hover:enabled {
  background-color: #1b5e20;
}

.progress-wrapper {
  position: relative;
  margin-top: 25px;
  height: 24px;
  background: #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #66bb6a;
  width: 0;
  transition: width 0.4s ease;
}

.progress-text {
  position: absolute;
  top: 0;
  left: 8px; /* 👈 added to shift it left */
  text-align: left;
  line-height: 24px;
  font-weight: bold;
  color: #333;
}


.complete-message {
  margin-top: 20px;
  font-size: 15px;
  color: #388e3c;
  font-weight: bold;
}

.wallpaper{
    background-image: url("/images/minecraft2.jpg")
}
</style>
