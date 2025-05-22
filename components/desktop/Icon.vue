<template>
  <div class="gap-1 flex flex-col items-center justify-center" @click="openWindow">
    <div class="self-center flex flex-col items-center justify-center">
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
