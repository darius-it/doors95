<template>
  <div class="ant-container">
    <div
      v-for="ant in ants"
      :key="ant.id"
      class="ant"
      :style="{
        left: ant.x + 'px',
        top: ant.y + 'px',
        transform: `rotate(${ant.angle}deg)`
      }"
    >
      🐜
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const antCount = 30;
const ants = ref([]);

function createAnt(id) {
  const direction = Math.random() * 360;
  const speed = Math.random() * 1.5 + 0.5;
  const radians = (direction * Math.PI) / 180;

  return {
    id,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    speed,
    direction,
    dx: Math.cos(radians) * speed,
    dy: Math.sin(radians) * speed,
    angle: direction + 90,
  };
}

onMounted(() => {
  for (let i = 0; i < antCount; i++) {
    ants.value.push(createAnt(i));
  }

  function animate() {
    for (const ant of ants.value) {
      // Slight random deviation to direction
      ant.direction += (Math.random() - 0.5) * 5; // +/- 2.5 degrees

      const radians = (ant.direction * Math.PI) / 180;
      ant.dx = Math.cos(radians) * ant.speed;
      ant.dy = Math.sin(radians) * ant.speed;

      ant.x += ant.dx;
      ant.y += ant.dy;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Wrap-around screen
      if (ant.x > w) ant.x = 0;
      if (ant.x < 0) ant.x = w;
      if (ant.y > h) ant.y = 0;
      if (ant.y < 0) ant.y = h;

      // Update visual rotation
      ant.angle = ant.direction + 180;
    }

    requestAnimationFrame(animate);
  }

  animate();
});
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
.ant-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #fdfcf5;
}
.ant {
  position: absolute;
  font-size: 1.5rem;
  user-select: none;
  pointer-events: none;
}
</style>
