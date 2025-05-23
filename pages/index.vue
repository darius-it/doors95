<template>
  <div class="p-4 flex flex-col gap-4 overflow-hidden" :class="colorShiftEnabled ? 'color-shift' : ''">
    <DesktopWindow name="Mail" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow">
      <AppsMail />
    </DesktopWindow>
    <DesktopWindow name="Browser" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow">
      <AppsBrowser />
    </DesktopWindow>
    <DesktopWindow name="Dino Game" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow">
      <AppsDinoGame />
    </DesktopWindow>
    <DesktopWindow name="Antivirus" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow">
      <AppsAntivirus />
    </DesktopWindow>
    <DesktopWindow name="Minecraft" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow" :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow" @close="closeWindow"><AppsMinecraftGame/></DesktopWindow>

    <div id="row-1" class="flex flex-row justify-between items-center gap-4 w-full">
      <!-- Left-aligned icons -->
      <div class="flex flex-row gap-15 items-center ml-5">
        <DesktopIcon windowName="Mail" @openWindow="(windowName) => openWindow(windowName)"
          class="flex flex-col items-center min-w-[16px]">
          <IconMail />
        </DesktopIcon>
        <DesktopIcon windowName="Browser" @openWindow="(windowName) => openWindow(windowName)"
          class="flex flex-col items-center min-w-[16px]">
          <img src="/icons/browser.png" alt="Antivirus Icon" class="w-14 h-14 mb-0.5" />
        </DesktopIcon>
      </div>
      <!-- Right-aligned icon -->
      <div class="flex flex-row gap-4 items-center">
        <DesktopIcon windowName="Dino Game" @openWindow="(windowName) => openWindow(windowName)"
          class="flex flex-col items-center min-w-[16px]">
          <IconDino />
        </DesktopIcon>
      </div>
      <div class="flex flex-row gap-4 items-center">
        <DesktopIcon windowName="Minecraft" @openWindow="(windowName) => openWindow(windowName)"
          class="flex flex-col items-center min-w-[16px]">
          <IconMinecraft />
        </DesktopIcon>
      </div>
    </div>

    <div id="row-2" class="flex flex-row justify-between items-center w-full max-w-md gap-4">
      <DesktopIcon windowName="Antivirus" @openWindow="(windowName) => openWindow(windowName)"
        class="flex flex-col items-center min-w-[16px] flex-1">
        <img src="/icons/antivirus.png" alt="Antivirus Icon" class="w-14 h-14 mb-[0.3rem] mt-[0.1rem]" />
      </DesktopIcon>
      <DesktopIcon windowName="Start" @openWindow="(windowName) => openWindow(windowName)"
        class="flex flex-col items-center min-w-[16px] flex-1">
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon windowName="Start" @openWindow="(windowName) => openWindow(windowName)"
        class="flex flex-col items-center min-w-[16px] flex-1">
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
      <DesktopIcon windowName="Start" @openWindow="(windowName) => openWindow(windowName)"
        class="flex flex-col items-center min-w-[16px] flex-1">
        <img src="/icons/folder.png" alt="Start Icon" class="w-16 h-16" />
      </DesktopIcon>
    </div>

    <!-- Skippy Start Overlay (z-[9500]) -->
    <SkippyStart v-if="!skippyInstalled" @skippy-installed="onSkippyInstalled" style="z-index:9500; position:fixed; inset:0;" />
    <!-- Underlay Window in lower right -->
    <div v-if="clippyVisible" class="fixed bottom-4 right-4 z-[9000] pointer-events-none" style="width: 340px; height: 180px;">
      <div class="pointer-events-auto flex flex-row items-end h-full justify-end">
        <!-- Speech bubble left of Clippy, vertically centered -->
        <div class="flex items-center mr-2" style="height: 14rem;">
          <ClippySpeechBubble ref="clippyBubble" />
        </div>
        <img src="/textures/clippy_placeholder.png" alt="Clippy"
          class="w-[14rem] h-[14rem] mb-2 cursor-pointer transition-transform duration-300"
          :style="{ transform: `scale(${clippyScale})` }" @click="showClippyBubble" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ClippySpeechBubble from '~/components/misc/clippy_speech_bubble.vue';
import SkippyStart from '~/pages/skippy_start.vue';

const currentlyOpenWindows = useOpenWindowsStore();

const clippyBubble = ref();
const colorShiftEnabled = ref(false);
// Add scale ref for animation
const clippyScale = ref(0); // Start hidden
const clippyVisible = ref(false);
const skippyInstalled = ref(false);

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

function showClippyOnInstall() {
  clippyVisible.value = true;
  clippyScale.value = 0;
  setTimeout(() => {
    clippyScale.value = 1;
  }, 10);
  // @ts-ignore
  missionsStore.triggerEvent("clippy_installed")

}
function hideClippy() {
  clippyVisible.value = false;
  clippyScale.value = 0;
}

function onSkippyInstalled() {
  skippyInstalled.value = true;
  showClippyOnInstall();

}

// Expose to console for debugging
// @ts-ignore
window.setClippyText = setClippyText;
// @ts-ignore
window.animateClippy = animateClippy;
// @ts-ignore
window.showClippy = showClippyOnInstall;
// @ts-ignore
window.hideClippy = hideClippy;

// Expose to console for debugging
// @ts-ignore
import { useMissionsStore } from '~/stores/missions';
// @ts-ignore
const missionsStore = useMissionsStore();
// @ts-ignore
window.triggerEvent = (event) => missionsStore.triggerEvent.call(missionsStore, event);
// @ts-ignore
window.getStateString = () => missionsStore.getStateString.call(missionsStore);
// @ts-ignore
window.getLatestStateTriggered = () => missionsStore.getLatestStateTriggered.call(missionsStore);
// @ts-ignore
window.missionsStore = missionsStore;

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
<style scoped>
@keyframes hueShift {
  from {
    filter: hue-rotate(0deg);
  }

  to {
    filter: hue-rotate(360deg);
  }
}

.color-shift {
  animation: hueShift 15s linear infinite;
}
</style>
