<template>
  <div class="text-[1.3rem] tracking-wider z-[999]" @click="windows.openWindow('Antivirus')">
    <img :src=source alt="Smiley" width="24px" height="24px" class="rounded-full">
  </div>
</template>

<script lang="ts" setup>
const { infectionLevel } = storeToRefs(useMissionsStore())

const windows = useOpenWindowsStore()

const source = computed(() => {
  if (infectionLevel.value < 25) return '/images/green_smiley.png'
  if (infectionLevel.value < 50) return '/images/yellow_smiley.png'
  if (infectionLevel.value < 75) return '/images/red_smiley.png'
  else return '/images/cursed_smiley.jpg'
})
</script>