<template>
  <div
    class="loading-screen"
    :class="{ 'fade-out': stage === 2 && fadeOut }"
    v-if="stage < 3"
  >
    <!-- BIOS Boot Screen -->
    <div v-if="stage === 0" class="bios-screen">
      <div class="bios-text">
        <div v-for="(line, idx) in biosLines" :key="idx" v-show="biosVisibleLines > idx">
          {{ line }}
        </div>
      </div>
    </div>

    <!-- Windows Loading Screen -->
    <div v-else-if="stage === 1" class="loading-window">
      <div class="window-title-bar">
        <span class="window-title">Loading...</span>
        <span class="window-controls">
          <span class="window-btn minimize"></span>
          <span class="window-btn maximize"></span>
          <span class="window-btn close"></span>
        </span>
      </div>
      <div class="window-content">
        <div class="loading-text">Welcome to Doors95</div>
        <div class="progress-bar">
          <div class="progress-bar-inner" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="loading-hint">Loading files...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const stage = ref(0) // 0: BIOS, 1: Loading, 2: Fade out, 3: Gone
const progress = ref(0)
const fadeOut = ref(false)

// BIOS lines and staggered reveal
const biosLines = [
  'AMI BIOS (C)1995 American Megatrends Inc.',
  '640K System RAM Passed',
  '384K Cache SRAM Passed',
  'Detecting IDE Drives ...',
  'Press DEL to enter Setup'
]
const biosVisibleLines = ref(0)

onMounted(() => {
  // Stagger BIOS lines
  let biosIdx = 0
  const biosInterval = setInterval(() => {
    biosVisibleLines.value++
    biosIdx++
    if (biosIdx >= biosLines.length) clearInterval(biosInterval)
  }, 500)

  // BIOS screen for 3.5s (increased timeout)
  setTimeout(() => {
      stage.value = 1
      // Start loading progress (faster)
      const interval = setInterval(() => {
        if (progress.value < 100) {
          progress.value += Math.random() * 20 // increase step for faster progress
          if (progress.value > 100) progress.value = 100
        }
        if (progress.value >= 100) {
          clearInterval(interval)
          // Wait a bit, then fade out
          setTimeout(() => {
            fadeOut.value = true
            stage.value = 2
            // After fade, remove from DOM
            setTimeout(() => {
              stage.value = 3
            }, 800)
          }, 400) // shorter wait before fade out
        }
      }, 80) // faster interval
    }, 3000) // BIOS screen for 2s
  })
</script>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  background: #008080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.8s cubic-bezier(.4,2,.6,1);
  opacity: 1;
}
.loading-screen.fade-out {
  opacity: 0;
  pointer-events: none;
}

/* BIOS Boot Screen */
.bios-screen {
  width: 100%;
  height: 100vh;
  background: #000;
  color: #0f0;
  display: flex;
  align-items: start;
  justify-content: start;
  text-align: left;
}

.bios-text {
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 18px;
  line-height: 1.7;
  text-shadow: 0 0 2px #0f0, 0 0 8px #0f0a;
  padding: 18px 32px;
}

/* Windows Loading Screen (copied from your original) */
.loading-window {
  width: 340px;
  background: #c0c0c0;
  border: 2px solid #000;
  box-shadow: 4px 4px 0 #222;
  border-radius: 4px;
  overflow: hidden;
}

.window-title-bar {
  background: linear-gradient(to bottom, #000080 0%, #3a6ea5 100%);
  color: #fff;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 10px;
  border-bottom: 2px solid #fff;
}

.window-title {
  letter-spacing: 1px;
}

.window-controls {
  display: flex;
  gap: 2px;
}

.window-btn {
  width: 14px;
  height: 14px;
  display: inline-block;
  border: 1px solid #222;
  margin-left: 2px;
  background: #fff;
  box-shadow: 1px 1px 0 #888;
  border-radius: 2px;
  position: relative;
}
.window-btn.minimize::before {
  content: '';
  display: block;
  width: 8px;
  height: 2px;
  background: #000;
  position: absolute;
  left: 2px;
  bottom: 3px;
}
.window-btn.maximize::before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border: 1px solid #000;
  position: absolute;
  left: 2px;
  top: 2px;
}
.window-btn.close {
  background: #f00;
}
.window-btn.close::before {
  content: '';
  display: block;
  width: 8px;
  height: 2px;
  background: #fff;
  position: absolute;
  left: 2px;
  top: 6px;
  transform: rotate(45deg);
}
.window-btn.close::after {
  content: '';
  display: block;
  width: 8px;
  height: 2px;
  background: #fff;
  position: absolute;
  left: 2px;
  top: 6px;
  transform: rotate(-45deg);
}

.window-content {
  padding: 24px 20px 16px 20px;
  text-align: center;
}

.loading-text {
  font-size: 14px;
  margin-bottom: 18px;
  color: #222;
  text-shadow: 1px 1px 0 #fff;
}

.progress-bar {
  width: 100%;
  height: 18px;
  background: #fff;
  border: 2px inset #888;
  margin-bottom: 12px;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
}

.progress-bar-inner {
  height: 100%;
  background: repeating-linear-gradient(
    135deg,
    #008080 0 12px,
    #00ffff 12px 24px
  );
  transition: width 0.3s cubic-bezier(.4,2,.6,1);
  box-shadow: 0 0 6px #00ffff;
}

.loading-hint {
  font-size: 10px;
  color: #444;
  margin-top: 8px;
  text-shadow: 1px 1px 0 #fff;
}
</style>
