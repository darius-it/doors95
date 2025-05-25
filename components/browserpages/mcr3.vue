<template>
  <div class="app">
    <h1>Minecraft Installer Grid</h1>
    <p class="subtitle">Click any square to begin downloading the installer.</p>

    <div class="grid">
      <div
        v-for="(button, index) in buttons"
        :key="index"
        class="cell"
        :class="{ downloading: button.isDownloading, complete: button.isComplete }"
        @click="startDownload(index)"
      >
        <div v-if="button.isComplete" class="status">✅</div>
        <div v-else-if="button.isDownloading">
          <div class="progress-bar" :style="{ width: button.progress + '%' }"></div>
          <div class="progress-text">{{ button.progress }}%</div>
        </div>
        <div v-else class="label">⬇️ Download</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const createButtonState = () => ({
  isDownloading: false,
  isComplete: false,
  progress: 0,
  intervalId: null,
})

const buttons = reactive(Array.from({ length: 64 }, createButtonState))
const windows = useOpenWindowsStore();

function startDownload(index) {
  const btn = buttons[index]
  if (btn.isDownloading || btn.isComplete) return

  btn.isDownloading = true
  btn.progress = 0

  btn.intervalId = setInterval(() => {
    const increment = Math.floor(Math.random() * 6) + 3
    btn.progress = Math.min(btn.progress + increment, 100)

    if (btn.progress >= 100) {
      clearInterval(btn.intervalId)
      btn.isDownloading = false
      btn.isComplete = true
      windows.openWindow("Mincefrat Instaler");
    }
  }, 300)
}
</script>

<style scoped>
.app {
  padding: 40px 20px;
  text-align: center;
  background: #1e1e1e;
  min-height: 55vh;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  font-size: 32px;
  margin-bottom: 10px;
  color: #66bb6a;
}

.subtitle {
  margin-bottom: 30px;
  color: #ccc;
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  max-width: 640px;
  margin: 0 auto;
}

.cell {
  background: #2b2b2b;
  border-radius: 6px;
  padding: 10px;
  height: 70px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: #ddd;
}

.cell:hover {
  background: #3a3a3a;
}

.cell.downloading {
  background: #37474f;
}

.cell.complete {
  background: #2e7d32;
}

.label {
  pointer-events: none;
}

.status {
  font-size: 18px;
  pointer-events: none;
}

.progress-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  background: #66bb6a;
  transition: width 0.3s ease;
  z-index: 0;
}

.progress-text {
  position: relative;
  z-index: 1;
  color: #fff;
  font-weight: bold;
}
</style>
