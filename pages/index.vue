<template>
  <div class="p-4 flex flex-col gap-4">
    <DesktopWindow >
      hallo
    </DesktopWindow>
    <DesktopWindow />

    <div id="row-1" class="flex flex-row items-center gap-6">
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
    </div>

    <div id="row-2" class="flex flex-row items-center gap-6">
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
    </div>
  </div>
</template>

<script lang="ts" setup>
const openWindow = (windowName: string) => {
  console.log(`Opening window: ${windowName}`);
  // Logic to open the window goes here
};
</script>