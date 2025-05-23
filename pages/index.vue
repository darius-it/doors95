<template>
  <div class="p-4 flex flex-col gap-4">
    <DesktopWindow 
      name="Mail" 
      :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows"
      @clickInsideWindow="setLastClickedWindow" 
      @close="closeWindow"
    >
      <AppsMail />
    </DesktopWindow>

    <DesktopWindow 
      name="Browser" 
      :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows"
      @clickInsideWindow="setLastClickedWindow" 
      @close="closeWindow"
    />

    <div id="row-1" class="flex flex-row items-center justify-start w-full max-w-md">
      <DesktopIcon
        windowName="Mail"
        @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]"
      >
        <IconMail />
      </DesktopIcon>
      <DesktopIcon
        windowName="Browser"
        @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]"
      >
        <IconFolder />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
    </div>

    <div id="row-2" class="flex flex-row items-center justify-start w-full max-w-md">
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]"
      >
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon
        windowName="Start"
        @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]"
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
  currentlyOpenWindows.openWindow(windowName);
};

const closeWindow = (windowName: string) => {
  console.log(`Closing window: ${windowName}`);
  currentlyOpenWindows.closeWindow(windowName);
};

const setLastClickedWindow = (windowName: string) => {
  console.log(`Last clicked window: ${windowName}`);
  currentlyOpenWindows.setLastClickedWindow(windowName);
};
</script>