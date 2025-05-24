<template>
  <div class="container pointer-events-none">
    <img src="/images/bobr_kurwa.avif" class="rotating-image" alt="Rotating" />
    <audio ref="audio" src="/audio/bober.mp3" autoplay loop></audio>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const audio = ref(null);

onMounted(() => {
  // Ensure autoplay works on all browsers (especially mobile)
  const playAudio = () => {
    audio.value.play().catch(() => {});
    document.removeEventListener('click', playAudio);
  };
  document.addEventListener('click', playAudio); // mobile autoplay unlock
});
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  z-index: 100006;
  top:0;
  left:0;
  background: transparent;
  width: 100vw;
  height: 100vh;

}

.rotating-image {
  width: 200px;
  height: 200px;
  animation: spin 5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
