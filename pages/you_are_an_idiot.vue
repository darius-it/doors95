<template>
  <div id="app">
    <audio ref="vineBoom" loop>
      <source src="../public/audio/vine-boom.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    <audio ref="metalPipe" loop>
      <source src="../public/audio/metal-pipe.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    <popup-modal
      v-for="popup in popups"
      :key="popup.id"
      :id="popup.id"
      @close="removePopup(popup.id)"
    />
  </div>
</template>

<script>
import PopupModal from '../components/layout/PopupModal.vue'

export default {
  components: {
    PopupModal
  },
  data() {
    return {
      popups: [],
      popupId: 0,
      spamming: false,
      spamInterval: null
    };
  },
  methods: {
    startSpam() {
      this.spamming = true;
      this.$refs.vineBoom.play();
      this.$refs.metalPipe.play();
      this.spamInterval = setInterval(() => {
        this.popups.push({ id: this.popupId++ });
      }, 500);
    },
    
    removePopup(id) {
      this.popups = this.popups.filter(p => p.id !== id);
    }
  },
  mounted(){
    this.startSpam();
  }
};
</script>

<style>
body {
  font-family: sans-serif;
  background-color: #f8f8f8;
  text-align: center;
}
</style>
