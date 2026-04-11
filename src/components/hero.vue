<script setup>
defineProps({
  color: {
    type: String,
    default: "red",
  },
});
</script>

<template>
  <div class="hero" :style="{ color }">This is hero vue!</div>
</template>

<style lang="scss">
.hero {
  //   color: red;
}
</style>
