<template>
  <div class="bluescreen">
    <div class="message">
      <h1>:(</h1>
      <p>Your PC ran into a problem and needs to restart.</p>
      <p>We're just collecting some error info, and then we'll restart for you.</p>
      <p><span class="percentage">{{ displayPercentage }}%</span> complete</p>
      <p class="error-code">*** STOP: 0x0000BADF00D: VIRUS_OVERLOAD</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const percentage = ref(0)

// Display value rounded to two decimals
const displayPercentage = computed(() => percentage.value.toFixed(2))

onMounted(() => {
  const interval = setInterval(() => {
    if (percentage.value < 99.99) {
      // Randomly decide to increase or decrease
      const changeChance = Math.random()
      if (changeChance < 0.8) {
        // 80% chance to increase
        percentage.value = Math.min(percentage.value + 0.3, 99.99)
      } else {
        // 20% chance to decrease, but not below 0
        percentage.value = Math.max(percentage.value - 0.1, 0)
      }
    } else {
      clearInterval(interval)
      // Show the image once percentage hits 99.99
      isImageVisible.value = true
    }
  }, 50)
})
</script>

<style scoped>
.bluescreen {
  background-color: #0000aa; /* classic XP BSOD blue */
  color: white;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: 'Windows 95', 'MS Sans Serif', Geneva, sans-serif;
  flex-direction: column;
  text-align: left;
  user-select: none;
  padding: 3rem 4rem;
  box-sizing: border-box;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  position: relative; /* for positioning the image */
}

.message h1 {
  font-size: 6rem;
  margin: 0 0 1rem 0;
  font-weight: normal;
  image-rendering: pixelated;
}

.message p {
  font-size: 1.5rem;
  margin: 0.5rem 0;
  line-height: 1.6;
}

.percentage {
  font-family: 'Windows 95', 'Terminal', 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 1.5rem;
}

/* Error code style */
.error-code {
  font-family: 'Windows 95', 'Terminal', 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 1.4rem;
  margin-top: 2rem;
  color: #ff5555;
  text-shadow: none;
}

/* Mimic the Windows 95 BSOD text shadowing - subtle glow removed */
.message p, .message h1 {
  text-shadow: none;
}


</style>
