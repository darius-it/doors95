<template>
  <div 
    class="absolute top-0 left-0 w-full h-full bg-transparent flex flex-col items-center justify-center pointer-events-none overflow-hidden"
    :style="{ zIndex: windowZIndex }"
    v-show="isOpen"
  >
    <div
      ref="el"
      class="absolute min-w-[400px] min-h-[220px] bg-[#c0c0c0] border-2 border-white border-b-[#808080] border-r-[#808080] shadow-[4px_4px_0_#0008] rounded-none select-none pointer-events-auto"
      :style="style"
      @click="$emit('clickInsideWindow', name)"
    >
      <div
        class="flex items-center justify-between bg-[#000181] text-white px-2 py-1 cursor-move font-bold tracking-wider text-[10px] font-['Windows_95',Arial,sans-serif] border-b-2 border-white rounded-t-[2px]"
        ref="dragHandle"
        style="cursor: move"
      >
        <span class="font-bold tracking-widest">{{ name }}</span>
        <button
          class="bg-[#c0c0c0] border-2 border-white outset-border text-black w-6 h-6 text-base leading-5 text-center cursor-pointer ml-2 rounded-[2px] font-['MS_Sans_Serif',Arial,sans-serif] transition-colors duration-100 hover:bg-red-600 hover:text-white"
          @click="emit('close', name)"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div class="p-1 h-[calc(100%-36px)] overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDraggable } from '@vueuse/core'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  lastClickedWindow: {
    type: String,
    default: '',
  },
  currentlyOpenWindows: {
    type: Array
  },
})

const emit = defineEmits(['close', 'clickInsideWindow'])
const el = ref<HTMLElement | null>(null)
const dragHandle = ref<HTMLElement | null>(null)

const windowZIndex = computed(() => {
  return props.lastClickedWindow === props.name ? 1000 : 0
})

const isOpen = computed(() => {
  if (!props.currentlyOpenWindows) {
    return false
  }
  return props.currentlyOpenWindows.includes(props.name)
})

const { x, y, style } = useDraggable(el, {
  handle: dragHandle,
  initialValue: { 
    x: 1000, 
    y: 450
  },
  onStart: () => {
    emit('clickInsideWindow', props.name)
  },
})

let initialized = false

onMounted(async () => {
  await nextTick()
  if (el.value && !initialized) {
    // Center the window
    x.value = 370
    y.value = 75
    initialized = true
  }
})
</script>

<style scoped>
.outset-border {
  border: 2px outset #fff;
}
</style>
