<template>
  <div class="text-[1.3rem] tracking-wider px-4 py-1.5">
    <img :src=source alt="Smiley" width="24px" height="24px">
  </div>
</template>

<script lang="ts" setup>

const infectionLevel = useMissionsStore().infectionLevel

const source = computed(() => {
  if (infectionLevel < 25) return '/images/green_smiley.png'
  if (infectionLevel < 50) return '/images/yellow_smiley.png'
  if (infectionLevel < 75) return '/images/red_smiley.png'
  else return '/images/cursed_smiley.jpg'
})
</script>