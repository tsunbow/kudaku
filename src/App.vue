<script setup lang="js">
import ResponsiveContainer from './components/ResponsiveContainer.vue'
import PcView from './components/PcView.vue'
import SpView from './components/SpView.vue'
</script>

<template>
  <PcSite />
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
