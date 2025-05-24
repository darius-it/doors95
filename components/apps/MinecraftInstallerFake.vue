<template>
  <div id="fake-installer">
    <h1>Minecraft FREE Instaler - REAL 2025 NO VIRUS</h1>

    <label for="version">Pick Minecraft version</label>
    <select id="version" v-model="version" :disabled="installing">
      <option disabled value="">-- Pleas choose version --</option>
      <option v-for="v in versions" :key="v" :value="v">{{ v }}</option>
    </select>

    <label for="location">Instal Location</label>
    <input
      type="text"
      id="location"
      placeholder="Like C:/MinecraftStuff"
      v-model="location"
      :disabled="installing"
    />

    <button @click="startInstall" :disabled="!canInstall || installing">
      {{ installing ? "Instaling... Pleas Wait..." : "Instal" }}
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
  '1.19.99',
  '1.18.b',
  '1.17.17',
  '16.5',
  '12..3'
]);

const missionState = useMissionsStore();
const payloadsState = usePayloadsStore();
const windowState = useOpenWindowsStore();

const version = ref('');
const location = ref('');
const installing = ref(false);
const progress = ref(0);
const statusMessage = ref('Pick version and location to start.');

const canInstall = computed(() => {
  return version.value !== '' && location.value.trim() !== '';
});

function startInstall() {
  if (!canInstall.value) return;
  installing.value = true;
  progress.value = 0;
  statusMessage.value = 'Prepairing Instalathion...';

  const interval = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(interval);
      statusMessage.value = `Minercaft ${version.value} installed at ${location.value}. Yay! 🎉`;
      installing.value = false;
      
      // Install Minecraft + Virus
      windowState.installableSoftware.minecraft = true;
      missionState.addInfectionLevel(30);
      payloadsState.antRunner = true;

    } else {
      progress.value += Math.floor(Math.random() * 25) + 1; // random big jumps
      if (progress.value > 100) progress.value = 100;
      statusMessage.value = `Installing Minecrfat ${version.value}... ${progress.value}% Done`;
    }
  }, 300);
}
</script>

<style scoped>
#fake-installer {
  background: white;
  border: 8px darkblue;
  padding: 40px 50px;
  width: 400px;
  font-family: 'Arial', cursive, sans-serif;
  color: #000;
  text-shadow: 2px 2px #fff;
  user-select: none;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  letter-spacing: 3px;
}

label {
  display: block;
  margin: 18px 0 8px;
  font-weight: 900;
  font-size: 1.2rem;
  color: navy;
  text-shadow: 1px 1px lime;
}

select,
input[type="text"] {
  width: 100%;
  padding: 12px;
  font-size: 1.3rem;
  border: 4px blueviolet;
  border-radius: 15px;
  box-sizing: border-box;
  color: yellow;
  background-color: black;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

button {
  margin-top: 35px;
  width: 100%;
  background: limegreen;
  border: 5px double darkblue;
  padding: 18px;
  font-weight: 900;
  font-size: 1.5rem;
  border-radius: 25px;
  color: darkred;
  cursor: pointer;
  text-shadow: none;
  transition: transform 0.15s ease-in-out;
  text-transform: uppercase;
}

button:hover:not(:disabled) {
  transform: scale(1.05) rotate(5deg);
}

button:disabled {
  background: gray;
  cursor: not-allowed;
  color: #222;
}

.progress-bar {
  margin-top: 30px;
  background: yellow;
  border-radius: 30px;
  overflow: hidden;
  height: 30px;
  border: 3px dashed purple;
}

.progress-bar > div {
  height: 100%;
  background: lime;
  width: 0%;
  transition: width 0.2s ease;
}

.status {
  margin-top: 20px;
  font-style: italic;
  color: darkblue;
  min-height: 28px;
  text-align: center;
  font-weight: 700;
  font-family: 'Arial', cursive, sans-serif;
  text-shadow: 1px 1px white;
  user-select: text;
}
</style>
