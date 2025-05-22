<template>
  <div class="text-[0.65rem] tracking-wider border-t border-l border-r border-b border-[#08080E] border-r-[#FCFCFC] border-b-[#FCFCFC] px-4 py-1.5">
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