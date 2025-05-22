<template>
  <div class="absolute top-0 left-0 w-full h-full bg-transparent flex flex-col items-center justify-center pointer-events-none">
    <div
      ref="el"
      class="window95 pointer-events-auto"
      :style="style"
    >
      <div
        class="window95-titlebar flex items-center justify-between"
        ref="dragHandle"
        style="cursor: move"
      >
        <span class="window95-title">Window Title</span>
        <button class="window95-close" @click="emit('close')" aria-label="Close">
          ✕
        </button>
      </div>
      <div class="window95-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDraggable } from '@vueuse/core'
import { ref, onMounted, nextTick, defineEmits } from 'vue'

const emit = defineEmits(['close'])
const el = ref<HTMLElement | null>(null)
const dragHandle = ref<HTMLElement | null>(null)

const { x, y, style } = useDraggable(el, {
  handle: dragHandle,
  initialValue: { x: 0, y: 0 },
})

onMounted(async () => {
  await nextTick()
  if (el.value) {
    x.value = (window.innerWidth - el.value.offsetWidth) / 2
    y.value = (window.innerHeight - el.value.offsetHeight) / 2
  }
})
</script>

<style scoped>
/* ...styles unchanged... */
.window95 {
  position: absolute;
  min-width: 320px;
  min-height: 200px;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-bottom-color: #808080;
  border-right-color: #808080;
  box-shadow: 4px 4px 0 #0008;
  border-radius: 0;
  user-select: none;
}

.window95-titlebar {
  background: #000181;
  color: #fff;
  padding: 4px 8px;
  cursor: move;
  font-family: 'Windows 95', Arial, sans-serif;
  font-size: 10px;
  border-bottom: 2px solid #fff;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}

.window95-title {
  font-weight: bold;
  letter-spacing: 1px;
}

.window95-close {
  background: #c0c0c0;
  border: 2px outset #fff;
  color: #000;
  width: 24px;
  height: 24px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  margin-left: 8px;
  border-radius: 2px;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  transition: background 0.1s;
}
.window95-close:hover {
  background: #ff0000;
  color: #fff;
}

.window95-content {
  padding: 4px;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  height: calc(100% - 36px);
  overflow: auto;
}
</style>
