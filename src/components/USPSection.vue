<script setup>
import { onMounted, useTemplateRef, ref } from "vue";

const root = useTemplateRef("root");

const isFixed = ref(false);
const isScrolled = ref(false);

const initObserver = () => {
  // 1. Define Callback
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isFixed.value = true;
      } else {
        isScrolled.value = root.value.getBoundingClientRect().top < 0;
        isFixed.value = false;
      }
    });
  };

  // 2. Observer Options
  const options = {
    root: null, // use viewport
    threshold: 0.25, // 50% visibility
  };

  // 3. Create Observer
  const observer = new IntersectionObserver(callback, options);

  // 4. Observe Element
  const target = root.value;
  observer.observe(target);
};

onMounted(() => {
  initObserver();
});
</script>

<template>
  <div ref="root" class="usp-section" :class="{ scrolled: isScrolled }">
    <div class="usp-section__fixed-container" :class="{ fixed: isFixed }">
      <div class="usp-section__content">
        >create solutions which helps business_
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.usp-section {
  height: 400vh;
  overflow-x: hidden;
  display: flex;
  align-items: flex-start;

  &.scrolled {
    align-items: flex-end;
  }

  &__fixed-container {
    height: 100vh;
    padding: 0 200px;
    width: max-content;
    display: flex;
    align-items: center;
    position: relative;

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
    }
  }

  &__content {
    white-space: nowrap;
    font-size: 260px;
    font-weight: bold;
    letter-spacing: -2%;
  }
}
</style>
