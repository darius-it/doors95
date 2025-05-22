<template>
  <div class="gap-4 inline-block" @click="openWindow">
    <div class="w-full h-full">
      <slot />
    </div>

    <p class="text-[0.8rem] text-white self-center text-center">{{ windowName }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  windowName: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['openWindow']);

const isWindowOpen = ref(false);

const openWindow = () => {
  isWindowOpen.value = !isWindowOpen.value;
  emit('openWindow', props.windowName);
};
</script>
