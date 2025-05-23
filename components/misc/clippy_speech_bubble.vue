<template>
  <div v-if="visible" class="speech-bubble">
    <div class="bubble-text">
      <slot>{{ clippyText }}</slot>
      <button @click="hideBubble" class="okay-button">Okay</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeechBubble',
  data() {
    return {
      visible: true,
      clippyText: '',
    };
  },
  methods: {
    hideBubble() {
      this.visible = false;
    },
    showBubble() {
      this.visible = true;
    },
    setText(text) {
      this.clippyText = text;
    }
  },
};
</script>

<style scoped>
.speech-bubble {
  position: relative;
  display: inline-block;
  background: #ffffcc;
  border: 1px solid #000;
  padding: 1rem;
  border-radius: 8px;
  min-width: 300px;
  min-height: 140px;
  max-width: 400px;
  word-wrap: break-word;
  font-size: 0.9rem;
}

.speech-bubble::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  margin-top: -10px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-left-color: #ffffcc;
  border-right: none;
  z-index: 1;
}

.speech-bubble::before {
  content: '';
  position: absolute;
  right: -11px;
  top: 50%;
  margin-top: -11px;
  width: 0;
  height: 0;
  border: 11px solid transparent;
  border-left-color: black;
  border-right: none;
  z-index: 0;
}

.okay-button {
  display: block;
  margin-top: 10px;
  padding: 4px 8px;
  border: none;
  background-color: #eee;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
}
.okay-button:hover {
  background-color: #ddd;
}
</style>
