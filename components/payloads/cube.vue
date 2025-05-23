<template>
  <div ref="cubeContainer" class="cube-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'

const cubeContainer = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  cubeContainer.value.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshNormalMaterial()
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  camera.position.z = 5

  let direction = new THREE.Vector3(
    (Math.random() - 0.5) * 0.05,
    (Math.random() - 0.5) * 0.05,
    0
  )

  function animate() {
    requestAnimationFrame(animate)

    // Rotate cube
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // Move cube
    cube.position.add(direction)

    // Bounce off edges
    if (Math.abs(cube.position.x) > 2) direction.x *= -1
    if (Math.abs(cube.position.y) > 2) direction.y *= -1

    renderer.render(scene, camera)
  }

  animate()
})
</script>

<style scoped>

.cube-container {
  position: absolute;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  top:0;
  left:0;
  background:transparent;
  z-index: 1000000000000000000000
}
</style>
