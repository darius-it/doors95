<template>
  <div class="notepad-window">
    
    <div class="menu-bar">
      <span>File</span>
      <span>Edit</span>
      <span>Format</span>
      <span>View</span>
      <span>Help</span>
    </div>

    <textarea v-model="text" class="editor"></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
</script>
<style>
body {
  margin: 0;
  background: teal;
  font-family: 'Tahoma', sans-serif;
}

.notepad-window {
  width: 600px;
  background: silver;
}


.menu-bar {
  background: #c0c0c0;
  padding: 4px 8px;
  display: flex;
  gap: 16px;
  font-size: 14px;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
}

.editor {
  width: 100%;
  height: 400px;
  border: none;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  resize: none;
  background: white;
  color: black;
}

</style>