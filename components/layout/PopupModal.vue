<template>
  <div class="modal" :style="modalStyle">
    <p><strong>YOU ARE AN IDIOT</strong></p>
    <img src="../../public/images/img.jpg">
    <button @click="$emit('close')">Close</button>
  </div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    modalStyle() {
      const top = Math.random() * 80 + 'vh';
      const left = Math.random() * 80 + 'vw';
      return {
        position: 'absolute',
        top,
        left,
        border: '1px solid black',
        padding: '1rem',
        background: 'white',
        zIndex: 100000000000000000000
      };
    }
  }
}
</script>

