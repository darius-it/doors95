<template>
  <div>
    <h2>Search Results</h2>
    <ul>
      <li v-for="page in pages">
        <button @click="openPageLink(page.url)">
            {{page.name}}
        </button>
        <div class="small-gray url">
            {{page.url}}
        </div>
        <div class="desc">
            {{page.description}}
        </div>
        <div class="padding-bottom: 100px" /> 
      </li>
    </ul>
  </div>
</template>

<script setup>
import emitter from "@/components/misc/eventHandler"

const pages = ref([
    {name:"Minecraft", url:"minceraft.com", description:"Download Minecraft for Free now!"},
    {name:"Minecraft Online", url:"minecraft-online.com", description:"Play Minecraft online"},
    {name:"Minecraft", url:"minecraft.com", description:"Download Minecraft"},
    {name:"Minecraft", url:"minecroft.com", description:"Download Minecraft from the original page"},
])


function openPageLink(link){
    
    switch (link) {
        case "minecraft.com":
            emitter.emit("openPage", "Minecraft")
            break
        case "minceraft.com":
            emitter.emit("openPage", "Minceraft")
            break
        case "minecroft.com":
            emitter.emit("openPage", "Minecroft")
            break
        case "minecraft-online.com":
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
  margin-top:10px;
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
.desc{
    font-size: 10px;
}
.url{
    font-size: 10px;
    margin-bottom: 5px;
}
</style>