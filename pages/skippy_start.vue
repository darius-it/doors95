<template>
  <div v-if="!installed" class="skippy-overlay-blocker" style="z-index:9500; position:fixed; inset:0;">
    <div class="skippy-window95 skippy-window95-large">
      <div class="skippy-titlebar">
        <span>System Setup</span>
        <span class="skippy-close-disabled">✕</span>
      </div>
      <div class="skippy-window-content">
        <div class="skippy-text">Install Skippy to Start</div>
        <UiButton
          v-if="!installing"
          class="skippy-btn"
          @click="startInstall"
          style="font-size: 1.3rem; padding: 1rem 2.5rem;"
        >
          Install Skippy
        </UiButton>
        
        <div v-else class="skippy-loading">
          <div class="skippy-bar-outer">
            <div class="skippy-bar-inner" :style="{ width: loadingPercent + '%' }"></div>
          </div>
          <span class="skippy-loading-text">Installing...</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="skippy-content">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits } from 'vue'
const installed = ref(false)
const installing = ref(false)
const loadingPercent = ref(0)
const fading = ref(false)
const emit = defineEmits(['skippy-installed'])

function startInstall() {
  installing.value = true
  loadingPercent.value = 0
  const interval = setInterval(() => {
    loadingPercent.value += Math.random() * 30 + 20
    if (loadingPercent.value >= 50 && loadingPercent.value < 100 && !fading.value) {
      fading.value = true
    }
    if (loadingPercent.value >= 100) {
      loadingPercent.value = 100
      clearInterval(interval)
      setTimeout(() => {
        installed.value = true
        emit('skippy-installed')
      }, 1200) // match fade duration
    }
  }, 180)
}
</script>

<style scoped>
.skippy-overlay-blocker {
  position: fixed;
  inset: 0;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  pointer-events: all;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.skippy-window95 {
  min-width: 480px;
  min-height: 180px;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-bottom-color: #808080;
  border-right-color: #808080;
  box-shadow: 4px 4px 0 #0008;
  border-radius: 0;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.skippy-window95-large {
  min-width: 540px;
  min-height: 220px;
}
.skippy-titlebar {
  background: #000181;
  color: #fff;
  padding: 4px 8px;
  font-family: 'Windows 95', Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  border-bottom: 2px solid #fff;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.skippy-close-disabled {
  color: #888;
  background: #b0b0b0;
  border: 2px outset #eee;
  width: 24px;
  height: 24px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  border-radius: 2px;
  margin-left: 8px;
  margin-bottom: 8px;
  padding-bottom: 4px;
  pointer-events: none;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.skippy-window-content {
  padding: 24px 24px 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 1.2rem;
  flex: 1 1 0;
}
.skippy-text {
  color: #222;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}
/* .skippy-btn {
  background: #222;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 1rem 2.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  margin: 0 auto;
  display: block;
} */
.skippy-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}
.skippy-bar-outer {
  width: 180px;
  height: 18px;
  background: #111;
  border-radius: 0;
  overflow: hidden;
  margin-bottom: 0.5rem;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px #222;
  image-rendering: pixelated;
}
.skippy-bar-inner {
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    #00eaff 0px,
    #00eaff 8px,
    #00ffb3 8px,
    #00ffb3 16px
  );
  transition: width 0.7s;
  image-rendering: pixelated;
}
.skippy-loading-text {
  color: #fff;
  font-size: 1rem;
  letter-spacing: 1px;
}
.skippy-content {
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.skippy-overlay[style*='display: none'],
.skippy-content.skippy-slide {
  display: none !important;
}
</style>