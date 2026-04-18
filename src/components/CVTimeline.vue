<script setup>
import { ref, computed, onMounted } from "vue";

const cellHeight = 2;
const progress = 0;
const height = 2000;

const isMounted = ref(false);

const heightPX = computed(() => `${height}px`);

onMounted(() => {
    isMounted.value = true;
});
</script>

<template>
  <div class="cv-timeline">
    <div class="cv-timeline__rail">
      <div v-if="!isMounted" class="cv-timeline__cell"></div>
      <template v-else>
        <div class="cv-timeline__cell"></div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cv-timeline {
  &__cell {
    height: 0.5rem;
  }

  &__rail {
    height: v-bind(heightPX);
    width: 1rem;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style>
