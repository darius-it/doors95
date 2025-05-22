<template>
  <div class="w-full bg-bottom-bar py-1 px-1 flex justify-between items-center">
    <div id="bottom-bar-left" class="flex items-center">
      <LayoutBottomBarButton>
        <NuxtLink to="/about">Start</NuxtLink>
      </LayoutBottomBarButton>
    </div>
    <div id="bottom-bar-right" class="flex items-center">
      <LayoutBottomBarClock />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>