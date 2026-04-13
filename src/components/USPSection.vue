<script setup>
import { onMounted, useTemplateRef, ref, computed } from "vue";
import scroll from "../scripts/scroll";

const root = useTemplateRef("root");
const fixedContainer = useTemplateRef("fixed-container");

const mounted = ref(false);

const state = ref("pending"); // pending | scrolling | scrolled

const scrollProgress = ref(0);

const onScroll = () => {
  updateState();
  updateProgress();
};

const updateState = () => {
  const top = root.value.getBoundingClientRect().top;
  const rootHeight = root.value.getBoundingClientRect().height;
  const containerHeight = fixedContainer.value.getBoundingClientRect().height;

  if (top > 0) return (state.value = "pending");

  if (Math.abs(top) + containerHeight >= rootHeight)
    return (state.value = "scrolled");

  return (state.value = "scrolling");
};

const updateProgress = () => {
  if (state.value === "pending") return (scrollProgress.value = 0);
  if (state.value === "scrolled") return (scrollProgress.value = 1);

  const rootTop = root.value.getBoundingClientRect().top;
  const rootHeight = root.value.getBoundingClientRect().height;
  const containerHeight = fixedContainer.value.getBoundingClientRect().height;
  const scrollLength = rootHeight - containerHeight;

  scrollProgress.value = Math.abs(rootTop / scrollLength);
};

const translation = computed(() => {
  if (!mounted.value) return;
  const rootWidth = root.value.getBoundingClientRect().width;
  const containerWidth = fixedContainer.value.getBoundingClientRect().width;
  const translationLength = Math.abs(containerWidth - rootWidth);
  console.log("scrollProgress.value: ", scrollProgress.value);
  return translationLength * scrollProgress.value;
});

onMounted(() => {
  updateState();

  scroll.on("scroll", onScroll);

  mounted.value = true;
});

const classes = computed(() => ({
  pending: state.value === "pending",
  scrolling: state.value === "scrolling",
  scrolled: state.value === "scrolled",
}));
</script>

<template>
  <div ref="root" class="usp-section" :class="classes">
    <div
      ref="fixed-container"
      class="usp-section__fixed-container"
      :style="`transform: translateX(-${translation}px)`"
    >
      <div class="usp-section__content">
        >full-stack engineer -- no stack religion — just working solutions.
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.usp-section {
  $root: &;
  height: 400vh;
  overflow-x: hidden;
  display: flex;
  align-items: flex-start;

  &.pending {
    //
  }

  &.scrolling {
    #{$root}__fixed-container {
      position: fixed;
      top: 0;
      left: 0;
    }
  }

  &.scrolled {
    align-items: flex-end;
  }

  &__fixed-container {
    height: 100vh;
    padding: 0 200px;
    width: max-content;
    display: flex;
    align-items: center;
  }

  &__content {
    white-space: nowrap;
    font-size: 260px;
    font-weight: bold;
    letter-spacing: -2%;
  }
}
</style>
