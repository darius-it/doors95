<template>
    <div class="top-bar w-full min-w-[60vh]">
        <ul>
            <li v-for="p in open_pages">
                <button @click="makeActive(p.name)">
                    {{p.name}}
                </button>
                <button @click="close(p.name)">
                    X
                </button>
            </li>
        </ul>
    </div>
    <div class="w-full min-h-[55vh] min-w-[60vw] web-page">
        <blank v-if="active_page.name == 'blank'"/>
        <google v-if="active_page.name == 'Google'"/>
        <kanban v-if="active_page.name == 'Kanban'"/>
    </div>
</template>

<script setup>
import blank from '../browserpages/blank'
import google from '../browserpages/google'
import kanban from '../browserpages/kanban'

const web_pages=ref([
    {name: "Google", url: "www.google.com"},
    {name: "Kanban", url: "www.kanban.com"}])

const open_pages = ref(new Array())
const active_page = ref({name: "blank", url: ""})

function open(name) {
    web_pages.value.forEach(page => {
        if(page.name == name){
            open_pages.value.push(page)
            active_page.value = page
        }
    });
}
function close(name) {
    for (let i = 0; i < open_pages.value.length; i++) {
        if(open_pages.value[i].name == name){
            open_pages.value.splice(i, 1)
        }
    }
    if(open_pages.value.length == 0){
        active_page.value = {name: "blank", url: ""}
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

open("Google")
open("Kanban")



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
  margin: 5px
}
.top-bar{
    background-color: lightgray;
    box-shadow: 0px 4px dimgray;
    border-radius: 5px;
    padding: 5px;
}
.web-page{
    margin:5px;
}
</style>