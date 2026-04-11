<script setup>
import { motion } from "motion-v";
import { onMounted, ref } from "vue";

const isDragging = ref(false);
const constraints = ref();

onMounted(() => {
  constraints.value = document.querySelector('html')
})
</script>

<template>
  <div class="container">
    <motion.div
      class="box"
      drag
      :drag-constraints="constraints"
      :drag-transition="{ bounceStiffness: 300, bounceDamping: 20 }"
      drag-elastic="0.2"
      :while-drag="{ scale: 1.1, boxShadow: '0 20px 60px rgba(102, 126, 234, 0.6), 0 4px 16px rgba(0,0,0,0.25)' }"
      :while-hover="{ scale: 1.05 }"
      @drag-start="isDragging = true"
      @drag-end="isDragging = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.box {
  width: 160px;
  height: 160px;
  border-radius: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f64f59 100%);
  box-shadow:
    0 8px 32px rgba(102, 126, 234, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}
</style>
