<template>
  <div class="p-4 flex flex-col gap-4">
    <DesktopWindow 
      name="Thunderbird" 
      :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows"
      @clickInsideWindow="setLastClickedWindow" 
      @close="closeWindow"
    >
      hallo
    </DesktopWindow>

    <DesktopWindow 
      name="Browser" 
      :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows"
      @clickInsideWindow="setLastClickedWindow" 
      @close="closeWindow"
    />

    <div id="row-1" class="flex flex-row items-center gap-6">
      <DesktopIcon
        windowName="Thunderbird"
        @openWindow="(windowName) => openWindow(windowName)"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Browser"
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
const currentlyOpenWindows = useOpenWindowsStore();

const openWindow = (windowName: string) => {
  console.log(`Opening window: ${windowName}`);
  currentlyOpenWindows.openWindows.push(windowName);
};

const closeWindow = (windowName: string) => {
  console.log(`Closing window: ${windowName}`);
  const index = currentlyOpenWindows.openWindows.indexOf(windowName);
  if (index > -1) {
    currentlyOpenWindows.openWindows.splice(index, 1);
  }
};

const setLastClickedWindow = (windowName: string) => {
  console.log(`Last clicked window: ${windowName}`);
  // Logic to set the last clicked window goes here
  currentlyOpenWindows.lastClickedWindow = windowName;
};
</script>