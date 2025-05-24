<template>
  <div class="antivirus-window">
    <header class="window-header">
      <div class="title">Antivirus</div>
      <div class="buttons">
        <button @click="startScan" :disabled="scanning">{{ scanning ? 'Scanning...' : 'Scan' }}</button>
        <button @click="closeApp">Close</button>
      </div>
    </header>

    <main class="window-body">
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>

      <div v-if="!scanning && progress === 100" class="results">
        <div class="smiley">
          <img :src="smileySrc" :alt="smileyAlt" />
        </div>
        <div class="warnings-summary">
          <h3>Scan Report</h3>
          <p>
            Found
            <strong>{{ warnings.length }} {{ warnings.length === 1 ? 'issue' : 'issues' }}</strong>:
          </p>
          <ul>
            <li v-for="(warn, index) in warnings" :key="index" :class="warn.severity">
              <strong>{{ warn.severity.toUpperCase() }}:</strong> {{ warn.message }}
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Manually set infectionLevel here (0 - 99)
const infectionLevel = ref(80)

const scanning = ref(false)
const progress = ref(0)
const warnings = ref([])

const smileySrc = computed(() => {
  if (infectionLevel.value < 25) return '/images/green_smiley.png'
  if (infectionLevel.value < 50) return '/images/yellow_smiley.png'
  if (infectionLevel.value < 75) return '/images/red_smiley.png'
  else return '/images/cursed_smiley.png'
})

const smileyAlt = computed(() => {
  if (infectionLevel.value < 25) return 'Green Smiley'
  if (infectionLevel.value < 50) return 'Yellow Smiley'
  if (infectionLevel.value < 75) return 'Red Smiley'
  else return 'Cursed Smiley'
})

// Generate warnings/errors based on infectionLevel
function generateWarnings(level) {
  const issues = []

  // Define some example messages
  const warningMessages = [
    'Suspicious startup program detected',
    'Outdated antivirus definitions',
    'Potentially unwanted program found',
    'Unusual network activity',
    'Temporary files consuming space',
  ]

  const errorMessages = [
    'Malware infection detected',
    'Critical system file corrupted',
    'Unauthorized access attempt',
    'Ransomware signature found',
    'Rootkit detected',
  ]

  // Number of issues depends on infectionLevel range
  let count = 0
  if (level < 25) {
    count = 0
  } else if (level < 50) {
    count = 1 + Math.floor(level / 50 * 2) // 1 or 2 warnings
  } else if (level < 75) {
    count = 2 + Math.floor((level - 50) / 25 * 2) // 2 to 3 warnings/errors
  } else {
    count = 3 + Math.floor((level - 75) / 25 * 2) // 3 to 5 errors
  }

  // Clamp count max 5
  count = Math.min(count, 5)

  for (let i = 0; i < count; i++) {
    if (level < 50) {
      // only warnings
      issues.push({
        severity: 'warning',
        message: warningMessages[i % warningMessages.length],
      })
    } else if (level < 75) {
      // mix warnings and errors
      issues.push({
        severity: i % 2 === 0 ? 'warning' : 'error',
        message: i % 2 === 0 ? warningMessages[i % warningMessages.length] : errorMessages[i % errorMessages.length],
      })
    } else {
      // mostly errors
      issues.push({
        severity: 'error',
        message: errorMessages[i % errorMessages.length],
      })
    }
  }

  return issues
}

function startScan() {
  if (scanning.value) return
  scanning.value = true
  progress.value = 0
  warnings.value = []

  // Simulate scan progress with fixed speed
  const interval = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(interval)
      scanning.value = false
      // Generate warnings/errors after scanning finishes
      warnings.value = generateWarnings(infectionLevel.value)
      return
    }
    progress.value += 3
    if (progress.value > 100) progress.value = 100
  }, 100)
}

function closeApp() {
  scanning.value = false
  progress.value = 0
  warnings.value = []
}

// Start scanning immediately on page load
onMounted(() => {
  startScan()
})
</script>

<style scoped>
.antivirus-window {
  width: 320px;
  margin: 3rem auto;
  border: 2px solid #333;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  background: #f0f0f0;
  box-shadow: 0 0 12px rgba(0,0,0,0.3);
  user-select: none;
}

.window-header {
  background: #444;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.title {
  font-weight: bold;
  font-size: 1.2rem;
}

.buttons button {
  background: #666;
  border: none;
  color: white;
  margin-left: 0.5rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s;
}
.buttons button:disabled {
  background: #999;
  cursor: not-allowed;
}
.buttons button:not(:disabled):hover {
  background: #888;
}

.window-body {
  padding: 1.5rem;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 18px;
  background: #ccc;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: inset 0 0 5px #aaa;
}

.progress {
  height: 100%;
  background: #4caf50;
  transition: width 0.1s linear;
}

.smiley img {
  max-width: 150px;
  max-height: 150px;
  user-select: none;
  pointer-events: none;
  margin-bottom: 1rem;
}

.results {
  text-align: left;
}

.warnings-summary {
  font-size: 1rem;
  max-width: 280px;
  margin: 0 auto;
}

.warnings-summary h3 {
  margin-bottom: 0.5rem;
}

.warnings-summary ul {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
}

.warnings-summary li {
  margin-bottom: 0.4rem;
  padding-left: 6px;
  border-left: 4px solid transparent;
  font-weight: 600;
}

.warnings-summary li.warning {
  color: #a67c00;
  border-color: #a67c00;
}

.warnings-summary li.error {
  color: #c62828;
  border-color: #c62828;
}
</style>
