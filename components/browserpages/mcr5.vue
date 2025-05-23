<template>
  <div>
    <button
      v-if="!clicked"
      ref="downloadButton"
      :style="buttonStyle"
      class="download-btn"
      @click="startDownload"
    >
      Download Minecraft
    </button>

    <div v-else class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      <p>{{ progress }}%</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const clicked = ref(false)
const progress = ref(0)
const buttonStyle = reactive({ position: 'absolute', top: '50%', left: '50%' })
const downloadButton = ref(null)
let intervalId = null
let downloadInterval = null
const windows = useOpenWindowsStore();

const moveButton = () => {
  const maxWidth = window.innerWidth - 150
  const maxHeight = window.innerHeight - 50
  const left = Math.random() * maxWidth
  const top = Math.random() * maxHeight
  buttonStyle.left = `${left}px`
  buttonStyle.top = `${top}px`
}

const startDownload = () => {
  clicked.value = true
  clearInterval(intervalId)

  downloadInterval = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(downloadInterval)
      windows.openWindow("Mincefrat Instaler");
    } else {
      progress.value += 1
    }
  }, 100)
}

onMounted(() => {
  intervalId = setInterval(moveButton, 500)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
  clearInterval(downloadInterval)
})
</script>

<style scoped>
.download-btn {
  padding: 1em 2em;
  font-size: 1.2em;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  position: absolute;
  transition: top 0.2s ease, left 0.2s ease;
}

.progress-container {
  width: 60%;
  margin: auto;
  text-align: center;
}

.progress-bar {
  height: 25px;
  background-color: #4ade80;
  transition: width 0.2s ease;
  border-radius: 8px;
}
</style>
