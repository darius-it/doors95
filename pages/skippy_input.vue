<template>
  <div v-if="visible" class="skippy-overlay-blocker" style="z-index:9500; position:fixed; inset:0;">
    <div class="skippy-window95 skippy-window95-large">
      <div class="skippy-titlebar">
        <span>Welcome!</span>
        <span class="skippy-close-disabled">✕</span>
      </div>
      <div class="skippy-window-content">
        <div class="skippy-text">What's your name?</div>
        <input
          v-model="nameInput"
          class="skippy-input"
          type="text"
          placeholder="Type here..."
          @keyup.enter="submitName"
          autofocus
        />
        <UiButton
          class="skippy-btn"
          :disabled="!nameInput.trim()"
          @click="submitName"
          style="font-size: 1.35rem; padding: 1.1rem 2.9rem;"
        >
        Confirm
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UiButton from '~/components/ui/Button.vue'
import { useMissionsStore } from '~/stores/missions'

const missionsStore = useMissionsStore()
const nameInput = ref(missionsStore.userName || '')
const visible = ref(true)

function submitName() {
  if (!nameInput.value.trim()) return
  missionsStore.userName = nameInput.value.trim()
  missionsStore.triggerEvent('name_submitted')
  visible.value = false
  clientNotification()
}

function clientNotification() {
  setTimeout(() => {
    missionsStore.triggerEvent("delay")
  }, 5000)
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
.skippy-input {
  width: 320px;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border: 2px inset #fff;
  border-radius: 4px;
  background: #f8f8f8;
  color: #222;
  margin-bottom: 0.5rem;
  outline: none;
  font-family: 'Windows 95', Arial, sans-serif;
}
.skippy-input:focus {
  border: 2px solid #000181;
  background: #fff;
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
</style>