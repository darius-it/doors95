<template>
  <div id="installer">
    <h1>Minecraft Installer</h1>

    <label for="version">Select Minecraft Version</label>
    <select id="version" v-model="version" :disabled="installing">
      <option disabled value="">-- Choose Version --</option>
      <option v-for="v in versions" :key="v" :value="v">{{ v }}</option>
    </select>

    <label for="location">Install Location</label>
    <input
      type="text"
      id="location"
      placeholder="e.g. C:/Minecraft"
      v-model="location"
      :disabled="installing"
    />

    <button @click="startInstall" :disabled="!canInstall || installing">
      {{ installing ? "Installing..." : "Install" }}
    </button>

    <div class="progress-bar" v-if="installing">
      <div :style="{ width: progress + '%' }"></div>
    </div>

    <div class="status">{{ statusMessage }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const versions = ref([
  '1.19.4',
  '1.18.2',
  '1.17.1',
  '1.16.5',
  '1.12.2'
]);

const windowState = useOpenWindowsStore();

const version = ref('');
const location = ref('');
const installing = ref(false);
const progress = ref(0);
const statusMessage = ref('Select a version and location to begin.');

const canInstall = computed(() => {
  return version.value !== '' && location.value.trim() !== '';
});

function startInstall() {
  if (!canInstall.value) return;
  installing.value = true;
  progress.value = 0;
  statusMessage.value = 'Preparing installation...';

  const interval = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(interval);
      statusMessage.value = `Minecraft ${version.value} installed successfully at ${location.value}! 🎉`;
      installing.value = false;

      windowState.installableSoftware.minecraft = true;
    } else {
      progress.value += Math.floor(Math.random() * 10) + 5; // random progress step
      if (progress.value > 100) progress.value = 100;
      statusMessage.value = `Installing Minecraft ${version.value}... ${progress.value}%`;
    }
  }, 500);
}
</script>

<style scoped>
#installer {
  background: #333;
  border-radius: 10px;
  padding: 30px 40px;
  width: 100%;
  box-shadow: 0 0 15px #4caf50;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #eee;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #4caf50;
  font-size: 2rem;
  font-family: "Windows 95", sans-serif;
}

label {
  display: block;
  margin: 15px 0 6px;
  font-weight: 600;
}

select,
input[type="text"] {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  color: #fff; /* changed from #222 to white */
  background-color: #555; /* added a darker background for better contrast */
}


button {
  margin-top: 25px;
  width: 100%;
  background: #4caf50;
  border: none;
  padding: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 6px;
  color: #222;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background: #888;
  cursor: not-allowed;
}

.progress-bar {
  margin-top: 20px;
  background: #444;
  border-radius: 10px;
  overflow: hidden;
  height: 20px;
}

.progress-bar > div {
  height: 100%;
  background: #4caf50;
  width: 0%;
  transition: width 0.3s ease;
}

.status {
  margin-top: 15px;
  font-style: italic;
  color: #ccc;
  min-height: 24px;
  text-align: center;
}
</style>
