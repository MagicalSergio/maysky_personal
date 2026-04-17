<script setup>
import ScrambleText from "./ScrambleText.vue";
import { onMounted, onUnmounted, ref } from "vue";

const scrambleTrigger = ref(false);
let interval = null;
onMounted(() => {
  scrambleTrigger.value = !scrambleTrigger.value;
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <section class="hero">
    <div class="hero__content">
      <h1>
        <ScrambleText text="Maysky" :trigger="scrambleTrigger" />
      </h1>
      <div class="hero__sub-title">
        <span>Creative</span>
        <span>Engineer</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  h1 {
    font-size: 260px;
    text-transform: uppercase;
    line-height: 1;
    font-weight: 700;
  }

  &__sub-title {
    display: flex;
    text-transform: uppercase;
    line-height: 1;
    font-size: 50px;
    font-weight: 700;
    color: #b4b4b4;
    margin-top: -25px;
    padding-left: 9px;

    span {
      flex-basis: 0;
      flex-shrink: 0;
      flex-grow: 1;
    }
  }
}
</style>
