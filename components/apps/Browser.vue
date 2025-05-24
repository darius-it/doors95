<template ref="Browser">
    <div class="bg">
        <div class="top-bar w-full min-w-[60vh]">
            <ul class="flex flex-row items-center gap-1">
                <div class="flex flex-row items-center gap-1 cursor-pointer">
                    <li v-for="p in open_pages" :key="p.name" class="border border-gray-700 pl-2 rounded-md flex flex-row items-center gap-2">
                        <button @click="makeActive(p.name)">
                            {{p.name}}
                        </button>
                        <button @click="close(p.name)" class="font-sans text-xl hover:text-red-500 cursor-pointer p-1.5">
                            x
                        </button>
                    </li>
                </div>
                <li>
                    <button @click="open('Google')">
                        +
                    </button>
                </li>
            </ul>
        </div>
        <div class="w-full min-h-[55vh] min-w-[60vw] web-page">
            <blank v-if="active_page.name == 'blank'"/>
            <google v-if="active_page.name == 'Google'"/>
            <kanban v-if="active_page.name == 'Kanban'"/>
            <dino v-if="active_page.name == 'Dino'"/>
            <minecraftsearch v-if="active_page.name == 'minecraft - Google search'"/>
            <mcr1 v-if="active_page.name == 'Minecraft'"/>
            <mcr2 v-if="active_page.name == 'Minceraft'"/>
            <mcr3 v-if="active_page.name == 'Minecroft'"/>
            <mcr4 v-if="active_page.name == 'Minecraft Online'"/>
            <inception v-if="active_page.name == 'Inception'"/>
        </div>
    </div>
</template>

<script setup>
import blank from '../browserpages/blank'
import google from '../browserpages/google'
import kanban from '../browserpages/kanban'
import dino from '../browserpages/dino'
import minecraftsearch from '../browserpages/minecraftsearch'
import mcr1 from '../browserpages/mcr1'
import mcr2 from '../browserpages/mcr2'
import mcr3 from '../browserpages/mcr3'
import mcr4 from '../browserpages/mcr4'
import inception from '../browserpages/inception'

const web_pages=ref([
    {name: "Google", url: "www.google.com"},
    {name: "Kanban", url: "www.kanban.com"},
    {name: "Dino", url: "www.dino.com"},
    {name: "minecraft - Google search", url: "www.google.com/search=minecraft"},
    {name: "Minecraft", url: "www.minecraft.com"},
    {name: "Minceraft", url: "www.minceraft.com"},
    {name: "Minecroft", url: "www.minecroft.com"},
    {name: "Minecraft Online", url: "www.minecraft-online.com"},
    {name: "Inception", url: "www.inception.com"}])

const open_pages = ref(new Array())
const active_page = ref({name: "Google", url: "www.google.com"})

function open(name) {
    web_pages.value.forEach(page => {
        if(page.name == name){
            open_pages.value.push(page)
            active_page.value = page
        }
    })
}
function close(name) {
    for (let i = 0; i < open_pages.value.length; i++) {
        if(open_pages.value[i].name == name){
            open_pages.value.splice(i, 1)
            break
        }
    }
    if(open_pages.value.length == 0){
        active_page.value = {name: "Google", url: "www.google.com"}
    }else{
        active_page.value = open_pages.value[0]
    }
}
function makeActive(name) {
    open_pages.value.forEach(page => {
        if(page.name == name){
            active_page.value = page
        }
    })
}
function closeCurrent() {
    close(active_page.value.name)
}

import emitter from "@/components/misc/eventHandler"
emitter.on("openPage", e => open(e))
emitter.on("closePage", e => close(e))

</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
  margin: 3px
}
.top-bar{
    background-color: #c0c0c0;
    box-shadow: 0px 4px dimgray;
    border-radius: 0px;
}
.web-page{
    margin:5px;
}
.bg{
    background-color: #F5F5F5
}
</style>