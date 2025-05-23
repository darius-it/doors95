<template>
  <div class="w-full bg-bottom-bar py-1 px-1 flex justify-between items-center">
    <div id="bottom-bar-left" class="flex items-center gap-3">
      <LayoutBottomBarButton>
        <div class="flex flex-row items-center justify-start gap-2 w-14 -mx-2 cursor-pointer">
          <IconStar class="w-4 h-4" />
          Start
        </div>
      </LayoutBottomBarButton>

      <div class="flex flex-row items-center gap-2">
        <LayoutBottomBarButton 
          v-for="window in currentlyOpenWindows.openWindows" :key="window"
          @click="currentlyOpenWindows.setLastClickedWindow(window)"
        >
          <div class="text-left flex flex-row items-start justify-start w-16 -ml-2 pr-12 cursor-pointer">
            {{ window }}
          </div>
        </LayoutBottomBarButton>
      </div>
    </div>
    <div id="bottom-bar-right" class="flex items-center">
      <LayoutBottomBarClock />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const currentlyOpenWindows = useOpenWindowsStore();
</script>