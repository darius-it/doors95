<template>
  <div class="text-[0.65rem] tracking-wider">
    {{ time }}
  </div>
</template>

<script lang="ts" setup>
import { useNow } from '@vueuse/core'

const now = useNow() // updates once per second by default

const time = computed(() =>
  now.value.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
)
</script>