<script setup></script>

<template>
  <div class="base-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-container {
  padding: 0 5rem;

  @media #{$media-mobile} {
    padding: 0 1rem;
  }
}
</style>
