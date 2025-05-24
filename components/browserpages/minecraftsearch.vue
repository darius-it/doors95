<template>
  <div>
    <h2>Search Results</h2>
    <ul>
      <li v-for="page in pages">
        <button @click="openPageLink(page.url)">
          {{ page.name }}
        </button>
        <div class="small-gray url">
          {{ page.url }}
        </div>
        <div class="desc">
          {{ page.description }}
        </div>
        <div class="padding-bottom: 100px" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import emitter from "@/components/misc/eventHandler"
import { onMounted } from 'vue'
import { useMissionsStore } from '~/stores/missions'

const missionsStore = useMissionsStore()

const pages = ref([
    {name:"Minecraft - Download", url:"https://www.minceraft.com", description:"Download Minecraft for Free now!"},
    {name:"Minecraft Online", url:"https://www.minecraft-online.com", description:"Play Minecraft online in an interactive iframe. No Signup required!"},
    {name:"Minecraft", url:"https://www.minecraft.com", description:"The newest Version of Minecraft."},
    {name:"Microsoft - Minecraft", url:"https://www.minecroft.com", description:"Download Minecraft from the original page."},
])

onMounted(() => {
  setTimeout(() => {
    missionsStore.triggerEvent('search_results')
  }, 1000)
})

function openPageLink(link) {

  switch (link) {
    case "minecraft.com":
      emitter.emit("openPage", "Minecraft")
      break
    case "minceraft.com":
      setTimeout(() => {
        missionsStore.triggerEvent('scam_site')
      }, 1000)
      emitter.emit("openPage", "Minceraft")
      break
    case "minecroft.com":
      setTimeout(() => {
        missionsStore.triggerEvent('scam_site')
      }, 1000)
      emitter.emit("openPage", "Minecroft")
      break
    case "minecraft-online.com":
      setTimeout(() => {
        missionsStore.triggerEvent('scam_site')
      }, 1000)
      emitter.emit("openPage", "Minecraft Online")
      break
    default:
      break
  }
}
</script>

<style scoped>
button {
  background: none;
  border: none;
  color: #000080;
  text-align: left;
  cursor: pointer;
  padding: 0px 0;
  margin-top: 10px;
  font-size: 14px;
}

button:hover {
  text-decoration: underline;
}

.small-light-gray {
  color: gray;
}

.small-gray {
  color: dimgray;
}

.desc {
  font-size: 10px;
}

.url {
  font-size: 10px;
  margin-bottom: 5px;
}
</style>