<script setup></script>

<template>
  <div class="base-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-container {
  max-width: 86rem;
  margin: 0 auto;

  @media #{$media-mobile} {
    padding: 0 1rem;
  }
}
</style>
