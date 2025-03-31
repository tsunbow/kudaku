<template>
  <div class="responsive-container">
    <div class="small-screen-content">
      <slot name="small"></slot>
    </div>
    <div class="large-screen-content">
      <slot name="large"></slot>
    </div>
  </div>
</template>

<style scoped>
.small-screen-content {
  display: block;
}

.large-screen-content {
  display: none;
}

@media screen and (min-width: 441px) {
  .small-screen-content {
    display: none;
  }

  .large-screen-content {
    display: block;
  }
}
</style>
