<template>
  <div class="p-4 flex flex-col gap-4 overflow-hidden" :class="colorShiftEnabled ? 'color-shift' : ''">

    <PayloadsAntRunner v-if="payloadsState.antRunner"/>
    <PayloadsBluescreen v-if="payloadsState.bluescreen"/>
    <PayloadsCube v-if="payloadsState.cube"/>
    <PayloadsKirbyParisHydra v-if="payloadsState.kirby_paris_hydra"/>
    <PayloadsRansomware v-if="payloadsState.ransomware"/>
    <PayloadsYouAreAnIdiot v-if="payloadsState.you_are_an_idiot"/>
    <PayloadsBobrKurwa v-if="payloadsState.bobr_kurwa"/>

    <DesktopWindow name="Mail" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow">
      <AppsMail />
    </DesktopWindow>
    <DesktopWindow name="Browser" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow">
      <AppsBrowser ref="browser"/>
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

    <DesktopWindow name="Mincefrat Instaler" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow" 
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow" 
      @close="closeWindow">
      <AppsMinecraftInstallerFake />
    </DesktopWindow>
    <DesktopWindow name="Minecraft Installer" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow" 
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow" 
      @close="closeWindow">
      <AppsMinecraftInstallerReal />
    </DesktopWindow>

    <DesktopWindow name="Minecraft" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow" 
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow" 
      @close="closeWindow">
      <AppsMinecraftGame/>
    </DesktopWindow>

    <DesktopWindow name="Scamcyclopedia" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow">
      <AppsScamcyclopedia />
    </DesktopWindow>
    <DesktopWindow name="Hackaburg" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow">
      <AppsHackaburg />
    </DesktopWindow>
    <DesktopWindow name="Notepad" :lastClickedWindow="currentlyOpenWindows.lastClickedWindow"
      :currentlyOpenWindows="currentlyOpenWindows.openWindows" @clickInsideWindow="setLastClickedWindow"
      @close="closeWindow">
      <AppsNotepad />
    </DesktopWindow>

    <div id="row-1" class="flex flex-row justify-between items-center gap-4 w-full">
      <!-- Left-aligned icons -->
      <div class="flex flex-row gap-17 items-center ml-5">
        <DesktopIcon windowName="Mail" @openWindow="(windowName) => openWindow(windowName)"
          class="flex flex-col items-center min-w-[16px]">
          <img src="/icons/email.png" alt="Mail Icon" class="w-14 h-14 mb-1" />
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
    </div>

    <div id="row-2" class="flex flex-row justify-between items-center w-full gap-4 ml-1">
      <!-- Left-aligned icons -->
      <div class="flex flex-row gap-12 items-center">
        <DesktopIcon windowName="Antivirus" @openWindow="(windowName) => openWindow(windowName)"
          class="flex flex-col items-center min-w-[16px] flex-1">
          <img src="/icons/antivirus.png" alt="Antivirus Icon" class="w-14 h-14 mb-[0.3rem] mt-[0.1rem]" />
        </DesktopIcon>
        <DesktopIcon windowName="Scamcyclopedia" @openWindow="(windowName) => openWindow(windowName)"
          class="flex flex-col items-center min-w-[16px] flex-1">
          <img src="/icons/books.png" alt="Books Icon" class="w-14 h-14 mb-[0.3rem] mt-[0.1rem]" />
        </DesktopIcon>
        <DesktopIcon windowName="Notepad" @openWindow="(windowName) => openWindow(windowName)"
          class="flex flex-col items-center min-w-[16px] flex-1">
          <img src="/images/notepad.png" alt="Notepad Icon" class="w-14 h-14 mb-[0.3rem] mt-[0.1rem]" />
        </DesktopIcon>
      </div>

      <!-- Right-aligned icon -->
      <div class="flex flex-row gap-4 items-center mr-2">
        <DesktopIcon v-if="currentlyOpenWindows.installableSoftware.minecraft" windowName="Minecraft" @openWindow="(windowName) => openWindow(windowName)"
          class="flex flex-col items-center min-w-[16px]">
          <IconMinecraft />
        </DesktopIcon>
      </div>
    </div>

    <div class="absolute bottom-20 left-5">
      <DesktopIcon windowName="Hackaburg" @openWindow="(windowName) => openWindow(windowName)"
        class="flex flex-col items-center min-w-[16px]">
        <img src="/icons/hackaburg.png" alt="Hackaburg Icon" class="w-16 h-16 mb-1" />
      </DesktopIcon>
    </div>

    <!-- Skippy Start Overlay (z-[9500]) -->
    <SkippyStart v-if="!skippyInstalled" @skippy-installed="onSkippyInstalled" style="z-index:9500; position:fixed; inset:0;" />
    <!-- Skippy Input Overlay (z-[9600]) -->
    <SkippyInput v-if="skippyInputVisible" style="z-index:9600; position:fixed; inset:0;" />
    <!-- Underlay Window in lower right -->
    <div v-if="clippyVisible" class="fixed bottom-10 right-6 z-[9000] pointer-events-none" style="width: 340px; height: 180px;">
      <div class="pointer-events-auto flex flex-row items-end h-full justify-end">
        <!-- Speech bubble left of Clippy, vertically centered -->
        <div class="flex items-center mr-2" style="height: 14rem;">
          <ClippySpeechBubble ref="clippyBubble" />
        </div>
        <img src="/textures/clippy_placeholder.webp" alt="Clippy"
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
import SkippyInput from '~/pages/skippy_input.vue';

const currentlyOpenWindows = useOpenWindowsStore();
const payloadsState = usePayloadsStore();

const clippyBubble = ref();
const colorShiftEnabled = ref(false);

// Add scale ref for animation
const clippyScale = ref(0); // Start hidden
const clippyVisible = ref(false);
const skippyInstalled = ref(false);
const skippyInputVisible = ref(false);

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
  missionsStore.triggerEvent("skippy_installed")

}
function hideClippy() {
  clippyVisible.value = false;
  clippyScale.value = 0;
}

function onSkippyInstalled() {
  skippyInstalled.value = true;
  showClippyOnInstall();
  setTimeout(() => {
    skippyInputVisible.value = true;
  }, 2700);

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

function plotTwist() {
  setTimeout(() => {
    const browserRef = (window as any).$refs?.browser || null;
    if (browserRef && typeof browserRef.sendEscapeKey === 'function') {
      browserRef.sendEscapeKey();
    }

    missionsStore.triggerEvent("plottwist1");
    // colorShiftEnabled.value = true;
    setTimeout(() => {
      missionsStore.triggerEvent("plottwist2");
    }, 5000);
  }, 9500);
}

const openWindow = (windowName: string) => {
    console.log("Print twists")

  if (windowName == "Minecraft") {
    plotTwist()
  }

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
