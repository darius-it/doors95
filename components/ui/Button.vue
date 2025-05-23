<template>
  <button
    class="font-[400] text-[0.6rem] text-black bg-primary-button transition-all duration-200 ease-in-out tracking-wide px-6 py-1.5 border-2 border-t-white border-l-white border-r-[#858585] border-b-[#858585] border-[#a0a0a0] inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] cursor-pointer"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineEmits(['click'])
</script>