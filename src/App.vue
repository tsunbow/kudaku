<script setup>
import ResponsiveContainer from './components/PC/ResponsiveContainer.vue'
import PcView from './components/PC/PcView.vue'
import SpView from './components/SP/SpView.vue'
</script>

<template>
  <div class="app">
    <ResponsiveContainer>
      <template #small>
        <SpView />
      </template>
      <template #large>
        <PcView />
      </template>
    </ResponsiveContainer>
  </div>
</template>
