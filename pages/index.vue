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
        windowName="Thunderbirb"
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

    <!-- Underlay Window in lower right -->
    <div
      class="fixed bottom-4 right-4 z-50 pointer-events-none"
      style="width: 340px; height: 180px;"
    >
      <div class="pointer-events-auto flex flex-row items-end h-full justify-end">
        <!-- Speech bubble left of Clippy, vertically centered -->
        <div class="flex items-center mr-2" style="height: 14rem;">
          <ClippySpeechBubble ref="clippyBubble">
            Hello, my name is Clippy!
          </ClippySpeechBubble>
        </div>
        <img
          src="/textures/clippy_placeholder.png"
          alt="Clippy"
          class="w-[14rem] h-[14rem] mb-2 cursor-pointer"
          @click="showClippyBubble"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ClippySpeechBubble from '~/components/misc/clippy_speech_bubble.vue';

const clippyBubble = ref();

function showClippyBubble() {
  if (
    clippyBubble.value &&
    typeof clippyBubble.value.showBubble === 'function' &&
    typeof clippyBubble.value.hideBubble === 'function'
  ) {
    if (clippyBubble.value.visible) {
      clippyBubble.value.hideBubble();
    } else {
      clippyBubble.value.showBubble();
    }
  }
}

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