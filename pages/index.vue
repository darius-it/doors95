<template>
  <div class="p-4 flex flex-col gap-4">
    <DesktopWindow name="Mail" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow">
      <AppsMail />
    </DesktopWindow>

    <DesktopWindow name="Browser" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow" />

    <div id="row-1" class="flex flex-row items-center justify-start w-full max-w-md">
      <DesktopIcon windowName="Mail" @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]">
        <IconMail />
      </DesktopIcon>
      <DesktopIcon windowName="Browser" @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]">
        <IconFolder />
      </DesktopIcon>
      <DesktopIcon windowName="Start" @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]">
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon windowName="Start" @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]">
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
    </div>

    <div id="row-2" class="flex flex-row items-center justify-start w-full max-w-md">
      <DesktopIcon windowName="Start" @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]">
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon windowName="Start" @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]">
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon windowName="Start" @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]">
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon windowName="Start" @openWindow="(windowName) => openWindow(windowName)"
        class="flex-1 flex flex-col items-center min-w-[20px]">
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
    </div>

    <!-- Underlay Window in lower right -->
    <div class="fixed bottom-4 right-4 z-50 pointer-events-none" style="width: 340px; height: 180px;">
      <div class="pointer-events-auto flex flex-row items-end h-full justify-end">
        <!-- Speech bubble left of Clippy, vertically centered -->
        <div class="flex items-center mr-2" style="height: 14rem;">
          <ClippySpeechBubble ref="clippyBubble" />
        </div>
        <img src="/textures/clippy_placeholder.png" alt="Clippy"
          class="w-[14rem] h-[14rem] mb-2 cursor-pointer transition-transform duration-150"
          :style="{ transform: `scale(${clippyScale})` }" @click="showClippyBubble" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ClippySpeechBubble from '~/components/misc/clippy_speech_bubble.vue';

  const clippyBubble = ref();

  // Add scale ref for animation
  const clippyScale = ref(1);

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

  function setClippyText(newText: string) {
    animateClippy()
    if (clippyBubble.value && typeof clippyBubble.value.setText === 'function') {
      clippyBubble.value.setText(newText);
      clippyBubble.value.showBubble();
    }
  }

  // Animate Clippy: scale up quickly, then back to normal
  function animateClippy() {
    clippyScale.value = 1.36;
    setTimeout(() => {
      clippyScale.value = 1;
    }, 180);
  }

  // Expose to console for debugging
  // @ts-ignore
  window.setClippyText = setClippyText;
  // @ts-ignore
  window.animateClippy = animateClippy;

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